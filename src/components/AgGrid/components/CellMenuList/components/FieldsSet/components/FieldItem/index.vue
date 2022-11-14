<!--
 * @Author: Null
 * @Date: 2022-11-14 13:41:52
 * @Description:
-->
<template>
  <div class="FieldItem">
    <span
      v-for="(fieldItem , index) in fieldsList"
      :key="index"
      class="FieldItem-content"
    >
      <el-checkbox v-model="fieldItem.hide" />
      <el-input
        v-model="fieldItem.headerName"
        size="mini"
        class="FieldItem-input"
        placeholder="字段名"
        :clearable="clearable"
        :disabled="disabled"
        title="请输入自定义字段名"
      />
      <el-input
        v-model="fieldItem.width"
        type="number"
        maxlength="3"
        size="mini"
        class="FieldItem-width"
        placeholder="宽度"
        :clearable="clearable"
        :disabled="disabled"
        title="请输入自定义宽度"
      />
      <PinnedBox v-model="fieldItem.pinned" @change="changePinned" />
      <FilterBox v-model="fieldItem.filter" @change="changeFilter" />
      <EditableBox v-model="fieldItem.editable" @change="changeEditable" />
      <SortableBox v-model="fieldItem.sortable" @change="changeSortable" />

    </span>
  </div>
</template>

<script>
export default {
  name: 'FieldItem',
  components: {
    PinnedBox: () => import('../PinnedBox/index.vue'),
    FilterBox: () => import('../FilterBox/index.vue'),
    EditableBox: () => import('../EditableBox/index.vue'),
    SortableBox: () => import('../SortableBox/index.vue')
  },
  props: {
    fieldsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      disabled: false,
      clearable: false
      // fieldItem: {
      //   headerName: '姓名',
      //   field: 'name',
      //   pinned: 'left',
      //   width: 120,
      //   minWidth: 80,
      //   maxWidth: 600,
      //   editable: false,
      //   cellStyle: { color: '#333', 'line-height': '34px' },
      //   hide: false,
      //   sort: true,
      //   sortable: true,
      //   resizable: true,
      //   filter: true
      // }
    }
  },
  methods: {
    // 改变固定列
    changePinned (ele) {
      console.log('改变固定列', ele)
      this.fieldItem.pinned = ele === 'left' ? '' : 'left'
    },
    // 改变固定列
    changeFilter (ele) {
      console.log('改变固定列', ele)
      this.fieldItem.filter = !ele
    },
    // 改变可编辑
    changeEditable (ele) {
      console.log('改变可编辑', ele)
      this.fieldItem.editable = !ele
    },
    // 改变可排序
    changeSortable (ele) {
      console.log('改变可排序', ele)
      this.fieldItem.sortable = !ele
    }
  }
}
</script>

<style lang="scss" scoped>
.FieldItem {
  &-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 6px;
  }
  &-input,
  &-width,
  div{
    margin-left: 4px;
  }
  &-input {
    width: 120px;
  }
  &-width {
    width: 80px;
  }
}
</style>

