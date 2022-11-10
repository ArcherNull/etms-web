/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description:mport Cookies 设置文件
 */
import { merge } from 'lodash'
import Cookies from 'js-cookie'
import setting from '@/setting'

const cookies = {}
const setCookiesKey = (name, prefixName) => prefixName ? `${prefixName}-${name}` : `${setting.prefixName}-${name}`
/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}, prefixName) {
  const currentCookieSetting = {
    expires: 1
  }
  merge(currentCookieSetting, cookieSetting)
  Cookies.set(setCookiesKey(name, prefixName), value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default', prefixName) {
  return Cookies.get(setCookiesKey(name, prefixName))
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default', prefixName) {
  return Cookies.remove(setCookiesKey(name, prefixName))
}

export default cookies
