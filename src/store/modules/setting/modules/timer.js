/*
 * @Author: Null
 * @Date: 2022-04-27 09:37:05
 * @Description: 计时器，用于计算用户登录系统时间，分时间给用户 发送不同的任务或提示
 */

const state = {
  // 初始化登录时间
  initLoginTime: '',
  // 时间节点数组 , 例如5分钟为一个节点 ， 此存储单位为min
  timeNodeArray: []
}

const mutations = {
  /**
     * @description: 设置用户初次登录时间
     * @param {Number} time 时间戳
     * @return {*}
     */
  SET_INTI_LOGIN_TIME (state, time) {
    state.initLoginTime = time
  },

  /**
     * @description: 设置时间节点数组
     * @param {Object[]} time 数组对象
     * @return {*}
     */
  SET_TIME_NODE_ARRAY (state, time) {
    state.initLoginTime = time
  }

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
