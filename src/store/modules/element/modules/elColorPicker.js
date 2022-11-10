/*
 * @Author: Null
 * @Date: 2022-03-07 10:58:30
 * @Description: 对el-color-picker二次封装
 */

const state = {
  // 推荐颜色板
  suggestColorList: [
    {
      name: 'Success',
      content: '主要是用于一些成功消息的颜色提示',
      // color: 'rgb(103,194,58)'
      color: '#67C23A'
    },
    {
      name: 'Warning',
      // color: 'rgb(230,162,60)'
      color: '#E6A23C'
    },
    {
      name: 'Danger',
      // color: 'rgb(245,108,108)'
      color: '#F56C6C'
    },
    {
      name: 'Info',
      // color: 'rgb(144,147,153)'
      color: '#909399'
    }
  ],
  // 禁用
  disabled: false,
  // 是否支持透明度  boolean
  showAlpha: false,
  // 写入 v-model 的颜色的格式   string  hsl / hsv / hex / rgb    hex（show-alpha 为 false）/ rgb（show-alpha 为 true）
  colorFormat: 'hex',
  // 预定义颜色  array
  // predefine: ['rgb(245,108,108)', 'rgb(144,147,153)']
  predefine: ['#409EFF', '#67C23A', '#E6A23C']

}

const mutations = {
  // 设置推荐颜色
  SET_SUGGEST_COLOR_LIST: (state, array) => {
    state.suggestColorList = array
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
