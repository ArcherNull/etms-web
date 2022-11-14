<!--
 * @Author: Null
 * @Date: 2022-05-27 10:41:32
 * @Description: 搜索框
-->

<template>
  <el-input
    v-model="searchVal"
    v-bind="config"
    class="SearchBox"
    @clear="clearFun"
    @keyup.enter.native="searchFun"
  >
    <template slot="append">
      <MyButton
        type="primary"
        :loading="loading"
        icon="el-icon-search"
        @click="searchFun"
      >查询</MyButton>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    // 搜索框默认值
    defaultValue: {
      type: String,
      default: ''
    },
    // 按钮loading
    loading: {
      type: Boolean,
      default: false
    },
    // 搜索框的其它配置项
    searchBoxConfig: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      searchVal: '' // 输入值
    }
  },
  computed: {
    config () {
      return {
        placeholder: '请输入搜索内容',
        clearable: true,
        ...this.searchBoxConfig
      }
    }
  },
  watch: {
    defaultValue (newVal) {
      if (newVal) {
        this.searchVal = newVal
      }
    }
  },
  methods: {
    // 搜索方法
    searchFun () {
      const str = this.searchVal
      console.log('搜索方法', str)
      this.$emit('searchFun', str)
    },
    // 清空方法
    clearFun () {
      console.log('清空方法')
      this.$emit('searchFun', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.SearchBox {
  max-width: 220px;
}
</style>
