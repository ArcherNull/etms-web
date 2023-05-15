/*
 * @Author: Null
 * @Date: 2022-01-14 21:04:03
 * @Description:动态路由--基础数据
 */

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
import Layout from '@/layout/layout.vue'
import { meta, childMeta } from '../config'

const basicData = [
  {
    path: '/basic-data',
    component: Layout, // 首页的布局组件
    redirect: { name: 'domain' },
    meta: {
      ...meta,
      title: '系统管理',
      icon: 'el-icon-s-marketing',
      hidden: false
    },
    children: [
      {
        path: '/basic-data/contract-manage',
        component: _import(`pages/basic-data/contract-manage/index`),
        name: 'domain',
        meta: {
          ...childMeta,
          title: '域名管理',
          icon: 'el-icon-tickets',
          hidden: false,
          roles: ['admin', 'jerry']
        }
      }
    ]
  }
]

export default basicData
