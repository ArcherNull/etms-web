/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/i18n/index.js'
import {
  resetCancelRequestTimer,
  pendingRequest
} from '@/serve/cancelRepeatRequest'
import setting from '@/setting'
import { Notification, Message } from 'element-ui'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

// 工具集
import util from '@/libs/util.js'

// 路由数据
import routes from './routers'

// 白名单路径
const whitePathList = ['/login']

// 引入页面锚点方法
// import { jumpPageAnchor } from '@/common/commFun.js'

// 解决点击相同路由的时候，路由报错的问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch((err) => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const createRouter = () =>
  new VueRouter({
    mode: 'hash', // 默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境);可选值: "hash" | "history" | "abstract"
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 导出路由 在 main.js 里使用
const router = createRouter()

// 导航前守卫
router.beforeEach(async (to, from, next) => {
  console.log('导航前守卫', to)
  // 进度条
  NProgress.start()

  // 验证当前路由所有的匹配中是否需要有登录验证的
  const token = util.cookies.get('token')
  console.log('token=====>', token)
  if (token) {
    try {
    // 确认已经加载多标签页数据
      await store.dispatch('setting/tagViews/isLoaded')

      // 如果上一个页面还存在为请求完的接口，则中止全部请求
      if (pendingRequest.size) {
        console.log(`当前页面正在请求的接口数为=====>${pendingRequest.size}个`)
        pendingRequest.forEach((cancel, requestKey) => {
          requestKey && cancel(`页面切换取消上一个页面的${requestKey}请求`)
        })
        pendingRequest.clear()
        resetCancelRequestTimer()
      }

      const hasAsyncRoutesRequest = store.state.setting.tagViews.hasAsyncRoutesRequest

      console.log('hasAsyncRoutesRequest=====>', hasAsyncRoutesRequest)

      // 有token但是动态路由为空，则请求动态路由
      if (!hasAsyncRoutesRequest) {
      // 添加动态路由
      // resetRouter()
        const asyncRoutes = await store.dispatch('setting/tagViews/generateRoutes')
        console.log('asyncRoutes=====>', asyncRoutes)
        asyncRoutes.forEach(item => {
          router.addRoute(item)
        })

        next({ ...to, replace: true })
      } else {
        if (to.matched.some((r) => r.meta.auth)) {
          next()
        } else {
        // 不需要身份校验 直接通过12
          next()
        }
      }
    } catch (err) {
      await store.dispatch('user/userInfo/logout')
      Message.error(`路由跳转出错`)
    }
  } else {
    if (whitePathList.includes(to.path)) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  NProgress.done()
})

router.afterEach(async (to, from) => {
  // 多页控制 打开新的页面
  store.dispatch('setting/tagViews/open', to)
  // 更改标题
  console.log(' t(to.path)=========', i18n.t(to.path, i18n.locale))

  const { anchor } = to.params
  if (anchor) {
    // jumpPageAnchor(to.path, anchor)
  } else {
    // const dom = document.getElementById('layout-main-container')
    // console.log('dom==============>', dom)
    // dom.scrollTo(0, 0)
  }

  if (from.path === '/login' && util.cookies.get('token')) {
    Notification({
      title: '登录成功',
      message: `${setting.name}，欢迎您回来`,
      type: 'success'
    })
  }

  util.title(to.meta.title)
  // 进度条
  NProgress.done()
})

export default router
