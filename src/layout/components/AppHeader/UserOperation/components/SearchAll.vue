<!--
 * @Author: Null
 * @Date: 2022-02-08 19:16:05
 * @Description: 全局搜索
-->
<template>
  <div class="header-searchAll">
    <MyToolTip content="全局搜索">
      <div class="header-searchAll-container dk-icon-btn" @click="openSearchAllDialog()">
        <SvgIcon name="search" />
      </div>
    </MyToolTip>
    <!-- 修改快捷键 -->
    <MyDialog
      :visible="searchAllVisible"
      :title="searchAllDialogTitle"
      width="80%"
      top="5vh"
      :before-close="() => (searchAllVisible = false)"
    >
      <!-- <div slot="title">{{ searchAllDialogTitle }}</div> -->
      <div slot="content">
        <SearchEngines />
      </div>
      <div slot="footer">
        <MyButton @click="searchAllVisible = false">取 消</MyButton>
        <MyButton
          type="primary"
          @click="searchAllVisible = false"
        >确 定</MyButton>
      </div>
    </MyDialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchAll', // 设置
  components: {
    SearchEngines: () => import('./seachAll/SearchEngines.vue')
  },
  data () {
    return {
      searchAllVisible: false,
      searchAllDialogTitle: '全局搜索'
    }
  },
  computed: {
    ...mapState('searchAll/searchAllDialog', ['showSearchAllDialogCount'])
  },
  watch: {
    showSearchAllDialogCount: {
      handler (newVal) {
        console.log('showSearchAllDialogCount', newVal)
        if (newVal) {
          this.openSearchAllDialog()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    openSearchAllDialog () {
      this.searchAllVisible = !this.searchAllVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.header-searchAll {
  height: inherit;
  &-container {
    width: $header-icon-btn-width;
    height: 100%;
  }
}
</style>
