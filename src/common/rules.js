/*
 * @Author: Null
 * @Date: 2021-09-30 08:46:05
 * @Description:用于el-form表单验证的规则以及常用的正则表达式验证
 */

// 检验QQ号
var isQQ = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('输入QQ号'))
  } else if (/^[1-9][0-9]{4,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('输入正确的QQ号'))
  }
}

// 类似金钱,首位可为0,最多2位小数
export function checkNumPot2 (rule, value, callback) {
  const reg = /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (!reg.test(value)) {
    return callback(new Error('请填写数字,最多2位小数'))
  } else {
    callback()
  }
}

// 类似金钱,首位可为0,最多3位小数 , 测试 0 / 0. / 0.0000 / 1.0000 / 1.001 /
export function checkNumPot3 (rule, value, callback) {
  const val = value
  // 检验整数为9位，小数为3位
  const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/
  // 首部可为0 ， 小数点三位
  const reg1 = /[0]\.\d{1,3}?$/
  // 判断是否输入空值
  if (['', null, undefined].includes(val)) {
    callback(new Error('不能输入空值'))
  } else {
    // 可能会传入字符串或者数字
    const number = Number(val)
    if (isNaN(number)) {
      callback(new Error('不能输入非数字的值'))
    } else {
      if (number === 0) {
        if ([0, '0'].includes(val)) {
          callback()
        } else {
          if (!reg1.test(val)) {
            callback(new Error('最多3位小数'))
          } else {
            callback()
          }
        }
      } else {
        console.log('number', number)
        if (!reg.test(val)) {
          return callback(new Error('请填写数字,最多3位小数'))
        } else {
          callback()
        }
      }
    }
  }
}

