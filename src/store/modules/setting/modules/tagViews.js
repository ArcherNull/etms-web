/*
 * @Author: Null
 * @Date: 2022-01-05 15:32:11
 * @Description: 标签导航
 */

import { cloneDeep, uniq, get, merge } from 'lodash'
import router from '@/router'
import setting from '@/setting.js'

// 判定是否需要缓存
const isKeepAlive = (data) => get(data, 'meta.cache', false)

const state = {
  // 可以在多页 tab 模式下显示的页面
  pool: [],
  // 当前显示的多页面列表
  opened: get(setting, 'page.opened', []),
  // 已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  openedLoaded: false,
  // 当前页面
  current: '',
  // 需要缓存的页面 name
  keepAlive: ['ModuleDisplay'],

  // 额外的功能,是否放大内容窗口
  isZoomInScreen: false,

  // 页面锚点详情
  currentPageAnchors: [],

  // 当前页面anchor列表
  currentAnchorList: []
}

const mutations = {
  /**
   * @class current
   * @description 设置当前激活的页面 fullPath
   * @param {Object} state state
   * @param {String} fullPath new fullPath
   */
  SET_CURRENT_PATH (state, fullPath) {
    state.current = fullPath
  },

  /**
   * @description 增加一个页面的缓存设置
   * @param {Object} state state
   * @param {String} name name
   */
  KEEP_ALIVE_PUSH (state, name) {
    const keep = cloneDeep(state.keepAlive)
    keep.push(name)
    state.keepAlive = uniq(keep)
  },
  /**
   * @description: 设置页面池
   * @param {Object} state state
   * @param {Object} pages 所有页面
   */
  SET_ALL_PAGES (state, pages) {
    state.pool = pages
  },
  /**
   * @description 删除一个页面的缓存设置
   * @param {Object} state state
   * @param {String} name name
   */
  KEEP_ALIVE_REMOVE (state, name) {
    const list = cloneDeep(state.keepAlive)
    const index = list.findIndex((item) => item === name)
    if (index !== -1) {
      list.splice(index, 1)
      state.keepAlive = list
    }
  },

  /**
   * @class keepAlive
   * @description 从已经打开的页面记录中更新需要缓存的页面记录
   * @param {Object} state state
   */
  KEEP_ALIVE_REFRESH (state) {
    state.keepAlive = state.opened
      .filter((item) => isKeepAlive(item))
      .map((e) => e.cname)
  },

  /**
   * @description: 放大内容区域窗口
   * @param {Boolean} bool
   * @return {*}
   */
  SET_IS_ZOOM_IN_SCREEN (bool) {
    console.log('放大内容区域窗口', bool)
    state.isZoomInScreen = bool
  },

  SET_CURRENT_PAGE_ANCHORS (state, arr) {
    state.currentPageAnchors = arr
  },

  /**
   * @description: 当前页面anchor锚点列表
   * @param {Array} list
   * @return {*}
   */
  SET_CURRENT_ANCHOR_LIST (state, list) {
    state.currentAnchorList = list
  }
}

