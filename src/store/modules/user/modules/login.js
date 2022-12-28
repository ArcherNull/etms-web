/*
 * @Author: Null
 * @Date: 2021-11-22 23:15:41
 * 用户登录时，进行的一些状态存储
 */
import api from '@/api/index'
// import { showMessage } from '@/serve/httpCommon'
import util from '@/libs/util'

const state = {
  // 公司列表
  companyList: [],
  // 童虎登录信息
  userLoginInfo: {
    userLogin: '',
    userPwd: '',
    companyId: ''
  },
  // 按钮权限
  btnPermissions: []
}

const mutations = {
  // 设置用户登录信息
  SET_USER_LOGIN_INFO: (state, data) => {
    state.login = data
  },
  // 设置公司列表
  SET_COMPANY_LIST: (state, list) => {
    state.companyList = list
  }
}

const actions = {
  // 记录用户登录信息， 用户名及密码
  setUserLoginInfoFun ({ commit }, data) {
    commit('SET_USER_LOGIN_INFO', data)
  },
  // 用户登录
  async login ({ commit, dispatch }, dataObj) {
    try {
      const { code, data, msg } = await api.login.login(dataObj)

      if (code === 200 && data?.token) {
        // 保存token
        util.cookies.set('token', data?.token)
        // 保存用户登录表单
        commit('SET_USER_LOGIN_INFO', data)

        return Promise.resolve(true)
      } else {
        throw new Error(msg || '获取token失败')
      }
    } catch (error) {
      return Promise.resolve(false)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
