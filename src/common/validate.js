/*
 * @Author: Null
 * @Date: 2021-11-13 09:00:34
 * @Description: 用于数据的正则校验
 */

export const validate = require('validate.js')

/* ==================================== 正则校验方法 ====================================*/
/**
 * @description: 检测是否是外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description: 判断http/https/ftp链接是否正确
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL (url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @description: 判断http/https/ftp链接是否正确
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL2 (url) {
  const reg = /(http|https|ws|wss|ftp):\/\/([\w.]+\/?)\S*/ // 带wwww的
  // const reg = /(http|https|ws|wss|ftp):\/\/\S*/ // 可带或可不带www

  return reg.test(url)
}

/**
 * @description: 判断英文小写
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @description: 判断英文大写
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @description: 判断英文
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @description: 判断邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail (email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @description: 判断字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @description: 判断数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description: 判断空值
 * @param any
 * @returns {Boolean}
 */
export function isDefine (value) {
  if (
    value == null ||
    value === '' ||
    value === 'undefined' ||
    value === undefined ||
    value === 'null' ||
    value === '(null)' ||
    value === 0 ||
    value === '0' ||
    value === 'NULL' ||
    typeof value === 'undefined'
  ) {
    return false
  } else {
    value = value + ''
    value = value.replace(/\s/g, '')
    if (value === '') {
      return false
    }
    return true
  }
}

/**
 * @description: 判断空值
 * @param any
 * @returns {Boolean}
 */
export function isDefineZoro (value) {
  if (
    value == null ||
    value === '' ||
    value === 'undefined' ||
    value === undefined ||
    value === 'null' ||
    value === '(null)' ||
    value === 'NULL' ||
    typeof value === 'undefined'
  ) {
    return false
  } else {
    value = value + ''
    value = value.replace(/\s/g, '')
    if (value === '') {
      return false
    }
    return true
  }
}

/* ==================================== 数据处理方法 ====================================*/
// 金额格式化
// reMoney(1200000.00)  '1,200,000.00'
export function formatMoney (money) {
  return parseFloat(money)
    .toFixed(2)
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .replace(/\,$/, '')
    .split('')
    .reverse()
    .join('')
}

// 格式化手机号码 , 15808349632 => 158****9632
export function formatTelephoneNumber (telephoneNumber) {
  const reg = /^(\d3,4|\d{3,4}-)?\d{7,8}$/
  if (reg.test(telephoneNumber)) {
    telephoneNumber = telephoneNumber.replace(
      /^(\d{3})\d{4}(\d{4})$/,
      '$1****$2'
    )
  }
  return telephoneNumber
}

export default {
  validateDeal: {
    formatMoney,
    formatTelephoneNumber
  },
  validateCheck: {
    isArray,
    validAlphabets
  },
  validate
}
