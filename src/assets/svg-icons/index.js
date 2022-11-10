/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: svg-icons 图标入口文件
 */
import setting from '@/setting.js'

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('./icons', false, /\.svg$/)

requireAll(req)
const iconMap = requireAll(req)
const svgIconsMap = iconMap.map((ele) => {
  return ele.default.id.slice(setting.name.length + 1)
})
export default svgIconsMap
