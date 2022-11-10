/*
 * @Author: Null
 * @Date: 2022-02-22 16:20:22
 * @Description: ag-grid工具函数
 * 官方文档： https://www.ag-grid.com/javascript-data-grid/
 */

// import { cloneDeep, sumBy } from 'lodash'

// ag-grid渲染之前的处理

/**
 * @description: 统一处理header 列头
 * @param { Object[] } header 统一处理列头，譬如动态设置width , 以及添加hide属性，  格式为 ： [{ field:'field1' , headerName:'字段1' }]
 * @param { Object[] } cellStyleArr 单元格样式或者dom节点 ， 一般用于状态表示 ，
 * 格式为：
 *       [
          {
            headName: '订单状态',
            cellRender: cellRender // 特殊自定义dom字符串
          },
          {
            headName: '是否回单',
            cellRender: params => (Number(params.value) === 0 ? '否' : '是') // 简单的状态判断，将0改为否，将1改为是
          },
          {
            headName: '订单时间',
            filter: 'agDateColumnFilter' // 将时间的filter更改为时间筛选框，跟文本筛选框区分开
          },
          {
            headName: '订单时间',
              colSpan: function (params) {
               const country = params.data.country;
                if (country === 'Russia') {
                   // have all Russia age columns width 2
                   return 2;
                 } else if (country === 'United States') {
                   // have all United States column width 4
                   return 4;
                 } else {
                   // all other rows should be just normal
                   return 1;
                 }
               }
              }
         ],
 *
 * @return {*}
 */
export function batchProcessHeader (header = [], cellStyleArr = []) {
  return header.map((ele) => {
    const { headName } = ele
    // 动态计算width
    const getStrLen = (str = '') => {
      const len = str.length
      const pxNum = len * 15 + 90
      return pxNum
    }

    let extraAttribute = {}

    cellStyleArr.forEach((el) => {
      if (el.headName === headName) {
        extraAttribute = { ...el }
      }
    })
    return {
      hide: false,
      width: getStrLen(headName),
      // 继承ele设置的其他属性
      ...ele,
      ...extraAttribute
    }
  })
}

/**  生成完整的，可供ag-grid直接使用的列头数据
 * @description: 列头数据拼装,拼装固定左侧的序列列，右侧的操作列，以及中间插入的列
 * @param { Object[] } headerData 列头数据 , 格式为 ： [{ field:'field1' , headerName:'字段1' ,hide:false }]
 * @param { Object[] } customerColumns 自定义列，不固定在首位两端的组件
 * @param { Object[] } pinnedLeftColumns 固定在左侧的操作列
 * @param { Object[] } pinnedRightColumns 固定在右侧的操作列
 * @param { Object[] } columnsDefaultOptions 列头配置 ， showSerialColumns， true 表示展示序号列  , showOperationColumns , true 表示操作列
 * @return {*}
 */
export function setColumnDefs (
  headerData = [],
  columns = {
    pinnedLeftColumns: [],
    pinnedRightColumns: [],
    customerColumns: []
  },
  columnsDefaultOptions = {
    showSerialColumns: true,
    showOperationColumns: true
  }
) {
  // 是否存在固定表格左侧的自定义列
  if (columns.pinnedLeftColumns.length) {
    headerData.unshift(columns.pinnedLeftColumns)
  }

  // 是否展示序列行，默认展示序列行
  if (columnsDefaultOptions.showSerialColumns) {
    // 默认添加序号列
    const serialColumns = {
      headerName: '序号',
      field: 'numericalOrder',
      width: 120,
      pinned: 'left', // 固定在左侧
      lockPosition: true, // 锁定位置，默认为false,该属性设置为true时，拖拽列无效；如果不设置pinned: 'right', 默认展示在最左方
      checkboxSelection: true, // 设置当前列有可选项
      sortable: false,
      filter: false,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true
    }
    headerData.unshift(serialColumns)
  }

  // 在不固定到两端的列，添加自定义组件
  if (columns.customerColumns.length) {
    console.log('自定义添加组件', columns.customerColumns)
    headerData.push(columns.customerColumns)
  }

  if (columns.pinnedRightColumns.length) {
    headerData.push(columns.pinnedRightColumns)
  }

  // 是否添加操作列，默认添加
  if (columnsDefaultOptions.showOperationColumns) {
    // 默认加操作列
    const operationColumns = {
      headerName: '操作',
      field: 'agTableOperation',
      pinned: 'right', // 固定在左侧
      lockPosition: true,
      sortable: false,
      filter: false,
      width: 200
    }
    headerData.push(operationColumns)
  }

  return headerData
}