// 检验是否输入整数
export function checkInterNum (rule, value, callback) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    return callback(new Error('请填写整数'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

// 含0整数
export function checkInter (rule, value, callback) {
  const reg = /^([1-9]\d*|[0]{1,1})$/ // 含0正整数
  if (!reg.test(value)) {
    return callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

// 判断值是否为空字符串
export function checkVal (rule, value, callback) {
  const reg = /^\s+/g
  if (!value) {
    return callback(new Error('不能为空'))
  } else if (reg.test(value)) {
    return callback(new Error('开头不能有空格！'))
  } else {
    callback()
  }
}

// 判断密码
export function checkPassword (rule, value, callback) {
  // 必须且只含有数字和字母，可以拥有英文符号，6-17位。
  const reg = /(?=.{6,16})(?=.*\d)(?=.*[a-z])[\x20-\x7f]*/i
  if (!value) {
    return callback(new Error('不能为空'))
  } else if (reg.test(value)) {
    return callback(
      new Error('必须且只含有数字和字母，可以拥有英文符号，6-16位！')
    )
  } else {
    callback()
  }
}

// 判断用户名
export function checkUserName (rule, value, callback) {
  const reg = /^[a-zA-Z0-9_-]{4,18}$/
  if (value === '') {
    return callback(new Error('输入内容不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入字母、数字、下划线'))
  } else {
    return callback()
  }
}

// 判断车牌
export function isCarNo (value) {
  // 新能源车牌
  const xreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  // 旧车牌
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (value.length === 7) {
    return creg.test(value)
  } else if (value.length === 8) {
    return xreg.test(value)
  } else {
    return false
  }
}

// 判断是否符合身份证格式，弱校验
export function checkIdNum (rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('证件号码不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}

// 判断是否符合身份证格式,强校验
export const isIdCard = {
  /* *********验证证格式********** */
  _isIdCard: function (value) {
    const idCard = value
    if (idCard.length === 15) {
      return this.__isValidityBrithBy15IdCard
    } else if (idCard.length === 18) {
      const arrIdCard = idCard.split('')
      if (
        this.__isValidityBrithBy18IdCard(idCard) &&
        this.__isTrueValidateCodeBy18IdCard(arrIdCard)
      ) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  __isTrueValidateCodeBy18IdCard: function (arrIdCard) {
    let sum = 0
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
    const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    if (arrIdCard[17].toLowerCase() === 'x') {
      arrIdCard[17] = 10
    }
    for (let i = 0; i < 17; i++) {
      sum += Wi[i] * arrIdCard[i]
    }
    const valCodePosition = sum % 11
    if (arrIdCard[17] === ValideCode[valCodePosition]) {
      return true
    } else {
      return false
    }
  },
  __isValidityBrithBy18IdCard: function (idCard18) {
    const year = idCard18.substring(6, 10)
    const month = idCard18.substring(10, 12)
    const day = idCard18.substring(12, 14)
    const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
    if (
      temp_date.getFullYear() !== parseFloat(year) ||
      temp_date.getMonth() !== parseFloat(month) - 1 ||
      temp_date.getDate() !== parseFloat(day)
    ) {
      return false
    } else {
      return true
    }
  },
  __isValidityBrithBy15IdCard: function (idCard15) {
    const year = idCard15.substring(6, 8)
    const month = idCard15.substring(8, 10)
    const day = idCard15.substring(10, 12)
    const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))

    if (
      temp_date.getYear() !== parseFloat(year) ||
      temp_date.getMonth() !== parseFloat(month) - 1 ||
      temp_date.getDate() !== parseFloat(day)
    ) {
      return false
    } else {
      return true
    }
  }
  /* *********验证身份证格式********** */
}

// 身份证号码正则表达式汇总
// /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}{0-9Xx}$/
// 参考文档 https://blog.csdn.net/weixin_45595683/article/details/117374330

// 判断字符串长度是否超出范围
const isRange = function (value, range1, range2) {
  if (!range1 && range1 !== 0 && !range2 && range2 !== 0) {
    return true
  } else if (!range1 && range1 !== 0) {
    return value <= range2
  } else if (!range2 && range2 !== 0) {
    return value >= range1
  } else {
    return value >= range1 && value <= range2
  }
}

// 判断是否包含特殊字符
const isSpecial = function (value) {
  // 是否包含特殊字符
  const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  if (regEn.test(value) || regCn.test(value)) {
    return true
  }
  return false
}

// 判断是否包含表情
const isEmoji = function (value) {
  // 是否包含表情
  return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value)
}

// 判断是否是中文
const isChinese = function (value) {
  const reg = /.*[\u4e00-\u9fa5]+.*$/
  if (value !== '' && reg.test(value) && !isSpecial(value) && !isEmoji(value)) {
    return true
  } else {
    return false
  }
}

// 输入中文名
const isChineseName = function (rule, value, callback) {
  if (isChinese(value)) {
    if (!isRange(value, 2, 5)) {
      callback()
    } else {
      callback('请输入2到5个中文汉字！')
    }
  } else {
    callback('请输入中文汉字！')
  }
}

// 判断手机号是否符合格式
export function isPhoneNumber (rule, value, callback) {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的手机号')
  }
}

// 判断手机号是否是中国大陆手机号
export function isChinesePhoneNumber (rule, value, callback) {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  const reg1 = /^1[34578]\d{9}$/
  if (reg.test(value)) {
    if (reg1.test(value)) {
      callback()
    } else {
      callback('目前只支持中国大陆的手机号码')
    }
  } else {
    callback('请输入正确的手机号')
  }
}

// 判断座机号码是否输入正确  010-87655210
export function isTelephoneNumber (rule, value, callback) {
  const reg = /^(\d3,4|\d{3,4}-)?\d{7,8}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的座机号码')
  }
}

// 判断邮箱是否输入正确
export function isEmail (rule, value, callback) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的邮箱')
  }
}

// 判断银行卡号是否输入正确
export function isBankNumber (rule, value, callback) {
  const reg = /^[1-9]\d{9,29}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的银行卡号')
  }
}

// 判断是否时URL链接
export function isURL (rule, value, callback) {
  const reg = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i'
  )
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入正确的url链接')
  }
}

export default {
  // 判断是否是QQ,必填项
  QQ: [{
    required: true,
    validator: isQQ,
    trigger: 'blur'
  }],
  // 判断是否为空值,且输入字符串前不能有空格，必填项
  requiredVal: [{
    required: true,
    validator: checkVal,
    trigger: 'blur'
  }],
  // 用户输入密码长度校验,必填项
  password: [{
    required: true,
    validator: checkPassword,
    trigger: 'blur'
  }],
  // 保留小数点后两位,必填项
  numPot2: [{
    required: true,
    validator: checkNumPot2,
    trigger: 'blur'
  }],
  // 保留小数点后三位,必填项
  numPot3: [{
    required: true,
    validator: checkNumPot3,
    trigger: 'blur'
  }],
  // 是否输入整数，必填项
  InterNum: [{
    required: true,
    validator: checkInterNum,
    trigger: 'blur'
  }],
  // 是否输入含0整数，必填项
  Inter: [{
    required: true,
    validator: checkInter,
    trigger: 'blur'
  }],
  // 中文名称，范围值为2-5位，必填项
  chineseName: [{
    required: true,
    validator: isChineseName,
    trigger: 'blur'
  }]
}
