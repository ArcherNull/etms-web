<!--
 * @Author: Null
 * @Date: 2022-11-14 14:59:22
 * @Description: 筛选
-->
<template>
  <!-- 冻结列 -->
  <div
    title="筛选"
    :class="[filter ? 'filterLeft' : 'filterNone', 'filterBox']"
    @click.stop="clickFun(filter)"
  >
    <SvgIcon name="filter" :class-name="filter ? 'filter' : 'no-filter'" />
  </div>
</template>

<script>
export default {
  name: 'FilterBox',
  model: {
    prop: 'filter',
    event: 'update'
  },
  props: {
    filter: {
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
.filterBox {
  width: 20px;
  aspect-ratio: 1/1;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background: rgb(232, 244, 255);
  }
}
.filterLeft {
  border: solid 1px #f00;
}

.filterNone {
  border: solid 1px #badeff;
}
.filter {
  color: #f00;
}
.no-filter {
  color: $color-primary;
}
</style>

