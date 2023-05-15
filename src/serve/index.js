/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 封装axios请求对象得入口文件
 * 参考文档： https://juejin.cn/post/6968487137670856711#heading-2
 */
import Axios from 'axios'
import { Message } from 'element-ui'
import { get } from 'lodash'
import util from '@/libs/util'
import router from '@/router/index'

// 加密解密
// import { encrypt, decrypt } from '@/utils/cryptoJs/index'
// 取消请求
import { addPendingRequest, removePendingRequest } from './cancelRepeatRequest'
// 请求出错，再次请求
import { requestAgainSend } from './requestAgainSend'
// 请求缓存
import { requestInterceptor as cacheReqInterceptor, responseInterceptor as cacheResInterceptor } from './requestCache.js'

// 请求配置，错误日志记录
import { httpConfig, handleError } from './httpCommon'
// 配置项
const { isDevEnv, baseURL, textBaseUrl, timeout } = httpConfig

const server = Axios.create({
  timeout,
  // header: {
  //   'Content-Type': 'application/json'
  // },
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  // transformRequest: [
  //   function (data, headers) {
  //     // 对 data 进行任意转换处理
  //     console.log(
  //       "只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法对 data 进行任意转换处理",
  //       data
  //     )
  //     return data
  //   }
  // ],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [
  //   function (data) {
  //     // 对 data 进行任意转换处理
  //     console.log('transformResponse` 在传递给 then/catch 前，允许修改响应数据')
  //     return data
  //   }
  // ],
  // `withCredentials` 表示跨域请求时是否需要使用凭证cookies
  withCredentials: false // default
})

if (isDevEnv) {
  server.defaults.baseURL = textBaseUrl
} else {
  server.defaults.baseURL = baseURL
}

// 设置请求前拦截器
server.interceptors.request.use(
  (config) => {
    const token = util.cookies.get('token') || (isDevEnv ? '' : '')
    if (token) {
      config.headers['Authorization'] = token
    }

    // pending 中的请求，后续请求不发送（由于存放的pendingMap 的key 和参数有关，所以放在参数处理之后）
    addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中
    //  请求缓存
    cacheReqInterceptor(config, server)

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 设置响应拦截器
server.interceptors.response.use(
  (response) => {
    // 响应正常时候就从pendingRequest对象中移除请求
    removePendingRequest(response)
    cacheResInterceptor(response)
    if (response.status === 200) {
      const { data: resData } = response
      if (parseInt(resData.code) === 200) {
        return resData
      } else if (parseInt(resData.code) === 401) {
        const currentPath = router.history.current.path
        router.push({
          path: `/login?redirect=${currentPath}`
        })
        return Promise.reject(resData)
      } else if (parseInt(resData.code) === 700) {
        Message.error(`${resData.msg || '未知错误'}`)
        return Promise.reject(resData)
      } else {
        Message.error(`${resData.msg || '未知错误'}`)
        return Promise.reject(resData)
      }
    }
  },
  (error) => {
    console.log('error=====>', error)

    // 从pending 列表中移除请求
    removePendingRequest(error || {})

    // 全局监听请求错误信息
    errorStatusMsg(error)

    // 需要特殊处理请求被取消的情况
    if (!Axios.isCancel(error)) {
      console.log('请求重发=====>', error)
      // 请求重发
      return requestAgainSend(error, server)
    }

    return Promise.reject(error)
  }
)

/**
 * @description: 错误状态码转义文本
 * @param { object } error 错误对象
 * @return { }
 */
function errorStatusMsg (error) {
  const status = get(error, 'response.status')

  console.log('status', status)

  switch (status) {
    case 302:
      error.message = '接口重定向了'
      break
    case 400:
      error.message = '请求错误'
      break
    case 401:
      error.message = '您未登录，或者登录已经超时，请先登录'
      break
    case 403:
      error.message = '您没有权限,拒绝访问'
      break
    case 404:
      error.message = `请求地址出错: ${error.response.config.url}`
      break
    case 408:
      error.message = '请求超时'
      break
    case 409:
      error.message = '系统已存在相同数据！'
      break
    case 500:
      error.message = '服务器内部错误'
      break
    case 501:
      error.message = '服务未实现'
      break
    case 502:
      error.message = '网关错误'
      break
    case 503:
      error.message = '服务不可用'
      break
    case 504:
      error.message = '服务暂时无法访问，请稍后再试'
      break
    case 505:
      error.message = 'HTTP版本不受支持'
      break
    default:
      break
  }
  if (error.message.includes('timeout')) error.message = '网络请求超时'
  if (error.message.includes('Network')) {
    error.message = window.navigator.onLine ? '服务端异常' : '您断网了'
  }

  // 记录错误日志数据
  handleError(error)
}

export default server
