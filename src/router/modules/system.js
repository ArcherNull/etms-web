/*
 * @Author: Null
 * @Date: 2021-12-29 14:45:31
 * @Description:动态路由--系统管理
 */
// 布局组件
// import Layout from '@/layout/index.vue'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

import Layout from '@/layout/layout.vue'

const meta = { auth: true, cache: true }

// 基础系统设置菜单
const system = {
  path: '/system',
  component: Layout, // 首页的布局组件
  redirect: { name: 'Domain' },
  meta: {
    ...meta,
    title: '系统管理',
    icon: 'el-icon-s-marketing',
    hidden: false
  },
  children: [
    {
      path: '/system/domain',
      component: _import(`pages/system/domain/index`),
      name: 'Domain',
      meta: {
        ...meta,
        title: '域名管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/system/user',
      component: _import('pages/system/user/index'),
      name: 'User',
      meta: {
        ...meta,
        title: '用户管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/system/task-manage',
      component: _import('pages/system/task-manage/index'),
      name: 'TaskManage',
      redirect: { name: 'task-plan' },
      meta: {
        ...meta,
        title: '计划任务管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      },
      children: [
        {
          path: '/system/task-manage/task-plan',
          component: _import('pages/system/task-manage/task-plan'),
          name: 'TaskPlan',
          meta: {
            ...meta,
            title: '计划任务',
            icon: 'el-icon-tickets',
            hidden: false,
            roles: ['admin', 'jerry']
          }
        },
        {
          path: '/system/task-manage/task-record',
          component: _import('pages/system/task-manage/task-record'),
          name: 'TaskRecord',
          meta: {
            ...meta,
            title: '任务监控',
            icon: 'el-icon-tickets',
            hidden: false,
            roles: ['admin', 'jerry']
          }
        },
        {
          path: '/system/task-manage/task-table',
          component: _import('pages/system/task-manage/task-table'),
          name: 'TaskTable',
          meta: {
            ...meta,
            title: '任务表格',
            icon: 'el-icon-tickets',
            hidden: false,
            roles: ['admin', 'jerry']
          }
        },
        {
          path: '/system/task-manage/task-bigData-table',
          component: _import('pages/system/task-manage/task-bigData-table'),
          name: 'TaskBigDataTable',
          meta: {
            ...meta,
            title: '大数据表格',
            icon: 'el-icon-tickets',
            hidden: false,
            roles: ['admin', 'jerry']
          }
        }
      ]
    },
    {
      path: '/system/module-display',
      component: _import('pages/system/module-display/index'),
      name: 'ModuleDisplay',
      meta: {
        ...meta,
        title: '模块展示',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    }
  ]
}

export default [
  // 基础系统设置菜单
  system
]
