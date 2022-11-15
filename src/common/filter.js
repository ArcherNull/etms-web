/*
 * @Author: Null
 * @Date: 2022-06-09 10:32:22
 * @Description: 过滤器
 */
import { uniq, concat, isEmpty } from 'lodash'

/**
 * @description: 检查对象中的是否存在空属性值
 * @param {*} data Object
 * @return {*}
 */
export function checkEmptyObjVal (data) {
  if (data.constructor === Object) {
    const filterArr = Object.entries(data).filter((ele) => !ele[1])
    if (Array.isArray(filterArr) && filterArr.length) {
      const alertArr = filterArr.map((ele) => ele[0]).join(',')
      console.error(`${alertArr}参数缺失！`)
      return false
    } else {
      return data
    }
  } else {
    console.error(`检测值不为对象Object类型！`)
  }
}

/**
 * @description: 过滤掉对象中空属性值的属性
 * @param {*} data Object
 * @return {*}
 */
export function filterEmptyObjVal (data) {
  return Object.fromEntries(Object.entries(data).filter(ele => Boolean(ele[1])))
}

/**
 * @description: 拼接非空数组并去重
 * @param {*} arr1 非空数组1
 * @param {*} arr2 非空数组2
 * @return {*}
 */
export function uniqueArr (arr1, arr2) {
  if (!isEmpty(arr1) && !isEmpty(arr2)) {
    return uniq(concat(arr1, arr2))
  } else {
    console.error('存在空数组，合并去重无意义，请检查！')
  }
}

/**
* @param value
* @returns {string}  强数据类型校验
* 示例 isType(func) !== 'Function'
*/
export function isType (value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

const filter = {
  checkEmptyObjVal,
  filterEmptyObjVal,
  uniqueArr,
  isType
}

export default filter
