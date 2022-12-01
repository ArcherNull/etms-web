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
import { mapState } from 'vuex'
export default {
  name: 'MyButton',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    ...mapState('element/elButton', ['size', 'plain', 'disabled', 'icon', 'type', 'title']),
    customizedAttrs () {
      const obj = {
        size: this.size,
        title: this.title,
        plain: this.plain,
        disabled: this.disabled,
        icon: this.icon
      }
      if (this.type) {
        obj.type = this.type
      }
      return Object.assign(obj, this.$attrs)
    }
  }
}
</script>
