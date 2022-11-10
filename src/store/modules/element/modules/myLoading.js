/*
 * @Author: Null
 * @Date: 2022-03-22 14:32:09
 * @Description:
 */

const state = {
  // Fade-Circle 渐隐圆环 ； 3D-Flip 3D翻转； Surround-Slice 环绕切片； Surround-Circle 环绕圆
  currentSelectedLoadingType: 'Fade-Circle'
}

const mutations = {
  // 是否使用动画  boolean
  SET_CURRENT_SELECTED_LOADING_TYPE: (state, type) => {
    state.currentSelectedLoadingType = type
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
