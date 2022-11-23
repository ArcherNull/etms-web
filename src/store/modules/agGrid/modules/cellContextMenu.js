/*
 * @Author: Null
 * @Date: 2022-11-11 11:15:35
 * @Description:
 */

const state = {
  agEventList: null, // ag-grid事件
  // 打开单元格鼠标右键菜单列表
  openCellMenuList: false,
  menuListData: {},
  left: 0, // 右侧菜单的坐标y
  top: 0, // 右侧菜单的坐标x
  openDialogCount: 0, // 菜单栏中打开弹窗的次数

  showFirstColumn: false, // 显示和隐藏底展示序号列
  showCalcBottomRow: true, // 显示和隐藏底部合计行

  openCloEllipsis: false, // 列省略展开
  pageSize: 100, // 每页条数
  maxSelectedRows: 200, // 最大选择行数据条数
  maxExportRows: 200 // 最大导入行数据条数

}

const mutations = {
  // ag-grid事件
  SET_AG_EVENT_LIST: (state, data) => {
    state.agEventList = data
  },
  // 打开单元格鼠标右键菜单列表
  OPEN_CELL_MENU_LIST: (state, openCellMenuList) => {
    state.openCellMenuList = openCellMenuList
  },
  // 打开单元格鼠标右键菜单列表
  SET_MENU_LIST_DATA: (state, menuListData) => {
    state.menuListData = menuListData
  },
  // 打开单元格鼠标右键菜单列表
  SET_LEFT: (state, left) => {
    state.left = left
  },
  // 打开单元格鼠标右键菜单列表
  SET_TOP: (state, top) => {
    state.top = top
  },
  // 打开单元格鼠标右键菜单列表
  SET_OPEN_DIALOG_COUNT: (state, count) => {
    state.openDialogCount += count
  },
  // 设置第一行序号列
  SET_SHOW_FIRST_COLUMN: (state, bool) => {
    state.showFirstColumn = bool
  },
  // 显示和隐藏底部合计行
  SET_SHOW_CALC_BOTTOM_ROW: (state, bool) => {
    state.showCalcBottomRow = bool
  },
  // 设置每页条数
  SET_OPEN_CLO_ELLIPSIS: (state, openCloEllipsis) => {
    state.openCloEllipsis = openCloEllipsis
  },
  // 设置每页条数
  SET_PAGE_SIZE: (state, pageSize) => {
    state.pageSize = pageSize
  },
  // 最大选择行数据条数
  SET_MAX_SELECTED_ROWS: (state, maxSelectedRows) => {
    state.maxSelectedRows = maxSelectedRows
  },
  // 最大导入行数据条数
  SET_MAX_EXPORT_ROWS: (state, maxExportRows) => {
    state.maxExportRows = maxExportRows
  }
}

const actions = {
  /**
   * @description:打开右键弹窗
   * @param {*} data
   * @return {*}
   */
  openCellMenuList ({ commit }, data) {
    const { openCellMenuList, menuListData } = data
    console.log('menuListData', menuListData)
    commit('OPEN_CELL_MENU_LIST', openCellMenuList)
    commit('SET_MENU_LIST_DATA', menuListData)
    const event = menuListData?.event
    if (event) {
      event.preventDefault()
      commit('SET_LEFT', event.clientX)
      commit('SET_TOP', event.clientY)
    }
    return false
  },

  /**
   * @description: 接收ag-grid点击事件
   * @param {*} commit
   * @param {*} data
   * @return {*}
   */
  receiveEventData ({ state, commit, dispatch }, data) {
    const { row, eventName } = data
    console.log('eventName=====>', eventName)
    console.log('row=====>', row)
    if (eventName === 'onCellContextMenu') {
      const bool = state.openCellMenuList
      dispatch('openCellMenuList', {
        openCellMenuList: !bool,
        menuListData: row
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

