<!--
 * @Author: Null
 * @Date: 2022-02-28 08:37:48
 * @Description: el-tag 二次封装
-->
<template>
  <el-tag v-bind="customizedAttrs" v-on="$listeners">
    <slot>未知标签</slot>
  </el-tag>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyTags',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    ...mapState('element/elTags', ['disableTransitions', 'hit', 'size', 'effect']),
    customizedAttrs () {
      return {
        disableTransitions: this.disableTransitions,
        hit: this.hit,
        size: this.size,
        effect: this.effect,

        // 支持传过来的size覆盖默认的size
        ...this.$attrs
      }
    }
  }
}
</script>
