/*
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
 */
// 布局组件
import Layout from '@/layout/layout.vue'
// import systemRoutes from './modules/system'
// import basicData from './modules/basicData'

import { isEmpty, isArray } from 'lodash'
import { meta } from './config'
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
  }
]

/**
 * 在主框架之外显示
 */
export const frameOut = [
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
export const errorPage = [
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

// 获取最后一级路由，并转换为大写
const getLastMenuPath = (ele) => {
  if (ele && typeof ele === 'string') {
    const str = ele.split('/')
    const letter = str[str.length - 1]

    const convertBigCamelizeCase = (str) => {
      function upper (all, letter) {
        return letter.toUpperCase()
      }
      const res = str.replace(/[-_](\w)/g, upper).replace(/\b\w/g, function (th) {
        return th.toUpperCase()
      }).replace(/\s*/g, '')
      return res
    }

    return convertBigCamelizeCase(letter)
  } else {
    return ''
  }
}

// 生成菜单
export function generaMenu (data, pUrl = '') {
  const routes = []
  if (!isEmpty(data) && isArray(data)) {
    data.forEach((item) => {
      const isParentPath = /^\//.test(item.menuUrl)
      const path = `${pUrl}${isParentPath ? item.menuUrl : '/' + item.menuUrl}`
      const component = isParentPath ? 'Layout' : path
      const child = item.baseMenudetailVoList

      const menuObj = {
        pathUrl: pUrl, // 上一级url
        path, // 当前url
        name: getLastMenuPath(path),
        meta: {
          icon: item.menuIcon,
          ...meta,
          title: item.menuName,
          id: item.menuId
        }
      }

      if (component === 'Layout') {
        menuObj.component = Layout
        menuObj.redirect = {
          name: child?.[0]?.menuUrl
        }
      } else {
        if (!child?.length) {
          // 三级路由
          // 接口组件字符串转换成组件对象， 这里找不到这个模块路径  webpack版本低时的引入方式
          console.log('component=====>', component)

          menuObj.component = (resolve) => require([`@/views/pages${component}`], resolve)

          // menuObj.component = (resolve) => require([`@/views/pages${component}`], resolve)

          // item.component = () => import('@/views/pages/' + component + '/index.vue')
        } else {
          // 二级路由重定向
          menuObj.redirect = {
            name: child?.[0].menuUrl
          }
        }
      }

      // 获取children子集
      const getChildren = (cItem) => {
        return child?.length
          ? generaMenu(
            cItem.baseMenudetailVoList,
            pUrl !== '' ? pUrl + '/' + cItem.menuUrl : cItem.menuUrl
          )
          : null
      }

      const childArr = getChildren(item)
      if (childArr && Array.isArray(childArr)) {
        menuObj.children = childArr
      }

      routes.push(menuObj)
    })
  }

  // console.log('routes=====>', routes)

  return routes
}

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
