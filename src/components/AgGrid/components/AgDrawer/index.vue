<!--
 * @Author: Null
 * @Date: 2022-11-11 13:46:04
 * @Description:
-->
<template>
  <div class="AgDrawer">
    <el-drawer
      v-if="showRowDetailDrawer"
      title="详情"
      :modal="false"
      class="agGrid-drawer"
      :visible="visible"
      :modal-append-to-body="false"
      direction="rtl"
      width="250px"
      @close="close"
    >
      <div class="agGrid-drawer__content">
        <div
          v-for="(item, index) in agTableOptions.columnDefs"
          :key="index"
          class="agGrid-drawer__content-line"
        >
          <div class="title">{{ item.headerName }}</div>
          <div
            class="context"
            @dblclick="copy(agRowDataDetailData[item.field])"
          >
            {{ agRowDataDetailData[item.field] || '' }}
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'AgDrawer',
  filters: {

  },
  props: {
    agTableOptions: {
      type: Object,
      default: () => {}
    },
    agRowDataDetailData: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showRowDataDetailDrawer: true
    }
  },
  computed: {
    // 侧边抽屉
    showRowDetailDrawer () {
      const { columnDefs, rowData } = this.agTableOptions
      return this.showRowDataDetailDrawer && columnDefs && columnDefs.length && rowData && rowData.length
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    copy (text) {
      this.$commJs.copyToClipboard(this, text)
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep .agGrid-drawer {
  // 抽屉宽度 -写死
  .el-drawer__container {
    .el-drawer.rtl {
      margin: 90px 10px 0px 0;
      box-sizing: border-box;
      height: calc(100vh - 105px);
      border-radius: 8px;
      width: 300px !important;
    }
  }
  .el-drawer__header {
    padding: 10px;
    margin-bottom: 0px;
  }
  .el-drawer__body {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  // 侧边框详情内容样式
  .agGrid-drawer__content {
    padding: 0px 10px;
    font-size: 14px;
    margin-bottom: 60px;
    &-line {
      display: grid;
      grid-template-columns: 75px 1fr;
      column-gap: 8px;
      padding: 4px 0;
      // user-select: all;
      .title {
        text-align: right;
        color: #999;
      }
      .context {
        color: #333;
        word-break: break-all;
      }
    }
  }
}
</style>
