/*
 * @Author: Null
 * @Date: 2021-11-18 10:24:24
 * @Description: 车牌号验证
 */

// 普通汽车规则 , 只包括了普通车牌号，教练车，警等车牌号 。部分部队车，新能源不包括在内
export const isOrdinaryCar = (license) => {
  const reg = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}/
  return reg.test(license)
}

// 小型车
export const isSmallCar = (license) => {
  const reg = /([DF][A-HJ-NP-Z0-9][0-9]{4})/
  return reg.test(license)
}

// 大型车
export const isBigCar = (license) => {
  const reg = /([0-9]{5}[DF])/
  return reg.test(license)
}

// 新能源车--新能源车
export const isNewEneryCar = (license) => {
  const reg = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))/
  return reg.test(license)
}

/**
 * @description: 新能源车总规则 【存在问题】
 * @param { 测试正确车牌：粤BD12345 粤BF12345  粤B12345D 粤B12345F ； 测试错误车牌：  } license
 * @return {*}
 */
export const isNewEneryCarRules = (license) => {
  const reg = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|(DF[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/
  return reg.test(license)
}

/*
  测试车牌号：
  正确的车牌：川A123AB、川A2222学、川AF12345、川A12345D。
  错误的车牌：川A123456、川A2222i、川AA12345、川AD123456。
*/
// 正则验证车牌,验证通过返回true,不通过返回false
export const isLicensePlate = (license) => {
  const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
  return reg.test(license)
}

// 车牌号校验
export const isLicenseNo = (license) => {
  const reg = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/
  return reg.test(license)
}
