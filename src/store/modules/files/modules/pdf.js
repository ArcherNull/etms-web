/*
 * @Author: Null
 * @Date: 2022-01-19 14:16:07
 * @Description: 用于PDF文件的设置
 */

const state = {
  // 用于全局预览PDF文件的URL
  // 测试PDF链接：'http://3pl.dekuncn.com//upload/2022-01-19/202201191105532490ZR78NC.pdf'
  previewPDFUrl: ''

}

const actions = {

}

const mutations = {
  // 用于全局预览PDF文件的弹窗的展示或隐藏
  SET_PREVIEW_PDF_URL: (state, data) => {
    state.previewPDFUrl = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