/**
 * @description: ag-grid渲染完成之后的处理 【原型构造函数的方法】，渲染过后的表格操作
 * @param {*}
 * @return {*}
 */
export function AgGridUtils (api) {
  const that = this
  // gridApi 网格aoi , columnApi 列api
  const { api: gridApi, columnApi } = api
  if (gridApi && columnApi) {
    /* ************************ 网格API操作 ****************************  */
    this.gridApi = gridApi
    // 获取并返回当前网格内的所有过滤后的数据
    this.getCurrentGridNode = gridApi.getModel().rowsToDisplay
    // 获取并返回当前网格内的所有原始数据
    this.getRootGridData = gridApi.getModel().rootNode.allLeafChildren

    // 获取并返回当前网格内的所有过滤后的数据
    this.getCurrentGridData = function () {
      return gridApi.getModel().rowsToDisplay.map((ele) => ele.data)
    }
    // 当前网格中的所有后端数据
    this.allLeafChildren = function () {
      return gridApi.getModel().rootNode.allLeafChildren.map((ele) => ele.data)
    }

    /**
     * @description: 检查行数据
     * @param {Object[]} rows 行数据
     * @return {*}
     */
    this.checkRowsType = function (rows) {
      return rows && Array.isArray(rows) && rows.length !== 0
    }

    /**
     * @description: 选中的行数据
     */
    this.getSelectedRows = function () {
      const selectedRowDatas = gridApi.getSelectedRows()
      console.log('selectedRowDatas------------', selectedRowDatas)
      if (that.checkRowsType(selectedRowDatas)) {
        return selectedRowDatas
      } else {
        alert('未选中的行数据！')
      }
    }

    /**
     * @description: 删除选中的行数据【当前网格内存在的数据】
     * @param {number} id  要删除数据的主键，数据的唯一标识
     * @return {*}
     */
    this.deleteSelectedRows = function (id) {
      const selectedRowDatas = gridApi.getSelectedRows()
      console.log('selectedRowDatas===========', selectedRowDatas)
      if (that.checkRowsType(selectedRowDatas)) {
        // 注意调用updateRowData方法并不会更新vue的data
        this.gridApi.updateRowData({ remove: selectedRowDatas })
        // 正确的删除方法是这样的
        // return that.allLeafChildren.filter((item) => {
        //   return selectedRowDatas.filter((m) => m[id] === item[id]).length <= 0
        // })
      } else {
        alert('您未选中任何数据')
        return []
      }
    }

    /**
     * @description: 手动设置底部行数据方法
     * @param {*} pinnedBottomRowData 置底部行数据
     * @return {*}
     */
    this.setPinnedBottomRowData = function (pinnedBottomRowData) {
      gridApi.setPinnedBottomRowData(pinnedBottomRowData)
    }

    /**
     * @description: 手动设置顶部行数据方法
     * @param {*} pinnedTopRowData 置顶部行数据
     * @return {*}
     */
    this.setPinnedTopRowData = function (pinnedTopRowData) {
      gridApi.setPinnedBottomRowData(pinnedTopRowData)
    }

    /**
     * @description: 设置默认选中方法
     * @param {*} value
     * @param {*} id
     * @return {*}
     */
    this.getCustomerSelectedRows = function (value, id) {
      gridApi.forEachLeafNode((node) => {
        if (node.data[id] === value) {
          node.setSelected(false)
        }
      })
    }

    /**
     * @description: 列宽度自适应
     * @param {*}
     * @return {*}
     */
    this.sizeColumnsToFit = function () {
      gridApi.sizeColumnsToFit()
    }

    // 全选
    this.selectAll = function () {
      gridApi.selectAll()
    }

    // 反选
    this.deselectAll = function () {
      gridApi.deselectAll()
    }

    // 设置行数据  Object[]
    this.setRowData = function (rowData) {
      gridApi.setRowData(rowData)
    }

    /**
     * @description:  跳转到对应的列
     * @param {Number} number 对应的行位置
     * @return {*}
     */
    this.jumpToCol = function (number) {
      const index = Number(number)
      if (!isNaN(index)) {
        const allColumns = columnApi.getAllColumns()
        const column = allColumns[index]
        console.log('allColumns===============', allColumns)

        console.log('column===============', column)
        if (column) {
          gridApi.ensureColumnVisible(column)
        }
      } else {
        return
      }
    }

    // 跳转到对应的行
    this.jumpToRow = function (number) {
      const index = Number(number)
      if (isNaN(index)) {
        return
      } else {
        if (typeof index === 'number' && !isNaN(index)) {
          gridApi.ensureIndexVisible(index)
        }
      }
    }

    /**
     * @description: 行数据不滚动，紧凑在一起
     */
    this.sizeToFit = function () {
      gridApi.sizeColumnsToFit()
    }

    /* ************************ 列api操作 ****************************  */

    /**
     * @description: 移动列，到对应的位置
     * @param {*} fieldsArr  ['field1' , 'field2']
     * @param {*} index 0 表示首位
     * @return {*}
     */
    this.moveColumns = function (fieldsArr, index = 0) {
      columnApi.moveColumns(fieldsArr, index)
    }

    /**
     * @description: 列显示或隐藏
     * @param {String} field 隐藏或显示的字段名
     * @param {Boolean} bool false隐藏或true显示
     * @return {*}
     */
    this.setColumnVisible = function (field, bool) {
      columnApi.setColumnVisible(field, bool)
    }

    /**
     * @description: 清除所有固定状态
     * @param {*}
     * @return {*}
     */
    this.clearAllColumnsPinned = function () {
      columnApi.applyColumnState({ defaultState: { pinned: null }})
    }

    /**
     * @description: 冻结列
     * @param {Object[]} columns [{ colId: 'country', pinned: 'left' }]  , colId 跟field 一致
     * @return {*}
     */
    this.pinnedColumns = function (columns) {
      columnApi.applyColumnState({
        state: columns,
        defaultState: { pinned: null }
      })
    }

    /**
     * @description: 将列的行数据省略号的数据显示完整
     * @param {Boolean} skipHeader true 表示列头省略号显示的数据跳过， false表示不跳过
     * @return {*}
     */
    this.autoSizeAll = function (skipHeader) {
      const allColumnIds = []
      columnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.getId())
      })
      columnApi.autoSizeColumns(allColumnIds, skipHeader)
    }

    /**
     * @description: 单元格刷新，默认强制刷新
     * @param {*} params
     * @return {*}
     */
    this.refreshCells = function (params) {
      const defaultObj = {
        force: true, // 强制刷新
        ...params
      }
      gridApi.refreshCells(defaultObj)
    }

    /**
     * @description: 整行数据更新 -- 应用场景:选中行弹出层，编辑表单
     * @param {*} row
     * @return {*}
     */
    this.updateRowData = function (row) {
      gridApi.updateRowData(row)
    }

    /**
     * @description: 导出 .csv 格式的excel文件
     * @return {*}
     */
    this.exportDataAsCsv = function () {
      console.log('导出所有数据')
      gridApi.exportDataAsCsv()
    }

    /**
     * @description: 输出特定的数据为 .csv 格式的excel文件
     * @param {*} rowData
     * @return {*}
     */
    this.getDataAsCsv = function (rowData) {
      gridApi.getDataAsCsv(rowData)
    }

    /**
     * @description: 配置导出的 csv 的excel文件
     * @param {*} config
     * 参考属性文档：https://www.ag-grid.com/javascript-data-grid/csv-export/#csvexportparams
     * @return {*}
     */
    this.setDefaultCsvExportParams = function (config) {
      const defaultConfig = {
        columnSeparator: ',', // 列分隔符
        allColumns: false, // 如果为true，则所有列都将按照它们在columnDefs中的显示顺序导出。
        fileName: 'excel.csv', // 导出 .csv文件的文件名
        onlySelected: false, // true表示仅仅导出选中的行数据
        onlySelectedAllPages: false, // 导出选中的行数据，并包含其它页的数据
        skipPinnedBottom: false, // 跳过固定在底部的数据
        skipPinnedTop: false // 跳过固定在顶部的数据
      }
      return {
        ...defaultConfig,
        ...config
      }
    }

    /**
   * @description: 生成数据分隔符
   * @return {*}
   */
    this.dataInputSelector = function (data) {
      switch (data) {
        case 'none':
          return
        case 'tab':
          return '\t'
        default:
          return data
      }
    }
  } else {
    alert('ag-grid表格工具实例创建失败！')
  }
}

