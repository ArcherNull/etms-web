<!--
 * @Author: Null
 * @Date: 2022-05-27 11:34:40
 * @Description: 页面顶部搜索容器
-->
<template>
  <div :class="['HeaderContainer', className]" :flex="layoutType">
    <div class="HeaderContainer-left">
      <slot name="left" />
    </div>
    <div class="HeaderContainer-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContainer',
  props: {
    // 布局方式  flex-between：水平左右靠齐,  flex-start 水平靠左对齐 ， flex-end 水平靠右对齐
    // dir-start : 垂直靠左对齐 ， dir-end :垂直靠右对齐
    layout: {
      type: String,
      default: 'flex-between'
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    layoutType () {
      return {
        'flex-between': 'main:justify cross:center',
        'flex-start': 'main:left cross:center',
        'flex-end': 'main:right cross:center',
        'dir-start': 'dir:top main:left cross:top',
        'dir-end': 'dir:top cross:bottom'
      }[this.layout]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.HeaderContainer {
  &-left {
    // width: 100%;
  }
  &-right {
    // width: 100%;
  }
}
</style>
