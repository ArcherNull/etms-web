<!--
 * @Author: Null
 * @Date: 2021-12-29 15:46:47
 * @Description: 系统管理--计划任务管理--计划任务
-->

<template>
  <div>
    <FirstTitle title="AgGrid表格1">
      <div slot="content">
        <MyForm :form-schemas="formSchemas" />
        <AgGrid :ag-table-options="agTableOptions" @getGridApi="getGridApi" />
      </div>
    </FirstTitle>

    <!-- <FirstTitle title="AgGrid表格2">
      <AgGrid slot="content" :ag-table-options="agTableOptions" @getGridApi="getGridApi" />
    </FirstTitle>

    <FirstTitle title="AgGrid表格3">
      <AgGrid slot="content" :ag-table-options="agTableOptions" @getGridApi="getGridApi" />
    </FirstTitle> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { AgGridUtils } from '@/components/AgGrid/common/agGrid-utils'
import { mock_ag_grid_rowdata } from './mock-data.js'
import { columnDefs, rowData } from '@/components/AgGrid/common/agGrid-data-example'

export default {
  name: 'TaskPlain',
  data () {
    return {
      agTableOptions: {
        columnDefs: [
          {
            headerName: '#',
            colId: 'rowNum',
            valueGetter: 'node.id',
            // sort: 'asc',
            // sortable: false,
            filter: false,
            width: 100,
            pinned: 'left', // 固定在左侧
            lockPosition: true, // 锁定位置，默认为false,该属性设置为true时，拖拽列无效；如果不设置pinned: 'right', 默认展示在最左方
            checkboxSelection: true, // 设置当前列有可选项=
            headerCheckboxSelection: true,
            cellRenderer: (params) => Number(params.value) + 1
            // serialNumComparator
          },
          ...columnDefs
        ],
        rowData: rowData.getRowData()
      },
      agTable: null, // ag-grid表格方法实例
      register: {

      },

      formSchemas: [
        {
          label: '表格主题',
          component: 'select',
          required: true,
          field: 'field3',
          selectList: [
            {
              label: 'balham',
              value: 'balham'
            },
            {
              label: 'balham-dark',
              value: 'balham-dark'
            },
            {
              label: 'alpine',
              value: 'alpine'
            },
            {
              label: 'material',
              value: 'material'
            },
            {
              label: 'blue',
              value: 'blue'
            },
            {
              label: 'refresh',
              value: 'refresh'
            },
            {
              label: 'dark',
              value: 'dark'
            }
          ],
          change: (ele) => {
            console.log('下拉框', ele)
            this.SET_THEME(ele)
          }
        },
        {
          label: '相关功能',
          component: 'select',
          field: 'field4',
          selectList: [
            {
              label: '全选',
              value: 'selectAll'
            },
            {
              label: '反选',
              value: 'deselectAll'
            },
            {
              label: 'ag-grid假删除',
              value: 'deleteSelectedRows'
            },
            {
              label: '重新设置行数据',
              value: 'setRowData'
            },
            {
              label: '恢复行数据',
              value: 'resetSetRowData'
            },
            {
              label: '获取选中的行数据',
              value: 'getSelectedRows'
            },
            {
              label: '列铺满',
              value: 'sizeColumnsToFit'
            },
            {
              label: '设置置底行',
              value: 'setPinnedBottomRowData'
            },
            {
              label: '设置置顶行【NO】',
              value: 'setPinnedTopRowData'
            },
            {
              label: '跳转至12列【NO】',
              value: 'jumpToCol'
            },
            {
              label: '跳转至12行',
              value: 'jumpToRow'
            },
            {
              label: '移动姓名列【NO】',
              value: 'moveColumns'
            },
            {
              label: '隐藏姓名列',
              value: 'setColumnVisible'
            },
            {
              label: '取消所有冻结列',
              value: 'clearAllColumnsPinned'
            },
            {
              label: '冻结姓名列',
              value: 'pinnedColumns'
            },
            {
              label: '单元格省略显示',
              value: 'autoSizeAll'
            },
            {
              label: '当前网格中的所有后端数据',
              value: 'allLeafChildren'
            },
            {
              label: '获取并返回当前网格内的所有过滤后的数据',
              value: 'getCurrentGridData'
            },
            {
              label: '获取并返回当前网格内的所有原始数据',
              value: 'getRootGridData'
            }
          ],
          change: (ele) => {
            console.log('下拉框', ele)
            switch (ele) {
              case 'selectAll':
                this.agTable.selectAll()
                break
              case 'deselectAll':
                this.agTable.deselectAll()
                break
              case 'deleteSelectedRows':
                this.agTable.deleteSelectedRows()
                break
              case 'setRowData':
                this.agTable.setRowData([
                  {
                    name: '张三dfg3',
                    name1: '张三12dfg34'
                  }
                ])
                break
              case 'resetSetRowData':
                this.agTable.setRowData(mock_ag_grid_rowdata)
                break
              case 'getSelectedRows':
                console.log('获取选中的行数据', this.agTable.getSelectedRows())
                alert(this.agTable.getSelectedRows())
                break
              case 'sizeColumnsToFit':
                this.agTable.sizeToFit()
                break
              case 'setPinnedBottomRowData':
                this.agTable.setPinnedBottomRowData([
                  {
                    name: '张三dfg3',
                    name1: '张三12dfg34'
                  },
                  {
                    name: '张三dfg3',
                    name1: '张三12dfg34'
                  }
                ])
                break
              case 'setPinnedTopRowData':
                this.agTable.setPinnedTopRowData([
                  {
                    name: '顶部张三dfg3',
                    name1: '张三12dfg34'
                  }
                ])
                break
              case 'jumpToCol':
                this.agTable.jumpToCol(12)
                break
              case 'jumpToRow':
                this.agTable.jumpToRow(12)
                break
              case 'moveColumns':
                this.agTable.moveColumns(['name'], 0)
                break
              case 'setColumnVisible':
                this.agTable.setColumnVisible(['name'], false)
                break
              case 'clearAllColumnsPinned':
                this.agTable.clearAllColumnsPinned()
                break
              case 'pinnedColumns':
                this.agTable.pinnedColumns([{ colId: 'name', pinned: 'right' }])
                break
              case 'autoSizeAll':
                this.agTable.autoSizeAll(false)
                break
              case 'allLeafChildren':
                console.log(
                  'this.agTable.allLeafChildren============',
                  this.agTable.allLeafChildren()
                )
                break
              case 'getCurrentGridData':
                console.log(
                  'this.agTable.getCurrentGridData============',
                  this.agTable.getCurrentGridData
                )
                break
              case 'getRootGridData':
                console.log(
                  'this.agTable.getRootGridData============',
                  this.agTable.getRootGridData
                )
                break
            }
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations('agGrid/theme', ['SET_THEME']),
    getGridApi (api) {
      const agTable = new AgGridUtils(api)
      // console.log('getRows==============', agTable.selectAll())
      this.agTable = agTable
      // console.log('getgetSelectedRowsRows==============', agTable.getSelectedRows())
      // agTable.sizeColumnsToFit()
    }
  }
}
</script>

<style scoped></style>
