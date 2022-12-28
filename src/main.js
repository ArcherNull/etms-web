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

// 框架内的公共路由
import { frameInRoutes } from '@/router/routers'
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
async function initSystemDefault () {
  console.log('初始化系统')
  // 系统版本信息
  await store.dispatch('setting/version/loadSystemInfo')
  // 初始化tagViews
  await store.dispatch('setting/tagViews/init', frameInRoutes)

  // 模拟加载用户数据【可删除】
}

new Vue({
  store,
  router,
  i18n,
  created () {
    // 初始化系统
    initSystemDefault()
  },
  mounted () {
    store.dispatch('user/userInfo/loadUserInfo')
  },
  render: (h) => h(App)
}).$mount('#app')
