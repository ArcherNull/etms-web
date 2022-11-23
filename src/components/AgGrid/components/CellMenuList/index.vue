<!--
 * @Author: Null
 * @Date: 2022-11-11 10:40:56
 * @Description: 单元格右键菜单栏
-->
<template>
  <div v-if="visible">
    <div
      :style="{ left: left + 'px', top: top + 'px' }"
      class="CellMenuList"
      @click.stop=""
    >
      <el-tabs
        v-model="activeName"
        class="CellMenuList-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="字段" name="fields">
          <FieldsSet />
        </el-tab-pane>
        <el-tab-pane label="文件" name="file">
          <FilesSet />
        </el-tab-pane>
        <el-tab-pane label="打印" name="print">
          <PrintSet />
        </el-tab-pane>
        <el-tab-pane label="图表" name="eChart">
          <AgChart />
        </el-tab-pane>
        <el-tab-pane label="配置" name="config">
          <ConfigSet />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 蒙层 -->
    <div class="CellMenuList-mask" @click="close" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CellMenuList',
  components: {
    ConfigSet: () => import('./components/ConfigSet/index.vue'),
    FieldsSet: () => import('./components/FieldsSet/index.vue'),
    FilesSet: () => import('./components/FilesSet/index.vue'),
    PrintSet: () => import('./components/PrintSet/index.vue'),
    AgChart: () => import('./components/AgChart/indx.vue')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeName: 'fields'
    }
  },
  computed: {
    ...mapState('agGrid/cellContextMenu', ['menuListData', 'left', 'top', 'openDialogCount'])
  },
  watch: {
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    ...mapMutations('agGrid/cellContextMenu', ['OPEN_CELL_MENU_LIST']),
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
    }
  }
}
</script>

<style lang="scss" scoped>
$menu-height:40vh;
$menu-width:30vw;

.CellMenuList {
  background-color: #fff;
  z-index: 3000;
  position: absolute;
  padding: 0 10px;
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
    ::v-deep .el-tabs__header{
      margin-bottom: 0px;
    }
    ::v-deep .el-tab-pane{
      height: calc($menu-height - 50px);
      overflow: auto;
    }
    ::v-deep .el-tabs__nav-scroll {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &-mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
