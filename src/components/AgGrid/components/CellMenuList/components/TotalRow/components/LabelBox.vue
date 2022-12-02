<!--
 * @Author: Null
 * @Date: 2022-11-30 08:34:24
 * @Description:
-->
<template>
  <span class="LabelBox" :title="labelItem.title" :style="{ 'color': labelItem.color }" @click="clickFun(labelItem)">
    <span class="LabelBox-content">{{ labelItem.content || 0 }}</span>
  </span>
</template>

<script>
export default {
  name: 'LabelBox',
  props: {
    labelItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    // 点击事件
    clickFun (item) {
      console.log('点击事件', item)
      this.$emit('clickFun', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.LabelBox {
  font-size: 13px;
  display: flex;
  &::after{
    content: '/';
    color: #333 !important;
    margin: 0 2px;
  }
  &-content{
    font-weight: bold;
    cursor: pointer;
    &:hover{
      background-color: rgba(0,0,0,0.15);
    }
  }
}
</style>

