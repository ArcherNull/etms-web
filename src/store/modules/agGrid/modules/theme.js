/*
 * @Author: Null
 * @Date: 2022-01-19 14:16:07
 * @Description: 更改elementUI的el-button按钮的全局样式
 */

const state = {
  // 图片地址  string
  theme: 'alpine'
  //
}

const mutations = {
  // 设置主题
  SET_THEME: (state, theme) => {
    state.theme = theme
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

