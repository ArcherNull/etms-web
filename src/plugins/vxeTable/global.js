/*
 * @Author: Null
 * @Date: 2022-04-09 15:35:37
 * @Description: vxe-table 全局引入
 */

import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'

Vue.use(VXETable)

// 全局默认参数
VXETable.setup({
  version: 0,
  zIndex: 999,
  table: {
    autoResize: true
  }
})

// 将模态窗口挂载到 vue 实例中
// Vue.prototype.$XModal = VXETable.modal
