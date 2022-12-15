/*
 * @Author: Null
 * @Date: 2022-06-16 16:34:16
 * @Description: 请求配置文件
 */
import { Message, Notification, MessageBox } from 'element-ui'
import { isObject, isEmpty } from 'lodash'
import store from '@/store'
import util from '@/libs/util'
import Qs from 'qs'

// 当前配置
export const httpConfig = {
  isDevEnv: process.env.NODE_ENV === 'development', // 当前环境
  cancelRepeatRequest: true, // 接口中定义该项则开启取消重复请求功能
  retry: 3, // retry 请求重试次数
  retryDelay: 1000, // retryDelay 两次重试之间的时间间隔
  cache: true, // cache： true 开启当前接口缓存
  setExpireTime: 30000, // 当前接口缓存时限
  messageDuration: 3 * 1000, // 消息提示得显示时长
  timeout: 15000, // 请求超时时长
  baseURL: '/api', // 线上域名
  textBaseUrl: '/api', // 测试域名
  headers: {
    // 'Content-type': 'application/x-www-form-urlencoded'
  }
}

/**
 * @description: 田间到错误日志
 * @param { Object } error 错误对象
 * @return {*}
 */
export function addErrorLog (error) {
  store.dispatch('setting/log/pushErrorLog', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
}

/**
 * @description: 展示错误信息
 * @param { String } message 提示信息
 * @return {*}
 */
export function messageAlert (message, type = 'error', duration = 3000) {
  showMessage({
    message,
    type,
    showClose: true,
    duration
  })
}

// 错误提示
export const showMessage = (obj, type, duration) => {
  let msgObj = {
    message: '错误',
    type: type || 'warning',
    duration: duration || 2000
  }
  if (isObject(obj) && !isEmpty(obj)) {
    msgObj = Object.assign(msgObj, obj)
  } else {
    msgObj.message = obj
  }
  Message(msgObj)
}

// 提示
export const showNotification = (obj, type, title, duration) => {
  let msgObj = {
    title: title || '提示',
    message: '错误',
    type: type || 'warning',
    duration: duration || 2000
  }
  if (isObject(obj) && !isEmpty(obj)) {
    msgObj = Object.assign(msgObj, obj)
  } else {
    msgObj.message = obj
  }
  Notification(msgObj)
}

// 确认弹窗
export function showConfirm (obj, callback) {
  const msgObj = {
    title: '提示',
    description: '您确定执行接下来的操作吗？',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }

  const { title, description, ...restObj } = Object.assign(msgObj, obj)

  MessageBox.confirm(description, title, {
    ...restObj
  }).then((res) => {
    callback(res)
  })
}

/**
 * @description 记录和显示错误
 * @param {Error} error 错误对象
 */
export function handleError (error) {
  // 添加到日志
  addErrorLog(error)
  // 打印到控制台
  if (httpConfig.isDevEnv) {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  setTimeout(() => {
    // 显示提示
    messageAlert(error.message)
  })
}

/**
 * @description: 判断一个字符串是否为JSON字符串
 * @param {*} str 字符串
 * @return {*}
 */
export function isJsonStr (str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

/**
 * @description: generateReqKey ：用于根据当前请求的信息，生成请求 Key；
 * @param {*} config 请求参数配置
 * @return {*}
 */
export function generateReqKey (config) {
  const { method, url, params, data } = config // 请求方式，参数，请求地址，
  const paramsStr = typeof params === 'object' ? Qs.stringify(params) : params
  const dataStr = typeof data === 'object' ? Qs.stringify(data) : data

  return [method, url, paramsStr, dataStr].join('|') // 拼接
}

/**
 * @param value
 * @returns {string}  强数据类型校验
 * 示例 isType(func) !== 'Function'
 */
export function isType (value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
