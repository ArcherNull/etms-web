<!--
 * @Author: Null
 * @Date: 2021-12-29 15:46:54
 * @Description: 系统管理--计划任务管理--计划监控
-->

<template>
  <div>
    <FirstTitle title="相关文档">
      <div slot="content" flex>
        <a
          class="dk-mr-10"
          href="https://www.itxst.com/ag-grid/nqrfnuzz.html"
          target="_blank"
        >中文教程</a>
        <a
          href="https://www.ag-grid.com/example.php"
          target="_blank"
          class="dk-mr-10"
        >官方demo</a>

        <a
          href="https://blog.csdn.net/WQearl/article/details/106670953?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-4-106670953-blog-113769217.pc_relevant_scanpaymentv1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-4-106670953-blog-113769217.pc_relevant_scanpaymentv1&utm_relevant_index=5"
          target="_blank"
          class="dk-mr-10"
        >参考文档</a>

        <a
          href="https://blog.csdn.net/WQearl?type=blog"
          target="_blank"
          class="dk-mr-10"
        >csdn博主</a>
      </div>
    </FirstTitle>
    <FirstTitle title="AgGrid表格1">
      <div slot="content">
        <MyForm ref="myForm" :register="register" />
        <AgGrid :ag-table-options="agTableOptions" @getGridApi="getGridApi" />
      </div>
    </FirstTitle>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { AgGridUtils } from '@/components/AgGrid/common/agGrid-utils'
import {
  columnDefs,
  rowData
} from '@/components/AgGrid/common/agGrid-data-example'
import { CustomerFilter } from './common/customerFilter'
// import { PersonFilter } from './common/personFilter'
// import { SexFilter } from './common/SexFilter'

// import { CustomTooltip } from './common/customTooltip'

