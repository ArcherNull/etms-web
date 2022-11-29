/*
 * @Author: Null
 * @Date: 2022-02-22 16:08:32
 * @Description: ag-grid 方法
 */

// 定时器，用于刷新手动计算的合计行 paginationChanged
import store from '@/store/index'
import {
  AgGridUtils,
  refreshTotalToList,
  getCurrentGridDataAndNumericalOrder
} from './agGrid-utils'

export const agGridMethods = {
  /**
   * @description: 滚动事件bodyScroll,对应ag-grid-vue 标签上的@bodyScroll事件的监听
   * @param {*} event
   * @return {*}
   */
  bodyScroll (event) {
    console.log('滚动事件bodyScroll', event)
  },

  /**
   * @description: ag-grid创建完成后执行的事件,对应ag-grid-vue 标签上的@gridReady事件的监听
   * @param { ag-grid-vue组件传递过来的api } params
   * @return {*}
   */
  onGridReady (params) {
    console.log('ag-grid实例params', params)
    this.$emit('getGridApi', params)
    // 获取gridApi
    //  this.gridApi = params.api
    // this.columnApi = params.columnApi
    // 这时就可以通过gridApi调用ag-grid的传统方法了，调整表格为自适应
    // this.gridApi.sizeColumnsToFit()
  },

  /**
   * @description: 单元格鼠标悬浮事件cellMouseOver，对应ag-grid-vue 标签上的 @cellMouseOver
   * @param { 鼠标悬浮在单元格上的数据 } cell
   * @return {*}
   */
  cellMouseOver (cell) {
    console.log('单元格鼠标悬浮事件cellMouseOver', cell)
    console.log('this', this.columnApi.getRowStyle)
    console.log('cell', cell.colDef.cellStyle)
  },

  /* ****************  单元格点击事件调用顺序：onCellClicked => rowClicked => onRowDoubleClicked  **************** */
  /**
   * @description: 单元格点击事件onCellClicked,对应ag-grid-vue 标签上的 @cellClicked
   * @param { 点击的单元格数据 } cell
   * @return {*}
   */
  onCellClicked (cell) {
    this.$emit('onCellClicked', cell)
    console.log('单元格点击事件onCellClicked', cell)
    // 获取选中单元格的数据
    console.log('单元格点击事件onCellClicked--获取选中单元格的数据', cell.value)
    // 获取选中单元格所在行号
    console.log(
      '单元格点击事件onCellClicked--获取选中单元格所在行号',
      cell.rowIndex
    )
    // 获取选中单元格所在行的数据
    console.log(
      '单元格点击事件onCellClicked--获取选中单元格所在行的数据',
      cell.data
    )
  },

  /**
   * @description: 行单击事件rowClicked ,对应ag-grid-vue标签上的@rowClicked
   * @param { 点击的行数据 } cell
   * @return { }
   */
  rowClicked (cell) {
    console.log('行单击事件rowClicked', cell)
    // this.getRowData(getData(cell))
    if (cell.rowPinned === 'bottom') return
    this.$emit('getRowData', cell)
  },

  /**
   * @description: 行单元格聚焦事件 ,对应ag-grid-vue标签上的@rowClicked
   * @param { 点击的行单元格 } cell
   * @return { }
   */
  onCellFocused (cell) {
    console.log('行单击事件rowClicked', cell)
    // this.getRowData(getData(cell))
    if (cell.rowPinned === 'bottom') return
    this.$emit('getRowData', cell)
  },

  /**
   * @description: 行双击事件onRowDoubleClicked,对应ag-grid-vue 标签上的 @rowDoubleClicked
   * @param { 双击的单元格数据 } cell
   * @return { 【注意】需要用鼠标尖叫图形去触发的，因为按F12，鼠标图形会变成圆形的，该事件就不会点击触发}
   */
  rowDoubleClicked (cell) {
    console.log('行双击事件onRowDoubleClicked', cell)
    console.log('行双击事件onRowDoubleClicked--获取选中所在行的数据', cell.data)
    if (!['bottom', 'top'].includes(cell.rowPinned)) {
      if (this.showRowDetailDrawer) {
        // console.log('agTableOptions=========>', this.agTableOptions)
        this.showAgRowDataDetailDrawer = !this.showAgRowDataDetailDrawer
        if (this.showAgRowDataDetailDrawer) this.agRowDataDetailData = cell.data
      }
    }
    // this.$emit('onRowDoubleClickedFun', cell)
  },

  /* **************** 编辑事件调用顺序为：@cellEditingStarted => @cellValueChanged => @cellEditingStopped   ************** */
  /**
   * @description: 监听单元格开始编辑的事件cellEditingStarted,对应ag-grid-vue标签上的  @cellEditingStarted
   * @param { 开始编辑的单元格数据 } cell
   * @return {*}
   */
  cellEditingStarted (cell) {
    console.log('监听单元格开始编辑的事件cellEditingStarted', cell)
  },

  /**
   * @description: 监听单元格内容更改事件cellValueChanged,对应ag-grid-vue标签上的  @cellValueChanged
   * @param { 编辑内容更改的单元格数据 } cell
   * @return {*}
   */
  cellValueChanged (cell) {
    console.log('监听单元格内容更改事件cellValueChanged', cell)
  },

  /**
   * @description: 监听单元格修改后的操作cellEditingStopped,对应ag-grid-vue标签上的  @cellEditingStopped
   * @param { 终止编辑的单元格数据 } cell
   * @return {*}
   */
  cellEditingStopped (cell) {
    console.log('监听单元格修改后的操作cellEditingStopped', cell)
    this.$emit('cellEditingStoppedFun', cell)
  },

  /**
   * @description: cell选择事件回调onCellContextMenu,对应ag-grid-vue标签上的  @cellContextMenu
   * @param { 选中的行数据 } row
   * @return {*}
   */
  onCellContextMenu (row) {
    console.log('onCellContextMenu', row)
    store.dispatch('agGrid/cellContextMenu/receiveEventData', {
      row,
      eventName: 'onCellContextMenu'
    })
  },

  /**
   * @description: 列显示隐藏事件columnVisible , 对应ag-grid-vue标签上的  @columnVisible
   * @param {*} event
   * @return {*}
   */
  columnVisible (event) {
    console.log('列显示隐藏事件columnVisible', event)
    // 列必须消失后
    /*       if (!event.visible) {
                  // 可实现列保存功能
                } */
  },

  /**
   * @description: 列固定(冻结)事件columnPinned,对应ag-grid-vue标签上的  @columnPinned
   * @param {*} event
   * @return {*}
   */
  columnPinned (event) {
    console.log('列固定(冻结)事件columnPinned', event)
  },

  /**
   * @description: 列宽大小调整事件columnResized,对应ag-grid-vue标签上的  @columnResized
   * @param {*} event
   * @return {*}
   */
  columnResized (event) {
    console.log('列宽大小调整事件columnResized', event)
    // 列在拖动改变大小时是一个持续的过程，需要在完成的时候再去调用保存方法
    if (event.finished === true) {
      // 可实现列保存功能
    }
  },

  /**
   * @description: 列移动事件columnMoved ,对应ag-grid-vue标签上的  @columnMoved
   * @param {*} event
   * @return {*}
   */
  columnMoved (event) {
    console.log('列移动事件columnMoved', event)
    // 可实现列保存功能
  },

  /**
   * @description: 列数据加载的所有动作都完成最后的动作【不包括假数据筛选】,对应ag-grid-vue标签上的  @columnEverythingChanged
   * @param {*} event
   * @return {*}
   */
  columnEverythingChanged (event) {
    console.log(
      '列数据加载的所有动作都完成最后的动作【不包括假数据筛选】columnEverythingChanged',
      event
    )
  },

  /**
   * @description: 固定列数目发生改变监听事件,对应ag-grid-vue标签上的  @columnPinnedCountChanged
   * @param {*} event
   * @return {*}
   */
  columnPinnedCountChanged (event) {
    console.log('固定列数目发生改变监听事件columnPinnedCountChanged', event)
  },

  /* **************** 行数据事件 *************** */
  /**
   * @description: 行数据改变触发事件rowDataChanged,对应ag-grid-vue标签上的  @rowDataChanged
   * @param { 改变后的行数据 } row
   * @return {*}
   */
  rowDataChanged (row) {
    console.log('行数据改变触发事件rowDataChanged', row)
  },

  /**
   * @description: row选择事件回调rowSelected,对应ag-grid-vue标签上的  @rowSelected
   * @param { 选中的行数据 } row
   * @return {*}
   */
  rowSelected (row) {
    console.log('row选择事件回调rowSelected', row)
    this.$emit('rowSelected', row)
  },

  /**
   * @description: row行数据改变事件触发rowValueChanged,对应ag-grid-vue标签上的  @rowValueChanged
   * @param {*} row
   * @return {*}
   */
  rowValueChanged (row) {
    console.log('row行数据改变事件触发rowValueChanged', row)
  },

  /* ************* 分页事件paginationChanged / 表格刷新事件OnRowDataUpdatedEvent  / 过滤事件FilterChangedEvent  *************** */
  /**
   * @description: 每次页面状态更改时刷新合计paginationChanged,对应ag-grid-vue标签上的  @paginationChanged
   * @param {*} event
   * @return {*}
   */
  paginationChanged (event) {
    console.log('执行=====>agGrid事件paginationChanged', event)
    const bool = store.state.agGrid.cellContextMenu.showCalcBottomRow
    console.log('bool=====>', bool)
    bool && paginationChanged(event)
  },

  /**
   * @description: 客户端已使用api.applyTransaction(transaction)或通过更改rowData绑定属性来更新网格数据immutableData=true。
   * 表格刷新事件，对应ag-grid-vue标签上的  @OnRowDataUpdatedEvent
   * @param {*} event
   * @return {*}
   */
  OnRowDataUpdatedEvent (event) {
    console.log('表格刷新事件OnRowDataUpdatedEvent', event)
    // 刷新合计
    // AgGridUtils.refreshTotalToList(event.api)
    paginationChanged(event)
  },

  /**
   * @description: 过滤事件,监听过滤行的筛选的改变，对应ag-grid-vue标签上的  @filterChanged
   * @param {*} event
   * @return {*}
   */
  FilterChangedEvent (event) {
    // 刷新合计
    // AgGridUtils.refreshTotalToList(event.api)
  },

  /**
   * @description: 过滤事件,监听过滤行的筛选的过程中的改变，对应ag-grid-vue标签上的 @filterModified
   * @param {*} event
   * @return {*}
   */
  onFilterModified (event) {
    console.log('onFilterModified', event)
  },

  /**
   * @description: 行数据勾选状态改变事件,监听行数据勾选状态的改变，对应ag-grid-vue标签上的  @selectionChanged
   * @param {*} event
   * @return {*}
   */
  onSelectionChanged (ele) {
    console.log('行数据勾选状态改变事件onSelectionChanged', ele)
  },

  /**
   * @description: 导出csv格式的excel文件，【无法实现自定义行导出，可以自定义列】
   * @param { 导出文件名 } fileName
   * @return {*}
   */
  exportCSV (fileName = '导出数据') {
    const exportParams = {
      columnGroups: true,
      fileName: `${fileName}`
    }
    this.gridApi.exportDataAsCsv(exportParams)
  },

  /**
   * @description: 停止编辑回调stopEditing
   * @param {*} event
   * @return {*}
   */
  stopEditing (event) {
    AgGridUtils.refreshTotalToList(event.api)
    if (this.options.stopEditing) {
      this.options.stopEditing(event)
    }
  },

  // 获取选中的数据,用于多选按钮的事件
  getRows () {
    var selRows = this.gridApi.getSelectedRows()
    if (selRows == null || selRows.length <= 0) {
      this.alert('您未选中任何数据')
      return
    }
    alert(JSON.stringify(selRows))
  },
  // 删除选中数据,    text ，要删除数据的主键，数据的唯一标识
  delRows (text) {
    // 获取选中的数据
    var selRows = this.gridApi.getSelectedRows()
    if (selRows == null || selRows.length <= 0) {
      this.alert('您未选中任何数据')
      return
    }
    // 注意调用updateRowData方法并不会更新vue的data
    // this.gridApi.updateRowData({remove: selRows});
    // 正确的删除方法是这样的
    this.rowData = this.rowData.filter((item) => {
      return selRows.filter((m) => m[text] === item[text]).length <= 0
    })
  }
}

// 分页改变
export function paginationChanged (event) {
  const { api: gridApi } = event
  const getCurrentGridNode = gridApi?.getModel()?.rowsToDisplay || []
  const getCurrentGridData =
    getCurrentGridDataAndNumericalOrder(getCurrentGridNode)
  refreshTotalToList(getCurrentGridData, gridApi)
}
