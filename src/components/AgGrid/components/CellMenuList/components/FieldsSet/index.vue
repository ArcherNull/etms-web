<!--
 * @Author: Null
 * @Date: 2022-11-11 13:41:28
 * @Description: 字段设置
-->
<template>
  <div class="FieldsSet">
    <FirstTitle title="字段设置">
      <div slot="left">
        <MyBtnList :btn-list-config="btnListConfig" @clickFun="clickFun" />
      </div>
      <div slot="content">
        <div class="FieldsSet-content">
          <div v-if="fieldsMode === '简易版'">
            <SimpleField :fields-list="fieldsList" />
          </div>
          <div v-else>
            <FieldItem :fields-list="fieldsList" />
          </div>
        </div>
      </div>
    </FirstTitle>

    <FirstTitle title="条件设置">
      <div slot="content">
        <div class="FieldsSet-content">
          <FieldItem :fields-list="fieldsList" />
        </div>
      </div>
    </FirstTitle>
  </div>
</template>

<script>
export default {
  name: 'FieldsSet',
  components: {
    FirstTitle: () => import('../FirstTitle/index.vue'),
    MyBtnList: () => import('../MyBtnList/index.vue'),
    FieldItem: () => import('./components/FieldItem/index.vue'),
    SimpleField: () => import('./components/SimpleField/index.vue')
  },
  data () {
    return {
      searchLoading: false,
      fieldsMode: '简易版',
      fieldsList: [
        {
          headerName: '姓名姓名姓名姓名姓名姓名姓名姓名姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名姓名姓名姓名姓名姓名姓名姓名姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名姓名姓名姓名姓名姓名姓名姓名姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名姓名姓名姓名姓名姓名姓名姓名姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名姓名姓名姓名姓名姓名姓名姓名姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        },
        {
          headerName: '姓名',
          field: 'name',
          pinned: 'left',
          width: 120,
          minWidth: 80,
          maxWidth: 600,
          editable: false,
          cellStyle: { color: '#333', 'line-height': '34px' },
          hide: false,
          sort: true,
          sortable: true,
          resizable: true,
          filter: true
        }
      ],
      btnListConfig: {
        config: {
          size: 'mini'
        },
        schemas: [
          {
            type: 'text',
            btnText: '简易版'
          },
          {
            type: 'primary',
            btnText: '保存'
          },
          {
            type: 'info',
            btnText: '重置',
            plain: true
          }
        ]
      }
    }
  },
  methods: {
    searchFun (ele) {
      console.log('搜索', ele)
    },
    // 改变模式
    changeMode () {
      console.log('改变模式')
      this.btnText = this.btnText === '简易版' ? '标准版' : '简易版'
    },
    clickFun (data) {
      console.log('item', data)
      const { item } = data
      item.loading = true
      switch (item.btnText) {
        case '简易版':
          this.fieldsMode = '标准版'
          item.btnText = '标准版'
          break
        case '标准版':
          this.fieldsMode = '简易版'
          item.btnText = '简易版'
          break
        case '保存':
          console.log('保存')
          break
        case '重置':
          console.log('重置')
          break
      }
      setTimeout(() => {
        item.loading = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.FieldsSet {
  &-button {
    margin-left: 6px;
  }
}
</style>
