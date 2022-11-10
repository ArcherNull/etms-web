/*
 * @Author: Null
 * @Date: 2022-03-03 08:52:30
 * @Description: 热键设置 hotkeys
 */
// 快捷键示例 ： shift+a  alt+d

import hotkeys from 'hotkeys-js'

const state = {
  // 打开设置面板快捷键 ctrl + s
  hotkeysShowSettingsPanel: 'f3',
  // 打开消息通知
  hotkeyShowNotice: 'n',
  // 全局搜索面板
  hotkeyShowSearch: 's',
  // 快捷面板
  shortcutPanel: 'ctrl+p'
}

const mutations = {
  // 快捷键打开设置面板
  SET_HOTKEYS_SHOW_SETTINGS_PANEL: (state, hotkey) => {
    state.hotkeysShowSettingsPanel = hotkey
  },

  // 重新设置state
  SET_CHANGE_ALL_HOTKEYS: (state, hotkeys) => {
    state = hotkeys
  }
}

const actions = {
  /**
   * @description: 设置自定义的快捷键
   * @param {Object} resetHotkeys 重新设置的快捷键对象
   * @return {*}
   */
  setCustomerHotkeys ({ state, dispatch }, resetHotkeys) {
    console.log('设置自定义的快捷键')
    const hotkeysArr = Object.values(resetHotkeys).join(',')

    hotkeys(hotkeysArr, function (event, handler) {
      const key = handler.key
      if (state.hotkeysShowSettingsPanel === key) {
        // alert('hotkeysShowSettingsPanel--设置面板-- 被快捷键点击')
        dispatch('settingsPanel/panelStyle/showSettingDrawerCount', null, { root: true })
        return
      } else if (state.hotkeyShowNotice === key) {
        alert('hotkeyShowNotice--消息通知-- 被快捷键点击')
        return
      } else if (state.hotkeyShowSearch === key) {
        // alert('hotkeyShowSearch--全局搜索-- 被快捷键点击')
        dispatch('searchAll/searchAllDialog/showSearchAllDialog', null, { root: true })
        return
      } else if (state.shortcutPanel === key) {
        alert('shortcutPanel--快捷面板-- 被快捷键点击')
        return
      }
      event.preventDefault()
    })
  },

  /**
   * @description: 加载缓存中的hotkeys
   * @param {*}
   * @return {*}
   */
  async loadHotkeys ({ state, commit, dispatch }) {
    const hotkeys = await dispatch(
      'setting/db/get',
      {
        dbName: 'sys',
        path: 'hotkeys',
        defaultValue: state, // 如果缓存中没有user.sys.hotkeys 属性没有值，那么就加载此默认值
        user: true
      },
      { root: true }
    )
    const resetHotkeys = Object.assign(state, hotkeys)
    console.log('自定义好的快捷键', resetHotkeys)
    commit('SET_CHANGE_ALL_HOTKEYS', resetHotkeys)

    dispatch('setCustomerHotkeys', resetHotkeys)
  },

  /**
   * @description: 重新设置打开设置面板快捷键的方法
   * @param {*}
   * @return {*}
   */
  setHotkeysShowSettingsPanel ({ commit, dispatch }, hotkey = 's') {
    dispatch(
      'setting/db/set',
      {
        dbName: 'sys',
        path: 'hotkeys.hotkeysShowSettingsPanel',
        value: hotkey,
        user: true
      },
      { root: true }
    )
    commit('SET_HOTKEYS_SHOW_SETTINGS_PANEL', hotkey)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
