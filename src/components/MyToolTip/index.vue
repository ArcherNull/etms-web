<!--
 * @Author: Null
 * @Date: 2022-02-08 17:52:03
 * @Description: 提示文本组件
-->

<template>
  <el-tooltip :effect="effect" :content="content" :placement="placement">
    <slot />
  </el-tooltip>
</template>

<script>
export default {
  name: 'MyToolTip',
  props: {
    content: {
      type: String,
      default: ''
    },
    // dark/light
    effect: {
      type: String,
      default: 'dark'
    },
    // top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: {
      type: String,
      default: 'bottom'
    }
  }
}
</script>
