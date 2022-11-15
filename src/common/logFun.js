/*
 * @Author: Null
 * @Date: 2022-06-27 14:20:10
 * @Description: 用于日志记录方法
 */
import { get } from 'lodash'
import dayjs from 'dayjs'
import util from '@/libs/util.js'

// logType 日志类型，区分为 错误日志 errorLog ； 操作日志 ：operationLog

export function getPageInfo () {
  const locationHref = get(window, 'location.href', '')
  const page = get(window, 'location.hash', '').replace('#', '')
  return {
    locationHref,
    page
  }
}

/**
 * @description: 此方法用于错误日志的数据生成
 * @param {Object} errorLog 错误日志对象 ， message ， type ， meta
 * @return {*}
 */
export function errorLogFun (errorLog) {
  const { message, type = 'info', errorType = 'js', meta } = errorLog

  const { locationHref, page } = getPageInfo()

  const jsonMeta = JSON.stringify({
    // 当前用户信息
    user: '无',
    // 当前用户的 uuid
    // uuid: util.cookies.get('uuid'),
    logType: 'errorLog',
    // 错误日志类型  请求出错 requrest ； 组件出错 component ；js出错 js ;
    errorType,
    // 当前的 token
    token: util.cookies.get('token'),
    // 当前地址
    url: locationHref,
    // 用户设置
    ...meta
  })

  return {
    message,
    type,
    page,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    meta: jsonMeta
  }
}

/**
 * @description: 此方法用于错误日志的数据生成
 * @param {Object} errorLog 错误日志对象 ， message ， type ， meta
 * @return {*}
 */
export function operationLogFun (errorLog) {
  const { message, type = 'info', operationType = 'clickButton', meta } = errorLog

  const { locationHref, page } = getPageInfo()

  const jsonMeta = JSON.stringify({
    // 当前用户信息
    user: '无',
    // 当前用户的 uuid
    // uuid: util.cookies.get('uuid'),
    // 日志类型
    logType: 'operationLog',
    // 操作方式 confirm 确认弹窗 ； clickButton 点击按钮 ， approval 审批流程
    operationType,
    // 当前的 token
    token: util.cookies.get('token'),
    // 当前地址
    url: locationHref,
    // 用户设置
    ...meta
  })

  return {
    message,
    type,
    page,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    meta: jsonMeta
  }
}