AgGridUtils.prototype.calculateTotalLine = calculateTotalLine
AgGridUtils.prototype.refreshTotalToList = refreshTotalToList
AgGridUtils.prototype.refreshTotal = refreshTotal

/**
 * @description: 计算合计,传入需要计算的数据对象、合计参数，返回一个ag-grid合计需要的参数,只要是数字行自动计算【重要】
 * @param { 网格数据对象 Object[] } list
 * @return {*}
 */
function calculateTotalLine (list) {
  // console.log("获取所有表格数据", list);1
  // console.log("获取行数据", param);
  // let val = JSON.parse(JSON.stringify(list[0])) 深度赋值，不能包含undefined/null的情况

  if (list.length !== 0) {
    const val = JSON.parse(JSON.stringify(list[0]))
    const keys = Object.keys(val)

    // 判断特定的金额字段/序列行，才做计算
    const autoCalc = ele => {
      if (ele === 'numericalOrder') {
        return true
      } else {
        return /Fee|money|Money|Price|Pay|Weight|Volume|Num|costShare$/g.test(ele)
      }
    }

    /**
     * @description: 计算数组对象中某属性的和
     * @param {*} arr 数组
     */
    const getSum = (arr, keyName) => {
      const sum = arr.reduce(function (total, item) {
        const itemNum = Number(item[keyName])
        return total + itemNum
      }, 0)
      return isNaN(sum) ? 0 : sum
    }

    // 平均值计算字段
    const averageField = ['costRate']

    /**
     * @description: 计算字段的平均值1
     * @param {*} arr 数组
     * @param {*} keyName 数组元素中对象中的键名
     * @return {*}
     */
    const getAverageNum = (arr, keyName) => {
      const sum = getSum(arr, keyName)
      return sum && ((sum * 1000) / (1000 * arr.length)).toFixed(3)
    }

    for (const ele of keys) {
      if (autoCalc(ele)) {
        if (!isNaN(Number(val[ele]))) {
          // 判断是不是序号行
          if (ele === 'numericalOrder') {
            val['numericalOrder'] = `${list.length}条`
          } else {
            const sum = getSum(list, ele)
            val[ele] = sum ? sum.toFixed(3) : ''
          }
        } else {
          val[ele] = ''
        }
      } else if (averageField.includes(ele)) {
        const average = getAverageNum(list, ele)
        val[ele] = average
      } else {
        val[ele] = ''
      }
    }

    return [val]
  } else {
    return ['']
  }
}