const actions = {
  /**
   * @description 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
   * @param {Object} context
   */
  isLoaded ({ state }) {
    if (state.openedLoaded) return Promise.resolve()
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (state.openedLoaded) resolve(clearInterval(timer))
      }, 10)
    })
  },

  /**
   * @class opened
   * @description 从持久化数据载入标签页列表
   * @param {Object} context
   */
  async openedLoad ({ state, commit, dispatch }) {
    // store 赋值
    const value = await dispatch(
      'setting/db/get',
      {
        dbName: 'sys',
        path: 'page.opened',
        defaultValue: setting.page.opened,
        user: true
      },
      { root: true }
    )
    // 在处理函数中进行数据优化 过滤掉现在已经失效的页签或者已经改变了信息的页签
    // 以 fullPath 字段为准
    // 如果页面过多的话可能需要优化算法
    // valid 有效列表 1, 1, 0, 1 => 有效, 有效, 失效, 有效
    const valid = []
    // 处理数据
    state.opened = value
      .map((opened) => {
        // 忽略首页
        if (opened.fullPath === '/index') {
          valid.push(1)
          return opened
        }
        // 尝试在所有的支持多标签页的页面里找到 name 匹配的页面
        const find = state.pool.find((item) => item.name === opened.name)
        // 记录有效或无效信息
        valid.push(find ? 1 : 0)
        // 返回合并后的数据 新的覆盖旧的
        // 新的数据中一般不会携带 params 和 query, 所以旧的参数会留存
        return merge({}, opened, find)
      })
      .filter((opened, index) => valid[index] === 1)
    // 标记已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
    state.openedLoaded = true
    // 根据 opened 数据生成缓存设置
    commit('KEEP_ALIVE_REFRESH')
  },

  /**
   * @class pool
   * @description 保存 pool (候选池)
   * @param {Object} state state
   * @param {Array} routes routes
   */
  init ({ commit }, routes) {
    const pool = []
    const push = function (routes) {
      routes.forEach((route) => {
        if (route.children && route.children.length > 0) {
          push(route.children)
        } else if (!route.hidden) {
          const { meta, name, path } = route
          pool.push({ meta, name, path })
        }
      })
    }
    push(routes)
    console.log('初始化router', pool)
    // state.pool = pool
    commit('SET_ALL_PAGES', pool)
  },
  /**
   * @class opened
   * @description 更新页面列表上的某一项
   * @param {Object} context
   * @param {Object} payload { index, params, query, fullPath } 路由信息
   */
  async openedUpdate (
    { state, commit, dispatch },
    { index, params, query, fullPath }
  ) {
    // 更新页面列表某一项
    const page = state.opened[index]
    page.params = params || page.params
    page.query = query || page.query
    page.fullPath = fullPath || page.fullPath
    state.opened.splice(index, 1, page)
    // 持久化
    await dispatch('opened2db')
  },

  /**
   * 将 opened 属性赋值并持久化 在这之前请先确保已经更新了 state.opened
   * @param {Object} context
   */
  async opened2db ({ state, dispatch }) {
    // 设置数据
    dispatch(
      'setting/db/set',
      {
        dbName: 'sys',
        path: 'page.opened',
        value: state.opened,
        user: true
      },
      { root: true }
    )
  },
  /**
   * @class opened
   * @description 新增一个 tag (打开一个页面)
   * @param {Object} context
   * @param {Object} payload new tag info
   */
  async add ({ state, commit, dispatch }, { tag, params, query, fullPath }) {
    // 设置新的 tag 在新打开一个以前没打开过的页面时使用
    const newTag = tag
    newTag.params = params || newTag.params
    newTag.query = query || newTag.query
    newTag.fullPath = fullPath || newTag.fullPath
    // 添加进当前显示的页面数组
    state.opened.push(newTag)
    console.log('添加进当前显示的页面数组', state.opened)
    // 如果这个页面需要缓存 将其添加到缓存设置
    if (isKeepAlive(newTag)) commit('KEEP_ALIVE_PUSH', tag.name)
    // 持久化
    await dispatch('opened2db')
  },
  /**
   * @class current
   * @description 打开一个新的页面
   * @param {Object} context
   * @param {Object} payload 从路由钩子的 to 对象上获取 { name, params, query, fullPath, meta } 路由信息
   */
  async open (
    { state, commit, dispatch },
    { name, params, query, fullPath, meta }
  ) {
    // 已经打开的页面
    console.log('已经打开的页面', { name, params, query, fullPath, meta })
    const opened = state.opened
    // 判断此页面是否已经打开 并且记录位置
    let pageOpendIndex = 0
    const pageOpend = opened.find((page, index) => {
      const same = page.fullPath === fullPath
      pageOpendIndex = same ? index : pageOpendIndex
      return same
    })
    if (pageOpend) {
      // 页面以前打开过
      await dispatch('openedUpdate', {
        index: pageOpendIndex,
        params,
        query,
        fullPath
      })
    } else {
      // 页面以前没有打开过
      const page = state.pool.find((t) => t.name === name)
      // 如果这里没有找到 page 代表这个路由虽然在框架内 但是不参与标签页显示
      if (page) {
        await dispatch('add', {
          tag: merge({}, page),
          params,
          query,
          fullPath
        })
      }
    }
    // 如果这个页面需要缓存 将其添加到缓存设置
    if (isKeepAlive({ meta })) commit('KEEP_ALIVE_PUSH', name)
    // 设置当前的页面
    commit('SET_CURRENT_PATH', fullPath)
  },
  /**
   * @class opened
   * @description 关闭当前标签左边的标签
   * @param {Object} context
   * @param {Object} payload { pageSelect: 当前选中的tagName }
   */
  async closeLeft ({ state, commit, dispatch }, { pageSelect } = {}) {
    const pageAim = pageSelect || state.current
    let currentIndex = 0
    state.opened.forEach((page, index) => {
      if (page.fullPath === pageAim) currentIndex = index
    })
    if (currentIndex > 0) {
      // 删除打开的页面 并在缓存设置中删除
      for (let i = state.opened.length - 1; i >= 0; i--) {
        if (state.opened[i].name === 'index' || i >= currentIndex) continue
        commit('KEEP_ALIVE_REMOVE', state.opened[i].name)
        state.opened.splice(i, 1)
      }
    }
    // 持久化
    await dispatch('opened2db')
    // 设置当前的页面
    state.current = pageAim
    if (router.app.$route.fullPath !== pageAim) await router.push(pageAim)
  },
  /**
   * @class opened
   * @description 关闭当前标签右边的标签
   * @param {Object} context
   * @param {Object} payload { pageSelect: 当前选中的tagName }
   */
  async closeRight ({ state, commit, dispatch }, { pageSelect } = {}) {
    const pageAim = pageSelect || state.current
    let currentIndex = 0
    state.opened.forEach((page, index) => {
      if (page.fullPath === pageAim) currentIndex = index
    })
    // 删除打开的页面 并在缓存设置中删除
    for (let i = state.opened.length - 1; i >= 0; i--) {
      if (state.opened[i].name === 'index' || currentIndex >= i) continue
      commit('KEEP_ALIVE_REMOVE', state.opened[i].name)
      state.opened.splice(i, 1)
    }
    // 持久化
    await dispatch('opened2db')
    // 设置当前的页面
    state.current = pageAim
    if (router.app.$route.fullPath !== pageAim) await router.push(pageAim)
  },
  /**
   * @class opened
   * @description 关闭当前激活之外的 tag
   * @param {Object} context
   * @param {Object} payload { pageSelect: 当前选中的tagName }
   */
  async closeOther ({ state, commit, dispatch }, { pageSelect } = {}) {
    const pageAim = pageSelect || state.current
    let currentIndex = 0
    state.opened.forEach((page, index) => {
      if (page.fullPath === pageAim) currentIndex = index
    })
    // 删除打开的页面数据 并更新缓存设置
    for (let i = state.opened.length - 1; i >= 0; i--) {
      if (state.opened[i].name === 'index' || currentIndex === i) continue
      commit('KEEP_ALIVE_REMOVE', state.opened[i].name)
      state.opened.splice(i, 1)
    }
    // 持久化
    await dispatch('opened2db')
    // 设置新的页面
    state.current = pageAim
    if (router.app.$route.fullPath !== pageAim) await router.push(pageAim)
  },
  /**
   * @class opened
   * @description 关闭所有 tag
   * @param {Object} context
   */
  async closeAll ({ state, commit, dispatch }) {
    // 删除打开的页面 并在缓存设置中删除
    for (let i = state.opened.length - 1; i >= 0; i--) {
      if (state.opened[i].name === 'index') continue
      commit('KEEP_ALIVE_REMOVE', state.opened[i].name)
      state.opened.splice(i, 1)
    }
    // 持久化
    await dispatch('opened2db')
    // 关闭所有的标签页后需要判断一次现在是不是在首页
    if (router.app.$route.name !== 'index') {
      await router.push({ name: 'index' })
    }
  },
  /**
   * @class opened
   * @description 关闭一个 tag (关闭一个页面)
   * @param {Object} context
   * @param {Object} payload { tagName: 要关闭的标签名字 }
   */
  async close ({ state, commit, dispatch }, { tagName }) {
    // 预定下个新页面
    let newPage = {}
    const isCurrent = state.current === tagName
    // 如果关闭的页面就是当前显示的页面
    if (isCurrent) {
      // 去找一个新的页面
      const len = state.opened.length
      for (let i = 0; i < len; i++) {
        if (state.opened[i].fullPath === tagName) {
          newPage = i < len - 1 ? state.opened[i + 1] : state.opened[i - 1]
          break
        }
      }
    }
    // 找到这个页面在已经打开的数据里是第几个
    const index = state.opened.findIndex((page) => page.fullPath === tagName)
    if (index >= 0) {
      // 如果这个页面是缓存的页面 将其在缓存设置中删除
      commit('keepAliveRemove', state.opened[index].name)
      // 更新数据 删除关闭的页面
      state.opened.splice(index, 1)
    }
    // 持久化
    await dispatch('opened2db')
    // 决定最后停留的页面
    if (isCurrent) {
      const { name = 'index', params = {}, query = {}} = newPage
      const routerObj = { name, params, query }
      await router.push(routerObj)
    }
  },

  /**
   * @description: 刷新页面
   */
  refreshPage () {
    console.log('navigator', window.location)
    router.push({ name: 'refresh' })
  },

  /**
   * @description: 项目框架重加载
   */
  reloadFrame () {
    window.location.reload()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
