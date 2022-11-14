<!--
 * @Author: Null
 * @Date: 2022-11-14 14:59:22
 * @Description: 筛选
-->
<template>
  <!-- 冻结列 -->
  <div
    title="可编辑"
    :class="[editable ? 'editableLeft' : 'editableNone', 'editableBox']"
    @click.stop="clickFun(editable)"
  >
    <SvgIcon name="editable" :class-name="editable ? 'editable' : 'no-editable'" />
  </div>
</template>

<script>
export default {
  name: 'EditableBox',
  model: {
    prop: 'editable',
    event: 'update'
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickFun (ele) {
      console.log('点击', ele)
      this.$emit('change', ele)
    }
  }
}
</script>

    <style lang="scss" scoped>
  .editableBox {
    width: 20px;
    aspect-ratio: 1/1;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
      background: rgb(232, 244, 255);
    }
  }
  .editableLeft {
    border: solid 1px #f00;
  }

  .editableNone {
    border: solid 1px #badeff;
  }
  .editable {
    color: #f00;
  }
  .no-editable {
    color: $color-primary;
  }
  </style>

