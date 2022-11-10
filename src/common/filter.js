/*
 * @Author: Null
 * @Date: 2022-06-09 10:32:22
 * @Description: 过滤器
 */

/**
 * @description: 检查对象中的是否存在空属性值
 * @param {*} data Object
 * @return {*}
 */
export function checkEmptyObjVal (data) {
  const filterArr = Object.entries(data).filter((ele) => !ele[1])
  if (Array.isArray(filterArr) && filterArr.length) {
    const alertArr = filterArr.map((ele) => ele[0]).join(',')
    console.error(`${alertArr}参数缺失！`)
    return false
  } else {
    return data
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

const filter = {
  checkEmptyObjVal,
  filterEmptyObjVal
}

export default filter
