<template>
  <!-- 冻结列 -->
  <div
    title="于左侧冻结列"
    :class="[pinned === 'left' ? 'pinnedLeft' : 'pinnedNone', 'pinnedBox']"
    @click.stop="clickFun(pinned)"
  >
    <SvgIcon :name="pinned === 'left' ? 'pinned' : 'no-pinned'" :class-name="pinned === 'left' ? 'pinned' : ''" />
  </div>
</template>

<script>
export default {
  name: 'PinnedBox',
  model: {
    prop: 'pinned',
    event: 'update'
  },
  props: {
    pinned: {
      type: String,
      default: ''
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
.pinnedBox {
  width: 20px;
  aspect-ratio: 1/1;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background: rgb(232, 244, 255);
  }
}
.pinnedLeft {
  border: solid 1px #f00;
}

.pinnedNone {
  border: solid 1px #badeff;
}
.pinned{
  color: #f00;
}
</style>

