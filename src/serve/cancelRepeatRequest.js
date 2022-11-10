/*
 * @Author: Null
 * @Date: 2022-06-16 17:30:19
 * @Description: 取消重复请求文件封装
 */

/*  假如用户重复点击按钮，先后提交了 A 和 B 这两个完全相同（考虑请求路径、方法、参数）的请求，我们可以从以下几种拦截方案中选择其一：
 1. 取消 A 请求，只发出 B 请求（会导致A请求已经发出去,被后端处理了）
 2. 取消 B 请求，只发出 A 请求
 3. 取消 B 请求，只发出 A 请求，把收到的 A 请求的返回结果也作为 B 请求的返回结果
 第3种方案需要做监听处理增加了复杂性，结合我们实际的业务需求，最后采用了第2种方案来实现，即：
 只发第一个请求。在 A 请求还处于 pending 状态时，后发的所有与 A 重复的请求都取消，实际只发出 A 请求，直到 A 请求结束（成功/失败）才停止对这个请求的拦截。
*/
import { isEmpty } from 'lodash'
import Axios from 'axios'
import { generateReqKey, isType, httpConfig, messageAlert } from './httpCommon'
const { timeout } = httpConfig
import { Message } from 'element-ui'
export const pendingRequest = new Map() // Map对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

// 取消请求提示定时器
export let cancelRequestTimer = null

/**
 * @description: 用于把当前请求信息添加到pendingRequest对象中
 * @param { Object } config 请求参数配置
 * @return {*}
 */
export function addPendingRequest (config) {
  const cancelRepeatRequest = config?.extraConfig?.cancelRepeatRequest
  const cancelRequest = config?.extraConfig?.cancelRequest

  if (cancelRequest || cancelRepeatRequest) {
    let requestKey = ''

    // 存在取消重复请求属性
    if (cancelRepeatRequest || cancelRequest) {
      requestKey = addPendingRequestMapItem(config, '已取消重复请求')
      console.log('pendingRequest', pendingRequest)
    }

    // 是否取消请求
    if (cancelRequest) {
      // 取消请求
      const handleCancelRequest = (msg) => {
        console.log('pendingRequest.has(requestKey)', pendingRequest.has(requestKey))
        if (requestKey && pendingRequest.has(requestKey)) {
          const cancel = pendingRequest.get(requestKey)
          cancel && cancel(msg)
          pendingRequest.delete(requestKey)
        }
      }

      const handleCancelRequestFun = () => {
        handleCancelRequest(`${requestKey}手动取消请求成功`)
        setTimeout(() => {
          Message.closeAll()
          resetCancelRequestTimer()
        }, 2000)
      }
      window.handleCancelRequestFun = handleCancelRequestFun

      const handleTimeLimitRate = cancelRequest?.handleTimeLimitRate
      const autoTimeLimitRate = cancelRequest?.autoTimeLimitRate

      // 手动取消请求大于自动取消请求
      if (handleTimeLimitRate) {
        const handleTime = handleTimeLimitRate * timeout
        console.log('handleTime=====>', handleTime)
        if (!cancelRequestTimer) {
          cancelRequestTimer = setTimeout(() => {
            Message({
              dangerouslyUseHTMLString: true,
              type: 'warning',
              duration: handleTime,
              showClose: true,
              message: `<span>手动取消请求在${timeout - handleTime}ms内,可<button style="margin:0 6px;color:blue;" onClick="handleCancelRequestFun()">手动取消</button></span>`
            })
            resetCancelRequestTimer()
          }, handleTime)
        } else {
          console.error('重复=====>cancelRequestTimer')
        }
      } else {
        if (autoTimeLimitRate) {
          const autoTime = autoTimeLimitRate * timeout
          console.log('autoTime=====>', autoTime)
          if (!cancelRequestTimer) {
            cancelRequestTimer = setTimeout(() => {
              handleCancelRequest()
              cancelRequestTimer = null
              messageAlert(`${requestKey}，已自动取消`, 'warning')
            }, autoTime || 10000)
          } else {
            console.error('重复=====>cancelRequestTimer')
          }
        } else {
          console.error(`请求地址:${config.url},存在cancelRequest对象但是不存在handleTimeLimitRate和autoTimeLimitRate属性,请检查`)
        }
      }
    }
  }
}

/**
 * @description: 检查是否存在重复请求，若存在则取消已发的请求。
 * @param {*} response 请求参数对象
 * @return {*}
 */
export function removePendingRequest (response) {
  if (isType(response) === 'Object' && !isEmpty(response)) {
    const cancelRepeatRequest = response?.config?.extraConfig?.cancelRepeatRequest
    const cancelRequest = response?.config?.extraConfig?.cancelRequest
    if (cancelRepeatRequest || cancelRequest) {
      const requestKey = generateReqKey(response.config)
      // 判断是否有这个 key
      if (pendingRequest.has(requestKey)) {
        if (cancelRequest) {
          resetCancelRequestTimer()
        }
        const cancelToken = pendingRequest.get(requestKey)
        cancelToken(requestKey)
        pendingRequest.delete(requestKey)
      }
    }
  } else {
    console.error(`存在请求出错，中断后续的所有请求=====>${pendingRequest.size}处于排队中...`)
    if (pendingRequest.size) {
      pendingRequest.clear()
      resetCancelRequestTimer()
      console.error(`清空请求队列=====>${pendingRequest.size}处于排队中...`)
    }
  }
}

/**
 * @description: 添加map对象元素
 * @param {*} config
 * @return {*}
 */
export function addPendingRequestMapItem (config, cancelMessage = '已取消') {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    config.cancelToken = new Axios.CancelToken((cancel) => {
    // cancel 函数的参数会作为 promise 的 error 被捕获
      cancel(`${requestKey}${cancelMessage}`)
    })
  } else {
    config.cancelToken =
    config.cancelToken ||
    new Axios.CancelToken((cancel) => {
      pendingRequest.set(requestKey, cancel)
    })
  }
  return requestKey
}

/**
 * @description: 定时器中断并清空定时器id
 * @return {*}
 */
export function resetCancelRequestTimer () {
  clearTimeout(cancelRequestTimer)
  cancelRequestTimer = null
}
