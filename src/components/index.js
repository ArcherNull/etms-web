/*
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
 * @Description: 全局组件自动化注册，入口文件
 */
const files = require.context('.', true, /\.vue$/)
const compList = {}
files.keys().forEach((key) => {
  const component = files(key).default
  if (component.name) {
  // 只匹配index.vue结尾的文件
    if (/\/index.vue$/.test(key)) {
      compList[`${key.replace(/(\.\/|\/index\.vue)/g, '')}`] = component
    }
  } else {
    console.error(`路径为:${key}的组件,缺少必要属性name,请添加！！！`)
  }
})
// console.log('compList======>', compList)

const install = function (Vue) {
  compList.map((component) => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install.use(window.Vue)
}

export default compList
