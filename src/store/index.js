/*
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
 */
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters.js'

// 用户设置
import user from './modules/user'
// 系统布局设置
import setting from './modules/setting'
// 用于外部文件处理
import files from './modules/files'
// elementUI 组件公共状态
import element from './modules/element'
// 系统设置面板
import settingsPanel from './modules/settingsPanel'
// ag-grid组件
import agGrid from './modules/agGrid'
// 全局搜索
import searchAll from './modules/searchAll'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    setting,
    files,
    element,
    settingsPanel,
    agGrid,
    searchAll
  }
})
