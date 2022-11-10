/*
 * @Author: Null
 * @Date: 2022-05-20 09:08:13
 * @Description: 搜索引擎
 */

const state = {
  // 左侧筛选列表
  filterLeftList: [
    {
      title: '页面模块'
    },
    {
      title: 'icon图标'
    },
    {
      title: '图片'
    }
  ],
  // 右侧筛选列表
  filterRightList: [
    {
      title: '其它'
    }
  ]
  // 当前选择
}

const mutations = {
  /**
   * @description: 设置右侧筛选列表
   * @param arr object[] 推荐搜索模块数组
   * @return {*}
   */
  SET_FILTER_LEFT_LIST (state, arr) {
    state.filterLeftList = arr
  },
  SET_FILTER_RIGHT_LIST (state, arr) {
    state.filterRightList = arr
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
