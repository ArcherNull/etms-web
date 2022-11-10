/*
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
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
