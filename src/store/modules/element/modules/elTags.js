/*
 * @Author: Null
 * @Date: 2022-01-19 14:16:07
 * @Description: 更改elementUI的el-tags全局样式
 */

const state = {
  // 是否禁用渐变动画  boolean
  disableTransitions: false,
  // 是否有边框描边 boolean
  hit: false,
  // 尺寸  string  medium / small / mini
  size: 'medium',
  // 主题  string  dark / light / plain
  effect: 'light'
}

const mutations = {
  // 图片地址
  SET_DISABLE_TRANSITION: (state, bool) => {
    state.disableTransitions = bool
  },
  // 否有边框描边 boolean
  SET_HIT: (state, hit) => {
    state.hit = hit
  },
  // 尺寸  string  medium / small / mini
  SET_SIZE: (state, size) => {
    state.size = size
  },
  // 主题  string  dark / light / plain
  SET_EFFECT: (state, effect) => {
    state.effect = effect
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
