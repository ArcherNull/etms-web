/*
 * @Author: Null
 * @Date: 2022-04-08 08:39:36
 * @Description:
 */

import setting from '@/setting'

const state = {
  currentLanuage: setting.defaultLanguage,
  // 当前语言列表
  languageList: {
    'zh-CN': '中文',
    'en': '英文',
    'zh-TW': '繁体',
    'ja': '日文'
  }
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
