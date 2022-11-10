/*
 * @Author: Null
 * @Date: 2022-02-18 09:40:59
 * @Description: 全局过滤器
 * 过滤器就写成一个文件了，不再多建文件夹了
 */

/**
 * @description: 10000 => "10,000"
 * @param { Number } num | 格式化金额的数字
 */
export function toThousandFilter (num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * @description: 10000 => "10,000"
 * @param { Number } num | 银行卡格式化
 */
export function formatBankNum (num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{4})+$)/g, ' '))
}

/**
 * @description: 英文首字母大写
 * @param { String } str | 英文字符串
 */
export function uppercaseFirst (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description: 手机号格式化
 * @param {String} str 手机号码
 */
export function formatPhoneNumber (str) {
  const isMobile = (value) => {
    return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(
      value
    )
  }
  if (isMobile(str)) {
    str = str.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    return str
  } else {
    return str + '[手机格式不正确]'
  }
}

/**
 * @description: 金额格式化
 * @param {String} money 金额
 */
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