/**
 * @description: 刷新合计，可用于每次网格数据发生变动(指定数据) 【重要】
 * @param { 当前表格所加载的数据 } list
 * @param { 生成的gridApi实例，ag-grid-vue标签上的@gridReady="onGridReady"所返回的 } gridApi
 * @return {*}
 */
function refreshTotalToList (list, gridApi) {
  const totalParams = calculateTotalLine(list)
  gridApi.setPinnedBottomRowData(totalParams)
}

/**
 * @description: 刷新合计，可用于每次网格数据发生变动(数据从网格获取)【重要】
 * @param { 生成的gridApi实例，ag-grid-vue标签上的@gridReady="onGridReady"所返回的 } gridApi
 */
function refreshTotal (gridApi) {
  return new Promise((resolve) => {
    const list = this.getCurrentGridData(gridApi)
    // 判断是不是底部合计行
    if (gridApi.pinnedRowModel.pinnedBottomRows[0]) {
      const totalParams = this.calculateTotalLine(list)
      // 设置底部合计行数据
      gridApi.setPinnedBottomRowData(totalParams)
    }
    // 刷新全部单元格
    gridApi.refreshCells({ force: true })
    // 刷新指定
    // gridApi.refreshCells({columns:['numericalOrder']})
    // gridApi.getColumnDefs();
    resolve(true)
  })
}
