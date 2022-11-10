<!--
 * @Author: Null
 * @Date: 2022-02-15 11:41:16
 * @Description: 没有更多数据组件
-->
<template>
  <el-empty v-bind="customizedAttrs" v-on="$listeners">
    <slot />
  </el-empty>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyEmpty',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    ...mapState('element/elEmpty', ['image', 'imageSize', 'description']),
    customizedAttrs () {
      return {
        image: this.image,
        imageSize: this.imageSize,
        description: this.description,
        // 支持传过来的size覆盖默认的size
        ...this.$attrs
      }
    }
  }
}
</script>
