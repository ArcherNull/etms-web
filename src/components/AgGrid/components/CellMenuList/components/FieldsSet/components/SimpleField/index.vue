<!--
 * @Author: Null
 * @Date: 2022-11-14 17:25:28
 * @Description:
-->
<template>
  <div class="SimpleField">
    <div
      v-for="(fieldItem, index) in fieldsList"
      :key="index"
      class="SimpleField-item"
    >
      <div class="SimpleField-item__left" :title="fieldItem.headerName" @click="selectedItem(fieldItem)">
        <el-checkbox v-model="fieldItem.hide" />
        <div class="SimpleField-item__left-text ellipsis">{{ fieldItem.headerName }}</div>
      </div>
      <div class="SimpleField-item__right">
        <PinnedBox v-model="fieldItem.pinned" @change="changePinned" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleField',
  components: {
    PinnedBox: () => import('../PinnedBox/index.vue')
  },
  props: {
    fieldsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    selectedItem (item) {
      item.hide = !item.item
    },
    changePinned (ele) {
      this.fieldItem.pinned = ele === 'left' ? '' : 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
.SimpleField {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 5px;
  &-item {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    cursor: pointer;
    &__left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &-text {
        margin-left: 6px;
      }
    }
    &__right {
      div {
        margin-left: 4px;
      }
    }
  }
}
.ellipsis {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
