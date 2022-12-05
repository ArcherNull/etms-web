/*
 * @Author: Null
 * @Date: 2021-11-11 09:31:20
 * @Description: 项目主题更换
 */
import { cloneDeep } from 'lodash'
import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'

export default {
  namespaced: true,
  state: {
    // 颜色
    value: process.env.VUE_APP_ELEMENT_COLOR,
    // 主题  默认主题default-theme ; 暗黑主题 black-theme ； 炫红主题 red-theme ; 灰度模式 gray-theme
    theme: 'default-theme'
  },
  actions: {
    /**
     * @description 设置颜色
     * @param {Object} context
     * @param {String} color 尺寸
     */
    async set ({ state, dispatch, commit }, color) {
      // 记录上个值
      const old = state.value
      // store 赋值
      state.value = color || process.env.VUE_APP_ELEMENT_COLOR
      // 持久化
      await dispatch(
        'setting/db/set',
        {
          dbName: 'sys',
          path: 'color.value',
          value: state.value,
          user: true
        },
        { root: true }
      )
      // 应用
      commit('APPLY', {
        oldColor: old,
        newColor: state.value
      })
    },
    /**
     * @description 从持久化数据读取颜色设置
     * @param {Object} context
     */
    async load ({ state, dispatch, commit }) {
      // 记录上个值
      const old = state.value
      // store 赋值
      state.value = await dispatch(
        'setting/db/get',
        {
          dbName: 'sys',
          path: 'color.value',
          defaultValue: process.env.VUE_APP_ELEMENT_COLOR,
          user: true
        },
        { root: true }
      )
      // 应用
      commit('APPLY', {
        oldColor: old,
        newColor: state.value
      })
    }

  },
  mutations: {
    /**
     * @description 将 vuex 中的主题颜色设置应用到系统中
     * @param {Object} context
     * @param {Object} payload oldColor {String} 旧的颜色
     * @param {Object} payload newColor {String} 新颜色
     */
    APPLY (state, { oldColor, newColor }) {
      var options = {
        oldColors: cloneDeep(forElementUI.getElementUISeries(oldColor)),
        newColors: cloneDeep(forElementUI.getElementUISeries(newColor))
      }
      client.changer.changeColor(options)
    },
    /**
     * @description: 设置主题
     * @param {*} state
     * @param {*} theme
     * @return {*}
     */
    SET_THEME (state, theme) {
      state.theme = theme
    }
  }
}
