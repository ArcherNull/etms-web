/*
 * @Author: Null
 * @Date: 2021-11-06 14:17:36
 * @Description: 入口文件根组件实例
 */
import Vue from 'vue'
import App from './App.vue'
import compList from './components/index'
import admin from '@plugins/admin'
import store from '@/store/index'
import router from './router/index'
import i18n from '@/i18n/index'

import * as filters from '@/filters/index'

// 核心插件
Vue.use(admin)

// 注册全局组件
Object.keys(compList).forEach((key) => {
  key.indexOf('/') === -1 && Vue.component(key, compList[key])
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 初始化系统
function initSystemDefault () {
  console.log('初始化系统')
  // 系统版本信息
  store.dispatch('setting/version/loadSystemInfo')
  // 初始化tagViews
  store.dispatch('user/userInfo/loadUserInfo')
}

new Vue({
  store,
  router,
  i18n,
  mounted () {
    initSystemDefault()
  },
  render: (h) => h(App)
}).$mount('#app')
