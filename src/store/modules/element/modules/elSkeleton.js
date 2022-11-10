/*
 * @Author: Null
 * @Date: 2022-01-19 14:16:07
 * @Description: 更改elementUI的el-button按钮的全局样式
 */

const state = {
  // 是否使用动画  boolean
  animated: true,
  // 延迟占位 DOM 渲染的时间, 单位是毫秒  正整数  number
  throttle: 200
}

const mutations = {
  // 是否使用动画  boolean
  SET_ANIMATED: (state, animated) => {
    state.animated = animated
  },
  // 延迟占位 DOM 渲染的时间, 单位是毫秒  正整数  number
  SET_THROTTLE: (state, throttle) => {
    state.throttle = throttle
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

