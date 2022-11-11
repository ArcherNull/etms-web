<!--
 * @Author: Null
 * @Date: 2022-11-11 10:40:56
 * @Description: 单元格右键菜单栏
-->
<template>
  <div
    v-if="visible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="CellMenuList"
    @click.stop=""
  >
    <el-tabs
      v-model="activeName"
      class="CellMenuList-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="字段" name="fields">字段</el-tab-pane>
      <el-tab-pane label="文件" name="file">文件</el-tab-pane>
      <el-tab-pane label="打印" name="print">打印</el-tab-pane>
      <el-tab-pane label="配置" name="config">配置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CellMenuList',
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
    ...mapState('agGrid/cellContextMenu', ['menuListData', 'left', 'top'])
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
      this.OPEN_CELL_MENU_LIST(false)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 25vw;
    height: 35vh;
    ::v-deep .el-tabs__nav-scroll {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
