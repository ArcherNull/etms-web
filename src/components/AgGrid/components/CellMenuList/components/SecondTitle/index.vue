<!--
 * @Author: Null
 * @Date: 2022-01-26 21:16:57
 * @Description: 一级标题组件
-->

<template>
  <div class="SecondTitle-box">
    <div class="SecondTitle dk-mb-10" flex="main:justify cross:center">
      <div class="SecondTitle-left" flex="main:left cross:center">
        <div class="SecondTitle-left__title">
          {{ title }}
        </div>
        <div class="SecondTitle-left__subBox">
          <slot name="left" />
        </div>
      </div>
      <div class="SecondTitle-right">
        <slot name="right" />
      </div>
    </div>
    <!-- 内容 -->
    <div class="SecondTitle-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondTitle',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.SecondTitle {
  width: 100%;
  &-left {
    &__title {
      font-size: 14px;
      color: #666;
      font-weight: bold;
    }
    &__subBox {
      margin-left: 10px;
      color: #999;
      font-size: 14px;
    }
  }
  &-content{
    padding: 0 6px;
    margin-bottom: 16px;
  }
}
.dk-mb-10 {
  margin-bottom: 10px;
}
</style>
