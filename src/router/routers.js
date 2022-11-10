/*
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
 */
// 布局组件
import Layout from '@/layout/layout.vue'
import systemRoutes from './modules/system'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: Layout, // 首页的布局组件
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页',
          auth: true
        },
        component: _import('system/index')
      },
      {
        path: '/errorLog',
        name: 'errorLog',
        meta: {
          title: '错误日志',
          auth: true
        },
        component: _import('system/errorLog')
      },
      {
        path: '/messageBox',
        name: 'messageBox',
        meta: {
          title: '消息收纳盒',
          auth: true
        },
        component: _import('system/message-box')
      },
      // 刷新页面 必须保留
      {
        path: '/refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: '/redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  // 动态路由
  ...systemRoutes
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    redirect: { name: 'error' },
    component: Layout, // 首页的布局组件
    children: [
      {
        name: 'error',
        path: '*',
        component: _import('system/error/404')
      }
    ]

  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

console.log('[...frameIn, ...frameOut, ...errorPage]', [
  ...frameIn,
  ...frameOut,
  ...errorPage
])

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
