/*
 * @Author: Null
 * @Date: 2021-11-22 23:15:41
 * 用户登录时，进行的一些状态存储
 */

const state = {
  // 童虎登录信息
  userLoginInfo: {
    username: '',
    password: ''
  },

  // vuex 测试状态
  count: 1,
  // 按钮权限
  btnPermissions: []
}

const mutations = {
  // 设置用户登录信息
  SET_USERLOGININFO: (state, data) => {
    state.login = data
  }
}

const actions = {
  // 记录用户登录信息， 用户名及密码
  setUserLoginInfoFun ({ commit }, data) {
    commit('SET_USERLOGININFO', data)
  },
  // count 加 1
  setAddCountFun ({ commit }, data) {
    commit('SET_ADD_COUNT', data)
  },
  // count 减 1
  setSubstractCount ({ commit }, data) {
    commit('SET_SUBSTRACT_COUNT', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
