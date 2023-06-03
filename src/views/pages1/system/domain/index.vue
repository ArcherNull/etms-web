<!--
 * @Author: Null
 * @Date: 2022-11-10 18:32:05
 * @Description:
-->
<template>
  <div>
    <FirstTitle title="AgGrid表格">
      <div slot="content">
        <MyButton @click="search">搜索</MyButton>
        <MyButton @click="refresh">刷新</MyButton>
        <MyButton @click="getSelectRowData">获取行数据</MyButton>
        <AgGrid :ag-table-options="agTableOptions" @getGridApi="getGridApi" />
        <AgGrid :ag-table-options="agTableOptions1" @getGridApi="getGridApi1" />
      </div>
    </FirstTitle>
  </div>
</template>

<script>
import { AgGridUtils, InitColumnDefs } from '@/components/AgGrid/common/agGrid-utils'
import { rowData } from '@/components/AgGrid/common/agGrid-data-example'
import { fieldsConfig } from '@/company/basic-data/fields/index'

export default {
  name: 'CaseManagementIndex',
  // import引入的组件需要注入到对象中才能使用PopupTreeInput
  components: {},
  data () {
    return {
      agTableOptions: {
        columnDefs: [],
        rowData: []
      },
      agTableOptions1: {
        columnDefs: [],
        rowData: []
      },
      agTable: null,
      agTable1: null
    }
  },
  created () {
    this.getInitTable()
  },
  methods: {
    // 获取初始化表格
    getInitTable () {
      const col = new InitColumnDefs(fieldsConfig)
      console.log('col=====>', col)
      this.agTableOptions.columnDefs = col
      this.agTableOptions1.columnDefs = col
    },
    getGridApi (api) {
      const agTable = new AgGridUtils(api)
      this.agTable = agTable
    },
    getGridApi1 (api) {
      const agTable = new AgGridUtils(api)
      this.agTable1 = agTable
    },
    search () {
      this.agTableOptions.rowData = rowData.getRowData()
    },
    refresh () {
      this.agTableOptions.rowData = rowData.getRowData()
    },
    getSelectRowData () {
      const selectedRows = this.agTable.getSelectedRows()
      console.log('selectedRows=====>', selectedRows)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

