<!--
 * @Author: Null
 * @Date: 2022-01-05 17:11:32
 * @Description: 标签导航--鼠标右键点击--显示页面操作面板--面板操作
-->
<template>
  <div class="contentmenu-list" @click="rowClick">
    <div v-for="item in menulist" :key="item.value" :data-value="item.value" class="contentmenu-item" flex>
      <SvgIcon v-if="item.icon" :name="item.icon" />
      <div class="dk-ml-4" flex-box="1">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextmenuList',
  props: {
    menulist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    rowClick (event) {
      let target = event.target
      while (!target.dataset.value) {
        target = target.parentNode
      }
      this.$emit('rowClick', target.dataset.value)
    }
  }
}
</script>

<style lang="scss">
.contentmenu-list {
  .contentmenu-item {
    padding: 6px 20px 6px 15px;
    margin: 0;
    font-size: 14px;
    line-height: 20px;
    color: #606266;
    cursor: pointer;
    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
  }
}
</style>
