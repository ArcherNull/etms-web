/*
 * @Author: Null
 * @Date: 2022-01-19 14:16:07
 * @Description: 更改elementUI的el-descriptions全局样式
 */

const state = {
  // 	是否带有边框  boolean
  border: false,
  // 是否显示冒号 boolean
  colon: false,
  // 尺寸  string  medium / small / mini
  size: 'medium',
  // 自定义标签类名  string
  labelClassName: 'el-descriptions__global_css',
  // 自定义内容类名  string
  contentClassName: 'el-descriptions__global_css'
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

