/*
 * @Author: Null
 * @Date: 2021-12-20 21:13:07
 * @Description: 侧边菜单栏/头部/内容主题--布局配置
 */
import setting from '@/setting'

// 布局尺寸
const layoutSize = {
  dimensionUnit: 'px', // 尺寸 ， px 与rem
  sidebarWidth: 210, // 侧边菜单栏宽度
  // 侧边菜单栏高度
  sidebarHeight: {
    logoHeight: 50, // 侧边栏logo高度
    menuHeight: {
      menuTotalHeight: setting.windowHeight(), // 除开logo以外的高度
      menuSearchHeight: 40, // 菜单搜索栏
      menuParentLevelHeight: 40, // 单个一级或二级别菜单项的高度【也就是存在子菜单，点击不可跳转的菜单项】
      menuChildrenLevelHeight: 40 // 单个子级菜单项的高度【也就是点击可跳转的菜单项】
    },
    settingHeight: 40 // 底部设置高度
  },
  // header顶部高度
  headerStyle: {
    navBoxHeight: 40,
    tagsViewsHeight: 36
  },
  menubarIsFold: false // 菜单栏是否折叠
}

const state = {
  // 布局尺寸
  ...layoutSize
}

const mutations = {
  // 菜单栏折叠
  SET_FOLD_MENUBAR: (state, bool) => {
    state.menubarIsFold = bool
    if (bool) {
      state.sidebarWidth = 50
    } else {
      state.sidebarWidth = 210
    }
  },
  // 动态设置菜单栏高度
  SET_SIDEBAR_HEIGHT: (state, height) => {
    state.sidebarHeight.menuHeight.menuTotalHeight = height
  }
}

const actions = {
  /**
   * @description: 折叠打开菜单栏
   * @param {*} commit
   * @param {*} bool 折叠true/展开false
   */
  foldMenuBar ({ commit }, bool) {
    commit('SET_FOLD_MENUBAR', bool)
  },

  /**
   * @description: 设置菜单栏高度
   * @param {*} commit
   * @param {String} height 高度 px
   * @return {*}
   */
  setSidebarHeight ({ commit }, height) {
    commit('SET_SIDEBAR_HEIGHT', height)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
