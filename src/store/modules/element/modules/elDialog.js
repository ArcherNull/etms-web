/*
 * @Author: Null
 * @Date: 2022-03-02 09:50:43
 * @Description: 更改elementUI的el-dialog全局样式
 */

const state = {
  // 是否可以通过点击 modal 关闭Dialog  Booleaddn
  closeOnClickModal: false
}

const mutations = {
  // 是否可以通过点击 modal 关闭Dialog
  SET_CLOSE_ON_CLICK_MODAL: (state, bool) => {
    state.closeOnClickModal = bool
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
