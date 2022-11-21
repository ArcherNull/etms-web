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
import { meta, childMeta } from '../config'

// 基础系统设置菜单
const system = {
  path: '/system',
  component: Layout, // 首页的布局组件
  redirect: { name: 'Domain' },
  meta: {
    ...meta,
    title: '系统管理'
  },
  children: [
    {
      path: '/system/domain',
      component: _import(`pages/system/domain/index`),
      name: 'Domain',
      meta: {
        ...childMeta,
        title: '域名管理',
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/system/sys',
      component: _import(`pages/system/sys/index`),
      name: 'Sys',
      meta: {
        ...childMeta,
        title: '系统管理',
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/system/test',
      component: _import(`pages/system/test/index`),
      name: 'Test',
      meta: {
        ...childMeta,
        title: '测试',
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/system/user',
      component: _import('pages/system/user/index'),
      name: 'User',
      meta: {
        ...childMeta,
        title: '用户管理',
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
        roles: ['admin', 'jerry']
      },
      children: [
        {
          path: '/system/task-manage/task-plan',
          component: _import('pages/system/task-manage/task-plan'),
          name: 'TaskPlan',
          meta: {
            ...childMeta,
            title: '计划任务',
            roles: ['admin', 'jerry']
          }
        },
        {
          path: '/system/task-manage/task-record',
          component: _import('pages/system/task-manage/task-record'),
          name: 'TaskRecord',
          meta: {
            ...childMeta,
            title: '任务监控',
            roles: ['admin', 'jerry']
          }
        },
        {
          path: '/system/task-manage/task-table',
          component: _import('pages/system/task-manage/task-table'),
          name: 'TaskTable',
          meta: {
            ...childMeta,
            title: '任务表格',
            roles: ['admin', 'jerry']
          }
        },
        {
          path: '/system/task-manage/task-bigData-table',
          component: _import('pages/system/task-manage/task-bigData-table'),
          name: 'TaskBigDataTable',
          meta: {
            ...childMeta,
            title: '大数据表格',
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
        ...childMeta,
        title: '模块展示',
        roles: ['admin', 'jerry']
      }
    }
  ]
}

export default [
  // 基础系统设置菜单
  system
]
