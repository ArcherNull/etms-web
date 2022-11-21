/*
 * @Author: Null
 * @Date: 2022-01-14 21:04:03
 * @Description:动态路由--基础数据
 */

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
import Layout from '@/layout/layout.vue'
import { meta, childMeta } from '../config'

const basicData = {
  path: '/basicData',
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
      path: '/basicData/domain',
      component: _import(`pages/basicData/domain/index`),
      name: 'domain',
      meta: {
        ...childMeta,
        title: '域名管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/user',
      component: _import('pages/basicData/user/index'),
      name: 'user',
      meta: {
        ...childMeta,
        title: '用户管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/role',
      component: _import('pages/basicData/role/index'),
      name: 'role',
      meta: {
        ...childMeta,
        title: '角色管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/power',
      component: _import('pages/basicData/power/index'),
      name: 'power',
      meta: {
        ...childMeta,
        title: '权限组管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/division',
      component: _import('pages/basicData/division/index'),
      name: 'division',
      meta: {
        ...childMeta,
        title: '部门管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/position',
      component: _import('pages/basicData/position/index'),
      name: 'position',
      meta: {
        ...childMeta,
        title: '职位管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/menu-detail',
      component: _import('pages/basicData/menu-detail/index'),
      name: 'menu-detail',
      meta: {
        ...childMeta,
        title: '菜单管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/permission',
      component: _import('pages/basicData/permission/index'),
      name: 'permission',
      meta: {
        ...childMeta,
        title: '权限看板',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/settings',
      component: _import('pages/basicData/settings/index'),
      name: 'settings',
      meta: {
        ...childMeta,
        title: '系统参数',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    },
    {
      path: '/basicData/task-manage',
      component: _import('pages/basicData/task-manage/index'),
      name: 'task-manage',
      redirect: { name: 'task-plan' },
      meta: {
        ...childMeta,
        title: '计划任务管理',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      },
      children: [
        {
          path: '/basicData/task-manage/task-plan',
          component: _import('pages/basicData/task-manage/task-plan/index'),
          name: 'task-plan',
          meta: {
            ...childMeta,
            title: '计划任务',
            icon: 'el-icon-tickets',
            hidden: false,
            roles: ['admin', 'jerry']
          }
        },
        {
          path: '/basicData/task-manage/task-record',
          component: _import('pages/basicData/task-manage/task-record/index'),
          name: 'task-record',
          meta: {
            ...childMeta,
            title: '任务监控',
            icon: 'el-icon-tickets',
            hidden: false,
            roles: ['admin', 'jerry']
          }
        }
      ]
    },
    {
      path: '/basicData/module-display',
      component: _import('pages/basicData/module-display/index'),
      name: 'module-display',
      meta: {
        ...childMeta,
        title: '模块展示',
        icon: 'el-icon-tickets',
        hidden: false,
        roles: ['admin', 'jerry']
      }
    }
  ]
}

export default {
  ...basicData
}
