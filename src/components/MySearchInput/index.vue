<!--
 * @Author: Null
 * @Date: 2022-05-13 09:51:36
 * @Description:
-->
<template>
  <div class="MySearchInput">
    <el-input
      v-model="input3"
      placeholder="请输入内容"
      size="medium"
      class="input-with-select"
      clearable
      @keyup.enter.native="searchAllFun"
    >
      <el-select
        v-if="selectObj && Array.isArray(selectObj.selectList)"
        slot="prepend"
        v-model="selectObj.defaultValue"
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in selectObj.selectList"
          :key="index"
          :value="item.title"
        />
      </el-select>
      <el-button
        slot="append"
        :loading="searchAllLoading"

        icon="el-icon-search"
        @click="searchAllFun"
      />
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'MySearchInput',
  data () {
    return {
      selectObj: {
        defaultValue: '',
        selectList: [
          {
            label: '餐厅名',
            value: '1'
          },
          {
            label: '订单号',
            value: '2'
          }
        ],
        otherFilterList: [
          {
            title: '其它'
          }
        ]
      },
      input3: '',
      searchAllLoading: false // 全局搜索按钮loading
    }
  },
  methods: {
    // 全局搜索按钮
    searchAllFun () {
      this.searchAllLoading = true
      console.log('全局搜索按钮', this.input3)
      setTimeout(() => {
        this.searchAllLoading = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.MySearchInput {
  .el-select .el-input {
    width: 6vw;
  }
  .el-input {
    width: 30vw;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
