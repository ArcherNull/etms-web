<!--
 * @Author: Null
 * @Date: 2022-02-15 11:41:16
 * @Description: 没有更多数据组件
-->
<template>
  <el-skeleton
    v-bind="customizedAttrs"
    v-on="$listeners"
  >
    <slot />
  </el-skeleton>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MySkeleton',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    ...mapState('element/elSkeleton', ['animated', 'throttle']),
    customizedAttrs () {
      return {
        animated: this.animated,
        throttle: this.throttle,
        // 支持传过来的size覆盖默认的size
        ...this.$attrs
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.noMore{
    min-height: 50px;
    height: 100%;
    width: 100%;
}
</style>
