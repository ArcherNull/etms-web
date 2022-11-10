<!--
 * @Author: Null
 * @Date: 2022-03-21 08:53:33
 * @Description:
-->
<template>
  <div class="DisplayText" flex>
    <div :class="['DisplayText_title dk-f3-title', displayText.class]">
      <slot name="title">
        {{ displayText.title }}
        <MyToolTip
          v-if="displayText.helpMessage"
          class="dk-ml-4"
          :content="displayText.helpMessage"
        >
          <SvgIcon name="issues-feedback" />
        </MyToolTip>
      </slot>
    </div>
    <div class="DisplayText_content dk-content">
      <slot name="content">{{ displayText.content }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayText',
  props: {
    displayText: {
      type: Object,
      require: true,
      default: () => {
        return {
          title: '',
          content: '',
          helpMessage: ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.DisplayText {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 8px;
  &_title {
    text-align: right;
  }
}
</style>
