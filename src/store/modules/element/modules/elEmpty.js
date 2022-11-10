/*
 * @Author: Null
 * @Date: 2022-01-19 14:16:07
 * @Description: 更改elementUI的el-empty按钮的全局样式
 */

const state = {
  // 图片地址  string
  image: 'https://static.moxueyuan.com/uploads_v3/e/644/429/e64429/img/2021/06/18/16239888381533.png',
  // 图片大小（宽度） number
  imageSize: 150,
  // 文本描述  string
  description: '暂无数据'
}

const mutations = {
  // 图片地址
  SET_IMAGE: (state, image) => {
    state.image = image
  },
  // 图片大小（宽度） number
  SET_IMAGE_SIZE: (state, imageSize) => {
    state.imageSize = imageSize
  },
  // 设置禁用
  SET_DESCRIPTION: (state, description) => {
    state.description = description
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

