/*
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
 * @Description: 用于相关文件的处理，不限于 PDF / image (jped,jpg,gif,png) / EXCEL (csv / xlsx / xls)
 */
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
  namespaced: true,
  modules
}
