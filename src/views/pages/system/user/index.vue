<!--
 * @Author: Null
 * @Date: 2021-12-29 15:09:51
 * @Description:系统管理--用户管理
-->

<template>
  <div>
    <span v-for="(item,index) in checkList" :key="index" class="checkboxLost">
      <MyCheckbox :label="item.label" :disabled="item.disabled" :selected="item.selected" />
    </span>
    <div class="test-container">
      内容
    </div>
    <FirstTitle title="顶部的内容">
      <div slot="content">
        顶部的内容
      </div>
    </FirstTitle>
    <div class="test-container">
      内容
    </div>
    <FirstTitle title="中部的内容">
      <div slot="content">
        中部的内容
      </div>
    </FirstTitle>
    <div class="test-container">
      内容
    </div>
    <FirstTitle title="底部的内容">
      <div slot="content">
        底部的内容
      </div>
    </FirstTitle>
    <FirstTitle title="测试">
      <div slot="content">
        <MyButton @click="pageAnchor('顶部的内容')">当前页面锚点定位==>顶部的内容</MyButton>
        <MyButton @click="pageAnchor('中部的内容')">当前页面锚点定位==>中部的内容</MyButton>
        <MyButton @click="pageAnchor('底部的内容')">当前页面锚点定位==>底部的内容</MyButton>
      </div>
    </FirstTitle>
  </div>
</template>
<script>
export default {
  name: 'User',
  data () {
    return {
      checkList: [{
        label: '选项一选项一选项一选项一选项一',
        value: '123',
        selected: true
      }, {
        label: '选项二',
        disabled: true,
        selected: false,
        value: '123'
      }, {
        label: '选项三',
        selected: true,
        value: '123'
      }]
    }
  },
  mounted () {

  },
  methods: {
    // 当前页面锚点
    pageAnchor (str) {
      this.$commJs.jumpPageAnchor(this, str)
    }
  }
}
</script>

<style lang='scss' scoped>
.test-container{
  height: 150vh;
  width: 100%;
  border: solid 1px #f00;
}
</style>
