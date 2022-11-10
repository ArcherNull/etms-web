/*
 * @Author: Null
 * @Date: 2022-02-07 11:03:45
 * @Description: mathJs数学库
 */

// 保留小数点后几位
const precision = 7

// 引入mathJs
import { create, all } from 'mathjs'
const config = {
  number: 'BigNumber',
  precision // 小数位数 7 ，14 ，64
}
export const math = create(all, config)

// (3+4)*2
// console.log('其余示例 -- mathJs链式操作计算(3+4)*2' , math.format(math.chain(3).add(4).multiply(2).done())) // 14

// 相关常量
const constants = {
  PI: format(math.pi),
  E: format(math.e)
}

/**
 * @description: 要格式化的数字结构
 * @param {number} number
 */
export function format (number) {
  return math.format(number)
}

/**
 * @description: 两数相加
 * @param {number|string} num1 加数
 * @param {number|string} num2 被加数
 */
export function add (num1, num2) {
  const ans = math.add(num1, num2)
  return format(ans, { precision })
}

/**
 * @description: 两数相减之差
 * @param {number|string} num1 减数
 * @param {number|string} num2 被减数
 */
export function subtract (num1, num2) {
  const ans = math.subtract(num1, num2)
  return format(ans, { precision })
}

/**
 * @description: 两数相除
 * @param {number|string} num1 除数
 * @param {number|string} num2 被除数
 */
export function divide (num1, num2) {
  const ans = math.divide(num1, num2)
  return format(ans, { precision })
}

/**
 * @description: 两数相乘
 * @param {number|string} num1 乘数
 * @param {number|string} num2 被乘数
 */
export function multiply (num1, num2) {
  const ans = math.multiply(num1, num2)
  return format(ans, { precision })
}

/**
 * @description: 计算表达式
 * @param {表达式} express
 * 测试表达式
 * 0.1+0.2 ==> 0.3
 * 12.7 cm to inch ==> 5 inch
 * sin(90 deg) ==> 1
 * sin(45 deg) ^ 2 ==> 该值实际上应该是约等于 0.5 .实际值为0.4999999999999999
 * 9 / 3 + 2i ==> 3 + 2i
 * 1000*1000 ==> 1e+6
 */
export function evaluate (express) {
  console.log('constants', constants)
  return format(math.evaluate(express))
}

/**
 * @description: log计算
 * @param {number} num1 底数
 * @param {number} num2 底数
 */
export function log (num1, num2) {
  return format(math.log(num1, num2))
}

/**
 * @description: 开平方
 * @param {number} num
 */
export function sqrt (num) {
  return format(math.sqrt(num))
}
