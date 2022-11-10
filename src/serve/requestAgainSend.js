/*
 * @Author: Null
 * @Date: 2022-06-16 17:41:20
 * @Description:请求重发封装
 */
import { isEmpty } from 'lodash'
import { isType } from './httpCommon'

/**
 * @param { object } error 失败信息对象
 * @param { object } server 实例化的单例
 * @returns
 */
export function requestAgainSend (error, server) {
  const response = error.response
  if (isType(response) === 'Object' && !isEmpty(response)) {
    const config = response?.config
    if (config) {
      const reSend = config?.extraConfig?.reSend
      const { retryTimes, retryDelay } = reSend
      if (retryTimes || retryDelay) {
        // 设置用于记录重试计数的变量 默认为0
        reSend.__retryCount = reSend.__retryCount || 0

        // 判断是否超过了重试次数
        if (reSend.__retryCount >= retryTimes) {
          return Promise.reject(error)
        }
        // 重试次数
        reSend.__retryCount += 1

        // 延时处理
        const delayFun = new Promise(function (resolve) {
          setTimeout(() => {
            resolve()
          }, retryDelay || 2000)
        })
        // 重新发起server请求
        return delayFun.then(() => {
          return server(config)
        })
      } else {
        console.error(`请求路径${config.url},不存在请求失败重发属性`)
        return Promise.reject(error)
      }
    } else {
      console.error(`错误对象${error},config属性不存在`)
      return Promise.reject(error)
    }
  } else {
    console.error(`错误对象${error},不存在`)
    return Promise.reject(error)
  }
}
