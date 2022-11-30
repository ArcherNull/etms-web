<!--
 * @Author: Null
 * @Date: 2022-11-30 08:34:24
 * @Description:
-->
<template>
  <span class="LabelBox" :style="{ 'color':color }">
    <span class="LabelBox-title">{{ title }}</span>
    <span class="LabelBox-content">{{ content || 0 }}</span>
  </span>
</template>

<script>
export default {
  name: 'LabelBox',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Number],
      default: ''
    },
    color: {
      type: String,
      default: '#333'
    }
  }
}
</script>

<style lang="scss" scoped>
.LabelBox {
  font-size: 13px;
  display: flex;
  margin-right: 4px;
  &-content{
    font-weight: bold;
  }
}
</style>

