<!--
 * @Author: Null
 * @Date: 2022-02-09 16:45:51
 * @Description: el-button 透传组件
-->

<template>
  <el-button
    v-waves
    v-bind="customizedAttrs"
    v-on="$listeners"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'MyButton',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    customizedAttrs () {
      const obj = {
        size: 'mini'
      }
      return Object.assign(obj, this.$attrs)
    }
  }
}
</script>
