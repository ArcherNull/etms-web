/*
 * @Author: Null
 * @Date: 2022-03-22 11:00:01
 * @Description: el-image二次封装
 */

const state = {
  style: {
    'width': '100px',
    'height': '100px'
  }
}

const mutations = {
  // 设置el-image自定义样式
  SET_STYLE (state, style) {
    state.style = style
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

