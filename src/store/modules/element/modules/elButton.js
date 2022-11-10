/*
 * @Author: Null
 * @Date: 2022-01-19 14:16:07
 * @Description: 更改elementUI的el-button按钮的全局样式
 */

const state = {
  // 采用了MyButton组件统一样式设置 , medium / small / mini
  size: 'medium',
  // 是否朴素按钮
  plain: false,
  // 是否禁用状态
  disabled: false,
  // 图标类名
  icon: '',
  // 类型  primary / success / warning / danger / info / text
  type: '',
  // 全局禁用提示语
  title: ''
}

const mutations = {
  // 设置size
  SET_SIZE: (state, size) => {
    state.size = size
  },
  // 设置朴素按钮
  SET_PLAIN: (state, bool) => {
    state.plain = bool
  },
  // 设置禁用
  SET_DISABLED: (state, bool) => {
    state.disabled = bool
  },
  // 设置按钮类型
  SET_ICON: (state, icon) => {
    state.icon = icon
  },
  // 设置按钮图标  el-icon-lock  el-icon-unlock  el-icon-key
  SET_TYPE: (state, type) => {
    state.type = type
  },
  // 设置按钮提示语
  SET_TITLE: (state, title) => {
    state.title = title
  }
}

const actions = {
  /**
   * @description: 禁用所有el-button
   * @param {Boolean} bool 禁用或解禁
   * @return {*}
   */
  disableAllBtn ({ commit }, bool) {
    commit('SET_DISABLED', bool)
    commit('SET_ICON', bool ? 'el-icon-lock' : '')
  },
  /**
   * @description: 重置所有el-button
   * @return {*}
   */
  resetAllBtn ({ commit }) {
    commit('SET_SIZE', 'medium')
    commit('SET_PLAIN', false)
    commit('SET_DISABLED', false)
    commit('SET_ICON', '')
    commit('SET_TYPE', '')
    commit('SET_TITLE', '')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
