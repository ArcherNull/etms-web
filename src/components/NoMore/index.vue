<!--
 * @Author: Null
 * @Date: 2022-02-15 11:41:16
 * @Description: 没有更多数据组件
-->
<template>
  <div id="noMoreComponent" class="noMore dk-subContent" flex="main:center cross:center">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'NoMore',
  props: {
    content: {
      type: String,
      default: '暂无更多数据'
    }
  },
  created () {
    this.setNoMoreStyle()
  },
  methods: {
    setNoMoreStyle () {
      const parent = document.getElementById('noMoreComponent').parentElement
      parent.style.position = 'relative'
    }
  }
}
</script>
<style lang="scss" scoped>
.noMore{
    min-height: 50px;
    height: 100%;
    width: 100%;
}
</style>
