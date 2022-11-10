/*
 * @Author: Null
 * @Date: 2022-02-07 15:37:22
 * @Description: 全局搜索弹窗
 */
const state = {
  // 全局搜索弹窗的显示和隐藏
  showSearchAllDialogCount: 0
}

const mutations = {
  SET_SEARCH_ALL_VISIBLE (state) {
    state.showSearchAllDialogCount += 1
  }
}

const actions = {
  showSearchAllDialog ({ commit }) {
    commit('SET_SEARCH_ALL_VISIBLE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
