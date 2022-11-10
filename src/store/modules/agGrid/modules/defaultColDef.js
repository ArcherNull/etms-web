/*
 * @Author: Null
 * @Date: 2022-03-28 19:13:29
 * @Description: ag-grid表格全局defaultColDef配置
 */
import { cloneDeep } from 'lodash'

const cellStyle = { color: '#333', 'line-height': '34px' }

const defaultValue = {
  // 默认宽度宽度 ， 如果存在resizable: true, width/minWidth/maxWidth限制失效，并且gridApi.sizeColumnsToFit()也会打破width/minWidth/maxWidth限制
  // 这个应该是style的width样式,resizable: true/ gridApi.sizeColumnsToFit(),是js改变dom样式，优先级大于style
  // 要将这个gridApi.sizeColumnsToFit()注释掉，width才生效
  width: 120,
  minWidth: 80, // 【重要】最小宽度， 最小和最大宽度可限制列拖动
  maxWidth: 600, // 【重要】最大宽度
  cellStyle, // 列的单元格默认样式
  // hide: false, // 是否隐藏
  sort: true, // 前端排序方式 asc 顺序 desc倒序，还有自定义拍序 .优先顺序为 sortable为true,才能设置排序方法，sort与 comparator 不能共存
  // comparator: dateComparator, // 自定义排序，dateComparator为排序方法名
  sortable: true, // 是否开启排序，这个是展示原本的列头排序，当sort设置不是true时，有数字展示；操作之后就消失
  resizable: true, // true可以拖动改变列的大小，false不允许用户拖动改变列大小
  filter: true, // 是否显示筛选
  editable: false, // 是否可编辑,存在突然失效的情况【未知其原因】在键盘中按下D可打开编辑,跟options中的singleClickEdit: false,true单击可编辑存在关联,false不实现单击可关联
  suppressMenu: false // 【重要】列头右侧的菜单栏按钮显示和隐藏，true为隐藏，false为显示
}

const state = {
  ...cloneDeep(defaultValue)
}

const mutations = {
  SET_WIDTH: (state, width) => {
    state.width = width
  },
  SET_MIN_WIDTH: (state, minWidth) => {
    state.minWidth = minWidth
  },
  SET_MAX_WIDTH: (state, maxWidth) => {
    state.width = maxWidth
  },
  SET_CELL_STYLE: (state, styles) => {
    state.cellStyle = styles || cellStyle
  },
  SET_SORTABLE: (state, bool) => {
    state.sortable = bool
  },
  SET_RESIZEABLE: (state, bool) => {
    state.resizable = bool
  },
  SET_FILTER: (state, bool) => {
    state.filter = bool
  },
  SET_SUPPRESS_MENU: (state, bool) => {
    state.filter = bool
  }
}

const actions = {
  /**
   * @description: ag-grid表格恢复默认设置
   * @param {*} commit
   * @return {*}
   */
  resetAgGridSetting ({ commit }) {
    commit('SET_WIDTH', 120)
    commit('SET_MIN_WIDTH', 80)
    commit('SET_MAX_WIDTH', 600)
    commit('SET_CELL_STYLE')
    commit('SET_SORTABLE', true)
    commit('SET_RESIZEABLE', true)
    commit('SET_FILTER', true)
    commit('SET_SUPPRESS_MENU', false)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

