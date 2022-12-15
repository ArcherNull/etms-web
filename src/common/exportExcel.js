/*
 * @Author: Null
 * @Date: 2021-11-11 10:02:57
 * @Description: 导出excel方法
 */
import { Message } from 'element-ui'

const exportExcel = {
  /**
   * @description: Excel导表方法封装
   * @param {tHeader  表格第一行标题  array<string>     ['吸粉公众号', '吸粉数', '日期']}
   * @param {data     过滤处理的数据  array[]}
   * @param {lastRow  表格自定义最后一行 array<string>}
   * @param {title    导出表格文件的标题 string}
   */
  exportExcel: function (dataObj) {
    const { tHeader, data, lastRow, title } = dataObj
    return new Promise(resolve => {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../utils/Excel/Export2Excel.js') // 注意这个Export2Excel路径
        data[data.length] = lastRow // 在导表的最后一行加入总数
        export_json_to_excel(tHeader, data, title) // 最后一个是表名字
        resolve(true)
      })
    })
  },

  /**
   * @description: Excel数据过滤数据方法，例如时间格式
   * @param {过滤键值} filterVal
   * @param {过滤数据} jsonData
   * @return {返回对应的数据}
   */
  formatJson: function (filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  },

  /**
   * @description: 导出excel表
   * @param {表格数据} data
   * @param {表头数据 ，现在只适用一级表头， string[] , 例如['时间', '吸粉数'],} tHeader
   * @param {表格列数据，必须与表头相对应，string[] , 例如['time', 'number']} filterVal
   * @param {表格行数据 object[] } tableData
   * @param {导出表格的文件标题， string} title
   * @param {可自定义最后一行数据， string[] ，注意其长度最好是与表头相对应 } lastRow
   * @return {*}
   */
  exportExcelFun: function (data) {
    // console.log('导柱形图excel表数据', data)
    const that = this
    const dataObj = {
      tHeader: data.tHeader,
      filterVal: data.filterVal,
      lastRow: data.lastRow || [],
      title: data.title || 'downLoadExcel',
      data: function () {
        // 这里存在一个this指针指向的问题
        return that.formatJson(data.filterVal, data.tableData)
      }
    }
    // console.log('dataObj.data()', dataObj.data())
    dataObj.data = dataObj.data() // 过滤函数立即执行，返回对应的表格数据
    that.exportExcel(dataObj).then(res => {
      if (res) {
        // console.log('下载Excel成功！')
        Message.success(`文件名为${dataObj.title}的Excel表格导出成功！`)
      } else {
        Message.error(`文件名为${dataObj.title}的Excel表格导出失败！`)
      }
    })
  }
}

export default exportExcel
