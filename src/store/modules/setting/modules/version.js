/*
 * @Author: Null
 * @Date: 2022-02-07 15:50:28
 * @Description: 系统版本信息
 */
import setting from '@/setting'
import commJs from '@/common/index'
import util from '@/libs/util'

const state = {}

const mutations = {}

const actions = {

  loadSystemInfo ({ dispatch }) {
    console.group(`%c${setting.name}`, 'color:#ff0000;font-size:16px;')
    // 系统信息
    dispatch('systemVersion')

    // 系统信息
    dispatch('systemInfo')

    // 名言
    dispatch('wellKnownSaying')

    // git仓库地址
    dispatch('gitRepository')

    console.groupEnd()
  },
  /**
   * @description: 打印系统版本信息
   * @param {*} dispatch
   * @return {*}
   */
  systemVersion () {
    return util.log.capsule(`${setting.name}-${process.env.NODE_ENV}`, `${setting.version}`)
  },

  /**
   * @description: 打印系统信息
   */
  systemInfo () {
    console.log('============== 系统信息 ==============')
    util.log.primary(`编译时间：${process.env.VUE_APP_BUILD_TIME}`)
    util.log.primary(`浏览器名称：${setting.systemInfo.vue_browser_name}；`)
    util.log.primary(`浏览器版本号：${setting.systemInfo.vue_browser_version}；`)
    util.log.primary(
      `浏览器Web渲染引擎：${setting.systemInfo.vue_browser_engine_name}；`
    )
    util.log.primary(`操作系统：${setting.systemInfo.vue_operation_cpu_name}`)
    console.log('=====================================')
  },

  /**
   * @description: 名言
   */
  wellKnownSaying () {
    const rendom = commJs.getRandom(0, setting.wellKnowSayingList.length - 1)
    const printText = setting.wellKnowSayingList[rendom][setting.defaultLanguage]
    util.log.primary(
      `${printText}`
    )
    return printText
  },

  /**
   * @description: 打印仓库开源git地址
   */
  gitRepository () {
    // 仓库地址
    util.log.primary(`仓库地址：${process.env.VUE_APP_REPO}`)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
