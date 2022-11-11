/*
 * @Author: Null
 * @Date: 2022-03-15 15:18:25
 * @Description:用于ag-grid与Vue实例之间的通信的中间件
 */
import Vue from 'vue'
import store from '@/store/index'

export const eventBus = new Vue()

/**
 * @description: 接受数据
 * @param {*} data
 * @return {*}
 */
export const receiveData = (data) => {
  const { row, eventName } = data
  console.log('eventName=====>', eventName)
  console.log('row=====>', row)
  switch (eventName) {
    case 'onCellContextMenu':
      cellContextMenuFun(row)
      break
  }
}

/**
 * @description: 处理cell选择事件回调onCellContextMenu
 * @param {*} row
 * @return {*}
 */
const cellContextMenuFun = (row) => {
  const bool = store.state.agGrid.cellContextMenu.openCellMenuList
  store.dispatch('agGrid/cellContextMenu/openCellMenuList', {
    openCellMenuList: !bool,
    menuListData: row
  })
}
