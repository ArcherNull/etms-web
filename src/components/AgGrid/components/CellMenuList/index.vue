<!--
 * @Author: Null
 * @Date: 2022-11-11 10:40:56
 * @Description: 单元格右键菜单栏
-->
<template>
  <div v-if="visible">
    <div :style="{ left: left + 'px', top: top + 'px' }" class="CellMenuList borderRed" @click.stop="">
      <el-tabs v-model="activeName" class="CellMenuList-tabs" @tab-click="handleClick">
        <el-tab-pane label="字段" name="fields">
          <FieldsSet />
        </el-tab-pane>
        <el-tab-pane label="文件" name="file">
          <FilesSet :table-data-total="tableDataTotal" />
        </el-tab-pane>
        <el-tab-pane label="打印" name="print">
          <PrintSet />
        </el-tab-pane>
        <el-tab-pane label="图表" name="eChart">
          <AgChart />
        </el-tab-pane>
        <el-tab-pane label="配置" name="config">
          <ConfigSet :table-data-total="tableDataTotal" />
        </el-tab-pane>
      </el-tabs>

      <!-- tabs底部合计行 -->
      <div class="CellMenuList-bottom">
        <TotalRow :table-data-total="tableDataTotal" />
      </div>
    </div>
    <!-- 蒙层 -->
    <div class="CellMenuList-mask" @click="close" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { AgGridUtils } from '@/components/AgGrid/common/agGrid-utils'
// import agGrid from '../../../../store/modules/agGrid'

export default {
  name: 'CellMenuList',
  components: {
    ConfigSet: () => import('./components/ConfigSet/index.vue'),
    FieldsSet: () => import('./components/FieldsSet/index.vue'),
    FilesSet: () => import('./components/FilesSet/index.vue'),
    PrintSet: () => import('./components/PrintSet/index.vue'),
    AgChart: () => import('./components/AgChart/indx.vue'),
    TotalRow: () => import('./components/TotalRow/index.vue')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeName: 'fields',
      agTable: null,
      tableDataTotal: {}
    }
  },
  computed: {
    ...mapState('agGrid/cellContextMenu', [
      'menuListData',
      'left',
      'top',
      'openDialogCount'
    ])
  },
  watch: {
    visible (value) {
      if (value) {
        this.dealMenuListData()
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    ...mapMutations('agGrid/cellContextMenu', ['OPEN_CELL_MENU_LIST']),
    // 处理菜单数据
    dealMenuListData () {
      console.log('this.menuListData', this.menuListData)
      const agTable = new AgGridUtils(this.menuListData)
      this.agTable = agTable

      this.getTableDataTotal(agTable)
    },
    // 获取tableDataTotal
    getTableDataTotal (agTable) {
      const { value } = this.menuListData
      this.tableDataTotal = {
        // 当前单元格的值
        value,
        // 传递属性
        tableRowDataLength: agTable.getRootGridData.length,
        filterRowDataLength: agTable.getCurrentGridNode.length,
        selectedRowDataLength: agTable.selectedRowData.length,
        columnDefsLength: agTable.columnDefsLength,
        colPosition: agTable.colPosition(),
        rowPosition: agTable.rowPosition(),
        colPinnedPosition: agTable.colPinnedPosition(),
        rowPinnedPosition: agTable.rowPinnedPosition(),

        columnDefs: agTable.columnDefs,
        selectedRowData: agTable.selectedRowData,
        // 传递方法
        jumpToRow: agTable.jumpToRow,
        jumpToCol: agTable.jumpToCol,
        setFilterModel: agTable.setFilterModel,
        setQuickFilter: agTable.setQuickFilter,
        setDomLayout: agTable.setDomLayout,
        pinnedColumns: agTable.pinnedColumns,
        clearAllColumnsPinned: agTable.clearAllColumnsPinned,
        deselectAll: agTable.deselectAll,
        selectAll: agTable.selectAll,
        setPinnedTopRowData: agTable.setPinnedTopRowData,
        setPinnedBottomRowData: agTable.setPinnedBottomRowData,
        exportDataAsCsv: agTable.exportDataAsCsv,
        exportExcelFun: agTable.exportExcelFun

      }
      console.log('this.tableDataTotal=====>', this.tableDataTotal)
    },

    handleClick (ele) {
      console.log('handleClick', ele)
    },
    closeMenu () {
      if (this.openDialogCount <= 0) {
        this.OPEN_CELL_MENU_LIST(false)
      } else {
        console.log('还有弹窗存在', this.openDialogCount)
      }
    },
    close () {
      this.OPEN_CELL_MENU_LIST(false)
      // this.agTable.exportDataAsCsv({
      //   fileName: '数据'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
$menu-height: 40vh;
$menu-width: 30vw;

.CellMenuList {
  background-color: #fff;
  z-index: 3000;
  position: absolute;
  padding: 0 6px 8px 6px;
  list-style-type: none;
  border-radius: 8px;
  font-weight: 400;
  color: #333;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

  &-tabs {
    width: $menu-width;
    min-width: 400px;
    height: $menu-height;
    overflow: hidden;
    ::v-deep .el-tabs__header {
      margin-bottom: 0px;
    }
    ::v-deep .el-tab-pane {
      height: calc($menu-height - 50px);
      overflow: auto;
    }
    ::v-deep .el-tabs__nav-scroll {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &-bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
