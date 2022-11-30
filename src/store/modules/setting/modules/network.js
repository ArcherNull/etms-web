/*
 * @Author: Null
 * @Date: 2022-11-30 14:43:05
 * @Description: 网络
 */

const state = {
  connection: {
    effectiveType: '',
    downlink: '',
    rtt: '',
    saveDate: ''
  }
}

const mutations = {
  SET_CONNECTION (state, connection) {
    state.connection = Object.assign(state.connection, connection)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
