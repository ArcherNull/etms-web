/*
 * @Author: Null
 * @Date: 2022-02-07 15:37:22
 * @Description: 系统设置面板样式
 */
// import util from '@/libs/util'

const state = {
  panelTabsPosition: 'top', // 设置面板样式定位
  panelTabsItem: ['icon', 'text'], // icon以及文本
  openMeasurePixel: false, // 打开尺寸测量工具
  showSettingDrawerCount: 0 // 快捷键打开设置侧边窗计数
}

const mutations = {
  SET_PANEL_TABS_POSITION (state, position) {
    state.panelTabsPosition = position
  },
  SET_PANEL_TABS_ITEM (state, tabsitemStyle) {
    state.panelTabsItem = tabsitemStyle
  },
  SET_SHOW_SETTING_DRAWER (state) {
    state.showSettingDrawerCount += 1
  }
}

const actions = {
  // 打开设置弹窗
  showSettingDrawerCount ({ commit }) {
    commit('SET_SHOW_SETTING_DRAWER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
