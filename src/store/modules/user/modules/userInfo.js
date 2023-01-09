/*
 * @Author: Null
 * @Date: 2022-02-07 15:37:22
 * @Description: 用户登录等信息
 */
import { isObject, isEmpty } from 'lodash'
import { showMessage } from '@/serve/httpCommon'
import util from '@/libs/util'
import router from '@/router/index'
import { clearMessageInterval } from '@/common/timePoll'
import api from '@/api/index'

const state = {
  // 事业部列表
  divisionList: [],
  // 灰度模式
  garyMode: false,
  // 用户设备 mobile / desktop 两种 ， 以992px为分界线
  device: 'desktop',

  // 用户信息数据
  organization: [], // 组织管理【不含公司管理列表】
  organization4: [], // 组织管理【含公司管理列表】
  roleInfo: [], // 角色信息
  userInfo: [] // 用户信息
}

const mutations = {
  SET_DIVISION_LIST (state, list) {
    state.divisionList = list
  },

  /**
   * @description 切换灰度状态
   */
  SET_GRAY_MODE_TOGGLE (state) {
    state.garyMode = !state.garyMode
  },

  /**
   * @description 设置灰度模式
   * @param {Boolean} active 灰度模式的开启和关闭
   */
  SET_GRAY_MODE (state, active) {
    state.garyMode = active
  },

  /**
   * @description:  设置设备
   * @param { String } deviceInfo  mobile / desktop
   */
  SET_DEVICE (state, deviceInfo) {
    state.device = deviceInfo
  },

  /**
   * @description:  设置设备
   * @param { String } deviceInfo  mobile / desktop
   */
  SET_USER_INFO (state, data) {
    state.organization = data?.organization || []
    state.organization4 = data?.organization4 || []
    state.roleInfo = data?.roleInfo || []
    state.userInfo = data?.userInfo || []
  }
}

const actions = {
  /**
   * @description: 提取localStorage中的数据，加载用户信息
   * @param {*} dispatch 分发事件
   * @return {*}
   */
  async loadUserInfo ({ dispatch }) {
    // 持久化数据加载上次退出时的多页列表
    await dispatch('setting/tagViews/openedLoad', null, { root: true })
    // 全屏监听
    await dispatch('setting/fullscreen/listen', null, { root: true })

    // 测试快捷键用 【可删除】
    await dispatch('settingsPanel/hotkeys/setHotkeysShowSettingsPanel', 'f8', {
      root: true
    })

    // 加载用户自定义快捷键
    await dispatch('settingsPanel/hotkeys/loadHotkeys', null, { root: true })

    // 加载用户默认的主题色
    await dispatch('setting/theme/load', null, { root: true })

    // 加载用户上次登录信息
    await dispatch(
      'setting/db/get',
      {
        dbName: 'user',
        path: 'user.userInfo',
        defaultValue: {
          username: '坤龙游客',
          role: '游客',
          helpMessage: '坤龙账号游客账户限时半小时登录！',
          limitTime: 60 * 1000 * 30
        },
        user: true
      },
      { root: true }
    )
  },

  /**
   * @description: 登出
   * @return {*}
   */
  logout () {
    util.cookies.remove('token')
    const currentPath = router.history.current.path
    console.log('currentPath========>', currentPath)
    router.push({
      path: `/login?redirect=${currentPath}`
    })
    clearMessageInterval()
  },

  setDeviceInfo ({ commit }, deviceInfo) {
    commit('SET_DEVICE', deviceInfo)
  },

  // 获取用户详情
  async getUserInfo ({ commit }) {
    const { code, data: userData, msg } = await api.system.user.getUserInfo()
    if (code === 200) {
      const { organization, organization4, roleInfo, userInfo } = userData
      const validateResult = await validateUserInfo({
        organization,
        organization4,
        roleInfo,
        userInfo
      })
      validateResult && commit('SET_USER_INFO', validateResult)
    } else {
      throw new Error(msg || '获取用户详情失败')
    }
  }
}

function validateUserInfo (data) {
  return new Promise((resolve, reject) => {
    if (isObject(data) && !isEmpty(data)) {
      const validateObj = {
        organization: '组织管理数据【不含公司】',
        organization4: '组织管理数据【含公司】',
        roleInfo: '角色信息',
        userInfo: '用户信息'
      }

      Object.keys(validateObj).forEach((ele) => {
        if (!data[ele]) {
          setTimeout(() => {
            showMessage(validateObj[ele] + '信息数据获取失败')
          })
        }
      })
      resolve(data)
    } else {
      throw new Error('校验用户信息数据失败')
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
