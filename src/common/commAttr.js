/*
 * @Author: Null
 * @Date: 2021-11-11 09:07:59
 * @Description: 公共属性文件
 */
// elementUI组件可共用的公共属性或方法
import elementUICommon from './elementUICommon.js'
// eChart统计图配置项数据
import eChartOptions from './eChartOptions.js'

const commAttr = {
  // elementUI组件可共用的公共属性或方法
  ...elementUICommon,
  // eChart统计图配置项数据
  ...eChartOptions
}

export default commAttr
