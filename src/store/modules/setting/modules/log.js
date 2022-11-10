/*
 * @Author: Null
 * @Date: 2022-01-25 14:01:10
 * @Description: 前端错误日志打印
 */
import { errorLogFun, operationLogFun } from '@/common/logFun'

const state = {
  // 错误日志
  // + 日志条目的属性
  //   - message 必须 日志信息
  //   - type 非必须 类型 success | warning | info(默认) | danger
  //   - time 必须 日志记录时间
  //   - meta 非必须 其它携带信息

  log: []
}

const mutations = {
  /**
   * @description 添加日志
   * @param {Object} state state
   * @param {Object} log data
   */
  PUSH (state, log) {
    state.log.push(log)
  },
  /**
   * @description 清空日志
   * @param {Object} state state
   */
  CLEAN (state) {
    state.log = []
  }
}

const actions = {
  /**
   * @description 添加一个日志
   * @param {Object} context
   * @param {String} param message {String} 信息
   * @param {String} param type {String} 类型
   * @param {Object} payload meta {Object} 附带的信息
   */
  pushErrorLog ({ rootState, commit }, { message, type = 'info', meta }) {
    const errorLog = errorLogFun({ message, type, meta })
    commit('PUSH', errorLog)
  },

  /**
   * @description 添加一个日志
   * @param {Object} context
   * @param {String} param message {String} 信息
   * @param {String} param type {String} 类型
   * @param {Object} payload meta {Object} 附带的信息
   */
  pushOperationLog ({ rootState, commit }, { message, type = 'info', meta }) {
    const errorLog = operationLogFun({ message, type, meta })
    commit('PUSH', errorLog)
  },

  /**
   * @description:  清除日志
   * @return {*}
   */
  clearAllErrorLog ({ commit }) {
    commit('CLEAN')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
