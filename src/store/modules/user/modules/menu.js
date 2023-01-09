/*
 * @Author: Null
 * @Date: 2021-11-22 23:15:41
 * 用户登录时，进行的一些状态存储
 */
import api from '@/api/index'
import { generaMenu } from '@/router/routers'

const state = {
  routes: []
}

const mutations = {
  // 设置用户登录信息
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes ({ commit }) {
    commit('SET_ROUTES', [])
    return new Promise((resole, reject) => {
      api.system.user.getMenuTreeList().then((res) => {
        const resData = res?.data

        const asyncRoutes = generaMenu(resData)
        commit('SET_ROUTES', asyncRoutes)

        resole(asyncRoutes)
      })
        .catch(_ => {
          reject(false)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
