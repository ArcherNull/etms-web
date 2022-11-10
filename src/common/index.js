/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 公共文件
 */
// 公共属性
import commAttr from './commAttr.js'
// 公共方法
import commFun from './commFun.js'
// el-form表单验证方法封装
import rules from './rules.js'
// 前端图形验证码封装
import validateCode from './validateCode.js'
// 导出excel方法封装
import exportExcel from './exportExcel.js'
// 获取正则验证方法
import validate from './validate.js'

const comm = {
  // 公共属性
  ...commAttr,
  // 公共方法
  ...commFun,
  // 前端验证码
  ...validateCode,
  // 导出excel
  ...exportExcel,
  // 表单规则
  rules,
  // 正则校验文件
  ...validate

}

export default comm
