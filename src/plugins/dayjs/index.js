/*
 * @Author: Null
 * @Date: 2022-06-30 09:38:56
 * @Description: dayjs
 */
// dayjs
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import * as relativeTime from 'dayjs/plugin/relativeTime' // 导入插件

const customParseFormat = require('dayjs/plugin/customParseFormat')
import 'dayjs/locale/zh-cn' // 导入本地化语言
const dayjs = require('dayjs')
dayjs.extend(customParseFormat) // 自定义时间格式.
dayjs.extend(isLeapYear) // 使用插件
dayjs.extend(relativeTime) // 使用插件 相关时间
dayjs.locale('zh-cn') // 使用本地化语言

export default dayjs
