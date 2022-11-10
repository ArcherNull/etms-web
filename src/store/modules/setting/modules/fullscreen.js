/*
 * @Author: Null
 * @Date: 2022-01-19 08:31:25
 * @Description: 全屏显示
 */
import screenfull from 'screenfull'

const state = {
  // 全屏激活
  isFullscreen: false
}

const mutations = {
  /**
   * @description 设置 store 里的全屏状态
   * @param {Object} state state
   * @param {Boolean} isFullscreen isFullscreen
   */
  SET_CHANGE_FULLSCREEN (state, isFullscreen) {
    state.isFullscreen = isFullscreen
  }
}

const actions = {
  /**
   * @description 初始化监听
   * @param {Object} context
   */
  async listen ({ commit }) {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        if (screenfull.isFullscreen) {
          commit('SET_CHANGE_FULLSCREEN', true)
        } else {
          commit('SET_CHANGE_FULLSCREEN', false)
        }
      })
    }
  },
  /**
   * @description 切换全屏
   * @param {Object} context
   */
  toggle () {
    if (screenfull.isFullscreen) {
      screenfull.exit()
    } else {
      screenfull.request()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
