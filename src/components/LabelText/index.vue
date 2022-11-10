<template>
  <div class="LabelText" flex>
    <div class="LabelText_1">{{ title }}</div>
    <slot>
      <div class="LabelText_2 text-ellipsis-1" :title="content" @dblclick="copyContent(content)">
        {{ content }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'LabelText',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.LabelText {
  margin-bottom: 5px;
  font-size: $font-text-14;
  &_1 {
    word-break: keep-all;
    color: $color-text-sub;
  }
  &_2 {
    color: $color-text-main;
  }
}
</style>
