<!--
 * @Author: Null
 * @Date: 2021-12-02 00:23:11
-->
<template>
  <div class="sidebar-menu-search" :style="{ height: height }">
    <el-select
      v-model="searchName"
      class="sidebar-menu-search__input"
      placeholder="请选择"
      clearable
      filter
      filterable
      @change="searchRouter"
    >
      <i slot="prefix" class="el-icon-search" />
      <el-option
        v-for="(item, index) in pool"
        :key="index"
        :label="$t(`layout.sidebar.menu.${item.path}`) || '未命名'"
        :value="item.path"
      />
    </el-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MenuSearch',
  props: {
    height: {
      type: String,
      default: '40px'
    }
  },
  data () {
    return {
      routesList: [],
      searchName: ''
    }
  },
  computed: {
    ...mapState('setting/tagViews', ['pool'])
  },
  methods: {
    // 搜索路由事件
    searchRouter (ele) {
      console.log('搜索路由事件', ele)
      this.$router.push(ele)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .sidebar-menu-search {
  overflow: hidden;
  &__input {
    padding: 0 12px 0 18px;
    width: inherit;
    height: inherit;
    .el-input--prefix .el-input__inner {
      padding-left: 33px;
    }
    .el-input__inner {
      border: none;
      font-size: $font-text-14;
      color: #c0c4cc;
      background-color: $sidebar-menu-bg;
      &::placeholder {
        font-size: $font-text-14;
        color: #c0c4cc;
      }
      /* 谷歌 */
      &::-webkit-input-placeholder {
        font-size: $font-text-14;
        color: #c0c4cc;
      }
      /* 火狐 */
      &:-moz-placeholder {
        font-size: $font-text-14;
        color: #c0c4cc;
      }
      /*ie*/
      &:-ms-input-placeholder {
        font-size: $font-text-14;
        color: #c0c4cc;
      }
    }
    ::before {
      line-height: 2.25rem;
      position: relative;
      left: -4px;
      color: #909399;
    }
  }
}
</style>
