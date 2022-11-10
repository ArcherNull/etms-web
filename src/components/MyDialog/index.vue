<!--
 * @Author: Null
 * @Date: 2022-02-12 08:37:17
 * @Description: l-dialog 二次封装
-->
<template>
  <el-dialog
    v-elDragDialog
    :visible="customizedAttrs.visible"
    v-bind="customizedAttrs"
    :class="['myDialog', customizedAttrs.class]"
    v-on="$listeners"
  >
    <span slot="title" class="dk-f1-title">
      <slot name="title"> {{ customizedAttrs.title || 'MyDialog' }} </slot>
    </span>
    <div :class="['myDialog-content', customizedAttrs.contentClass]">
      <slot name="content"><NoMore /></slot>
    </div>
    <slot slot="footer"><slot name="footer" /> </slot>
  </el-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'MyDialog',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    ...mapState('element/elDialog', ['closeOnClickModal']),

    // 注意：拖拽属性跟
    customizedAttrs () {
      return {
        title: 'MyDialog', // title
        width: '45%', // Dialog 的宽度
        top: '10vh', // Dialog CSS 中的 margin-top 值
        'lock-scroll': true, // 是否在 Dialog 出现时将 body 滚动锁定
        'close-on-click-modal': this.closeOnClickModal, // 是否可以通过点击 modal 关闭 Dialog
        'destroy-on-close': false, // 关闭时销毁 Dialog 中的元素
        'show-close': true, // 是否显示关闭按钮
        'modal': true, // 是否需要遮罩层
        // 'before-close': this.handleClose,
        ...this.$attrs
      }
    }
  },
  methods: {
    ...mapMutations('element/elDialog', ['SET_CLOSE_ON_CLICK_MODAL'])
  }
}
</script>
<style lang="scss">
.myDialog {
  width: inherit;
  height: inherit;
  &-content {
    max-height: 66vh;
    min-height: 10vh;
    @extend %scroll-bar-style;
  }
  .myDialog-noMore {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
