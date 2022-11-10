<!--
 * @Author: Null
 * @Date: 2022-03-21 16:32:47
 * @Description: el-image图片二次封装
-->

<template>
  <el-image
    v-bind="customizedAttrs"
    v-on="$listeners"
  >
    <div slot="error" :style="customizedAttrs.style" :class="customizedAttrs.class" class="MyImage_error borderRed" flex="main:center cross:center">
      <i class="el-icon-picture-outline" />
    </div>
  </el-image>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyImage',
  inheritAttrs: false,
  computed: {
    ...mapState('element/elImage', ['style']),
    customizedAttrs () {
      return {
        style: this.style,
        // 支持传过来的size覆盖默认的size
        ...this.$attrs
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.MyImage_error{
  width: 100%;
  height: inherit;
}
</style>