export default {
  name: 'TaskRecord',
  data () {
    return {
      agTableOptions: {
        columnDefs: [
          {
            headerName: '#',
            // field: 'number',
            colId: 'rowNum',
            valueGetter: 'node.id',
            // sort: 'asc',
            // sortable: false,
            filter: CustomerFilter,
            headerComponentParams: { menuIcon: 'fa-filter' },

            width: 100,
            pinned: 'left', // 固定在左侧
            lockPosition: true, // 锁定位置，默认为false,该属性设置为true时，拖拽列无效；如果不设置pinned: 'right', 默认展示在最左方
            checkboxSelection: true, // 设置当前列有可选项=
            headerCheckboxSelection: true,
            cellRenderer: (params) => params.rowIndex + 1
            // serialNumComparator
          },
          ...columnDefs,

          {
            headerName: '操作',
            field: 'agTableOperation',
            pinned: 'right', // 固定在左侧
            lockPosition: true,
            sortable: false,
            filter: false,
            width: 80,
            cellRendererFramework: 'CardBtn'
          }
        ],
        gridOptions: {
          defaultCsvExportParams: {
            onlySelected: true,
            fileName: 'excel.csv'
            // rowData: null
          }
        },
        rowData: []

        // rowData: rowData.getRowData()
      },
      agTable: null, // ag-grid表格方法实例

      register: {
        formConfig: {
          rowLayout: 'grid-colums-3',
          labelProps: {
            position: 'right',
            width: '140px',
            inline: false
          }
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
              this.agGridRelativeEvent(ele)
            }
          },
          {
            label: '接口测试',
            component: 'select',
            loading: false,
            field: 'field5',
            extraFields: {
              id: '123456',
              test: '测试人'
            },
            selectList: [
              {
                label: '表格loading',
                value: 'agGridLoading'
              },
              {
                label: '表格数据',
                value: 'agGridApiData'
              },
              {
                label: '成功加载数据',
                value: 'agGridLoadSuccessApiData'
              },
              {
                label: '失败加载数据',
                value: 'agGridLoadFailApiData'
              },
              {
                label: '表格数据加载为空',
                value: 'agGridApiDataEmpty'
              }
            ],
            change: (ele, item) => {
              console.log('接口测试', ele, item)
              item.loading = true
              setTimeout(() => {
                item.loading = false
              }, 2000)
              this.agGridApiData(ele)
            }
          },
          {
            label: '表格loading',
            component: 'select',
            helpMessage:
              '设置完loadingType时，要退出该页面，重新进入，才能看见效果',
            field: 'field6',
            selectList: [
              {
                label: '渐隐圆环',
                value: 'Fade-Circle'
              },
              {
                label: '3D翻转',
                value: '3D-Flip'
              },
              {
                label: '环绕切片',
                value: 'Surround-Slice'
              },
              {
                label: '环绕圆',
                value: 'Surround-Circle'
              }
            ],
            change: (ele) => {
              console.log('接口测试', ele)
              this.agGridLoading(ele)
            }
          },
          {
            label: 'loading测试',
            component: 'select',
            loading: false,
            field: 'field9',
            selectList: [
              {
                label: '渐隐圆环',
                value: 'Fade-Circle'
              },
              {
                label: '3D翻转',
                value: '3D-Flip'
              },
              {
                label: '环绕切片',
                value: 'Surround-Slice'
              },
              {
                label: '环绕圆',
                value: 'Surround-Circle'
              }
            ],
            change: (ele) => {
              console.log('接口测试', ele)
              this.agGridLoading(ele)
            }
          },
          {
            label: '导出csv文件',
            component: 'select',
            loading: false,
            field: 'field9',
            selectList: [
              {
                label: '导出所有数据',
                value: 'exportDataAsCsv'
              },
              {
                label: '导出特定数据',
                value: 'getDataAsCsv'
              },
              {
                label: '导出选中数据',
                value: 'exportSelectedDataAsCsv'
              }
            ],
            change: (ele) => {
              console.log('接口测试', ele)
              this.agGridExportCsv(ele)
            }
          }
        ]
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
            this.agGridRelativeEvent(ele)
          }
        },
        {
          label: '接口测试',
          component: 'select',
          loading: false,
          field: 'field5',
          extraFields: {
            id: '123456',
            test: '测试人'
          },
          selectList: [
            {
              label: '表格loading',
              value: 'agGridLoading'
            },
            {
              label: '表格数据',
              value: 'agGridApiData'
            },
            {
              label: '成功加载数据',
              value: 'agGridLoadSuccessApiData'
            },
            {
              label: '失败加载数据',
              value: 'agGridLoadFailApiData'
            },
            {
              label: '表格数据加载为空',
              value: 'agGridApiDataEmpty'
            }
          ],
          change: (ele, item) => {
            console.log('接口测试', ele, item)
            item.loading = true
            setTimeout(() => {
              item.loading = false
            }, 2000)
            this.agGridApiData(ele)
          }
        },
        {
          label: '表格loading',
          component: 'select',
          helpMessage:
            '设置完loadingType时，要退出该页面，重新进入，才能看见效果',
          field: 'field6',
          selectList: [
            {
              label: '渐隐圆环',
              value: 'Fade-Circle'
            },
            {
              label: '3D翻转',
              value: '3D-Flip'
            },
            {
              label: '环绕切片',
              value: 'Surround-Slice'
            },
            {
              label: '环绕圆',
              value: 'Surround-Circle'
            }
          ],
          change: (ele) => {
            console.log('接口测试', ele)
            this.agGridLoading(ele)
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations('agGrid/theme', ['SET_THEME']),
    ...mapMutations('element/myLoading', ['SET_CURRENT_SELECTED_LOADING_TYPE']),

    getGridApi (api) {
      console.log('api=======>', api)
      const agTable = new AgGridUtils(api)
      // console.log('getRows==============', agTable.selectAll())
      this.agTable = agTable
      // console.log('getgetSelectedRowsRows==============', agTable.getSelectedRows())
      // agTable.sizeColumnsToFit()
    },

    // 相关功能
    agGridRelativeEvent (ele) {
      console.log('相关功能', ele)
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
          // this.agTable.setRowData(mock_ag_grid_rowdata)
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
    },
    // 接口数据测试
    agGridApiData (ele, item) {
      console.log('接口数据测试', ele)
      switch (ele) {
        case 'agGridLoading':
          this.agTableOptions.rowData = null
          break
        case 'agGridApiData':
          this.agTableOptions.rowData = rowData.getRowData()
          break
        case 'agGridLoadSuccessApiData':
          this.agTableOptions.rowData = null
          setTimeout(() => {
            this.agTableOptions.rowData = rowData.getRowData()
          }, 2000)
          break
        case 'agGridLoadFailApiData':
          this.agTableOptions.rowData = null
          setTimeout(() => {
            this.agTableOptions.rowData = []
          }, 2000)
          break
        case 'agGridApiDataEmpty':
          this.agTableOptions.rowData = null
          setTimeout(() => {
            this.agTableOptions.rowData = []
          }, 2000)
          break
      }
    },
    // 导出csv文件
    agGridExportCsv (ele) {
      console.log('导出csv文件', ele)
      switch (ele) {
        case 'exportDataAsCsv':
          this.agTable.exportDataAsCsv()
          break
        case 'getDataAsCsv':
          this.agTableOptions.rowData = rowData.getRowData()
          break
        case 'exportSelectedDataAsCsv':
          this.agTable.setDefaultCsvExportParams({
            onlySelected: true,
            fileName: 'excel.csv'
          })
          this.agTableOptions.gridOptions.defaultCsvExportParams = this.agTable.setDefaultCsvExportParams({
            onlySelected: true,
            fileName: 'excel.csv'
          })

          console.log('this.agTableOptions.gridOptions', this.agTableOptions.gridOptions)
          this.agTable.exportDataAsCsv()
          break
      }
    },
    // 表格loading
    agGridLoading (ele) {
      console.log('表格loading', ele)
      this.SET_CURRENT_SELECTED_LOADING_TYPE(ele)
    }
  }
}
</script>

<style scoped></style>
