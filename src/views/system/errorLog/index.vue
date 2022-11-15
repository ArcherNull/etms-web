<!--
 * @Author: Null
 * @Date: 2022-04-09 10:30:54
 * @Description: 前端错误日志，用于前端监控
-->
<template>
  <div class="errorLog">
    <div class="errorLog-header dk-header-search-container" flex="main:justify cross:center">
      <div class="errorLog-header__left">
        <MySearchBox />
      </div>
      <div class="errorLog-header__right">
        <MyBtnList
          slot="right"
          :btn-list-config="btnListConfig"
          @clickFun="clickFun"
        />
      </div>
    </div>
    <!-- <MyVxeTable :table-config="tableConfig" /> -->
    <!-- <AgGrid :ag-table-options="agTableOptions" @getGridApi="getGridApi" /> -->

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { AgGridUtils } from '@/components/AgGrid/common/agGrid-utils'

export default {
  name: 'ErrorLog',
  data () {
    return {
      // agTableOptions: {
      //   columnDefs: [
      //     {
      //       headerName: '#',
      //       colId: 'rowNum',
      //       valueGetter: 'node.id',
      //       // sort: 'asc',
      //       // sortable: false,
      //       filter: false,
      //       width: 100,
      //       pinned: 'left', // 固定在左侧
      //       lockPosition: true, // 锁定位置，默认为false,该属性设置为true时，拖拽列无效；如果不设置pinned: 'right', 默认展示在最左方
      //       checkboxSelection: true, // 设置当前列有可选项=
      //       headerCheckboxSelection: true,
      //       cellRenderer: (params) => Number(params.value) + 1
      //       // serialNumComparator
      //     },
      //     ...columnDefs
      //   ],
      //   rowData: rowData.getRowData()
      // },
      // 表格配置项
      tableConfig: {
        maxHeight: 600,
        tableHeader: [
          {
            field: 'message',
            title: '信息',
            sortable: true,
            width: 400
          },
          {
            field: 'type',
            title: '信息类型',
            width: 120
          },
          {
            field: 'page',
            title: '发生页面'
          },
          {
            field: 'time',
            title: '发生时间'
          },
          {
            field: 'meta',
            title: '其它'
          }
        ],
        data: []
      },
      // 按钮配置项
      btnListConfig: {
        schemas: [
          {
            btnText: '新增',
            type: 'primary',
            icon: 'el-icon-plus',
            loading: false
          },
          {
            btnText: '删除',
            plain: true,
            icon: 'el-icon-delete',
            type: 'danger'
          }
        ]
      },
      agTable: null // ag-grid表格方法实例
    }
  },
  computed: {
    ...mapState('setting/log', ['log'])
  },
  watch: {
    log: function (newVal) {
      this.tableConfig.data = newVal
    }
  },
  mounted () {
    this.tableConfig.data = this.log
  },
  methods: {
    ...mapActions('setting/log', ['pushErrorLog', 'clearAllErrorLog']),
    getGridApi (api) {
      const agTable = new AgGridUtils(api)
      this.agTable = agTable
    },
    // 添加错误日志
    addErrorLog () {
      this.pushErrorLog({
        message: '测试错误',
        type: 'info',
        meta: {
          otherMessage: '补充信息'
        }
      })
    },
    // 清除错误日志
    clearErrorLog () {
      console.log('清除错误日志')
      this.clearAllErrorLog()
    },

    // 测试
    testFun (ele) {
      const { item } = ele
      item.loading = true
      const confirmObj = {
        content: '确认删除吗？',
        isRecord: false, // 不纪录
        confirmCalback: () => {
          console.log('确认函数回调')
          this.clearErrorLog()
        },
        cancelCallback: () => {
          console.log('取消函数回调')
        },
        overCallback: () => {
          console.log('结束函数回调')
        }
      }
      this.$commJs.confirmModel(confirmObj, this).then((res) => {
        console.log('res======>', res)
      }).finally(() => {
        item.loading = false
      })
    },
    /**
     * @description: MyBtnList组件的事件统一处理
     * @param {*} ele
     * @return {*}
     */
    clickFun (ele) {
      const { item } = ele
      switch (item.btnText) {
        case '新增':
          console.log('新增')
          this.addErrorLog()
          break
        case '删除':
          console.log('删除')
          this.testFun(ele)
          break
        case '删除2':
          console.log('删除')
          item.loading = true
          this.$commJs.confirmModel('确认删除吗？', this).then((res) => {
            console.log('res======>', res)
            res === 'confirm' && this.clearErrorLog()
          }).finally(() => {
            item.loading = false
          })
          break
      }
    }
  }
}
</script>
