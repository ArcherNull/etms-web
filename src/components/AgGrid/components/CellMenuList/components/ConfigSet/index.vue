<!--
 * @Author: Null
 * @Date: 2022-11-11 13:41:28
 * @Description: 字段设置
-->
<template>
  <div class="ConfigSet" @click.stop>
    <FirstTitle title="全局操作">
      <div slot="content">
        <el-form ref="configForm" :model="configForm" size="mini" label-width="150px">
          <el-form-item label="全局搜索">
            <SearchBox
              :loading="searchLoading"
              :search-box-config="{
                placeholder: '请输入搜索数据',
                size: 'mini'
              }"
              @searchFun="searchFun"
            />
          </el-form-item>
          <el-form-item label="复制单元格内容">
            {{ tableDataTotal.value || '无' }}
            <MyButton
              v-show="tableDataTotal.value"
              size="mini"
              type="text"
              @click.stop="copyContent(tableDataTotal.value)"
            >复制</MyButton>
          </el-form-item>
          <el-form-item label="清空所有过滤条件">
            <MyButton
              size="mini"
              type="warning"
              @click.stop="operation(null,'clearAllFilter')"
            >清空</MyButton>
          </el-form-item>
          <el-form-item label="行跳转">
            <el-input
              v-model="rowPosition"
              :maxlength="rowMaxLength"
              @change="operation($event , 'jumpToRow')"
            />
          </el-form-item>
          <el-form-item label="列跳转">
            <el-input
              v-model="colPosition"
              :maxlength="colMaxLength"
              @change="operation($event , 'jumpToCol')"
            />
          </el-form-item>
        </el-form>
      </div>
    </FirstTitle>
    <FirstTitle title="全局配置">
      <div slot="left">
        <MyBtnList :btn-list-config="btnListConfig" @clickFun="clickFun" />
      </div>
      <div slot="content">
        <el-form ref="configForm" :model="configForm" size="mini" label-width="150px">
          <el-form-item label="表格主题">
            <el-select :value="theme" placeholder="请选择" @change="operation($event, 'theme')">
              <el-option
                v-for="(item,index) in themeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="每页条数">
            <el-input :value="pageSize" type="number" @change="operation($event, 'pageSize')" />
          </el-form-item>
          <el-form-item label="表格行高">
            <el-input
              v-model="configForm.name"
              type="number"
              @change="operation($event, 'pageSize')"
            />
          </el-form-item>
          <el-form-item label="表格行样式">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="最大被选择行数">
            <el-input :value="maxSelectedRows" @change="operation($event, 'maxSelectedRows')" />
          </el-form-item>
          <el-form-item label="最大导入数据条数">
            <el-input :value="maxExportRows" @change="operation($event, 'maxExportRows')" />
          </el-form-item>
          <el-form-item label="列省略展开">
            <el-switch :value="openCloEllipsis" @change="operation($event, 'openCloEllipsis')" />
          </el-form-item>
          <el-form-item label="显示序列行">
            <el-switch :value="showFirstColumn" @change="operation($event, 'showFirstColumn')" />
          </el-form-item>
          <el-form-item label="显示/隐藏合计行">
            <el-switch :value="showCalcBottomRow" @change="operation($event, 'showCalcBottomRow')" />
          </el-form-item>
          <el-form-item label="筛选事件清空被选项">
            <el-switch
              :value="filterEventClearSelected"
              @change="operation($event, 'filterEventClearSelected')"
            />
          </el-form-item>
        </el-form>
      </div>
    </FirstTitle>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ConfigSet',
  components: {
    FirstTitle: () => import('../FirstTitle/index.vue'),
    SearchBox: () => import('../SearchBox/index.vue'),
    MyBtnList: () => import('../MyBtnList/index.vue'),
    MyButton: () => import('../MyButton/index.vue')
  },
  props: {
    tableDataTotal: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      searchLoading: false,
      btnListConfig: {
        config: {
          size: 'mini'
        },
        schemas: [
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
      },
      configForm: {
        name: ''
      },
      rowPosition: 0,
      colPosition: 0,
      rowMaxLength: 0,
      colMaxLength: 0
    }
  },
  computed: {
    ...mapState('agGrid/theme', ['theme', 'themeList']),
    ...mapState('agGrid/cellContextMenu', [
      'openCloEllipsis',
      'pageSize',
      'maxSelectedRows',
      'maxExportRows',
      'showFirstColumn',
      'showCalcBottomRow',
      'filterEventClearSelected'
    ])
  },
  watch: {
    tableDataTotal: {
      handler (newVal) {
        if (newVal) {
          console.log('newVal=====>', newVal)
          this.initTableConfig(newVal)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations('agGrid/theme', ['SET_THEME']),
    ...mapMutations('agGrid/cellContextMenu', [
      'SET_OPEN_CLO_ELLIPSIS',
      'SET_PAGE_SIZE',
      'SET_MAX_SELECTED_ROWS',
      'SET_MAX_EXPORT_ROWS',
      'SET_SHOW_FIRST_COLUMN',
      'SET_SHOW_CALC_BOTTOM_ROW',
      'SET_FILTER_EVENT_CLEAR_SELECTED'
    ]),

    initTableConfig (newVal) {
      const {
        rowPosition,
        colPosition,
        columnDefsLength,
        tableRowDataLength
      } = newVal

      this.rowPosition = rowPosition
      this.colPosition = colPosition
      this.rowMaxLength = tableRowDataLength
      this.colMaxLength = columnDefsLength
    },
    // 搜索
    searchFun (ele) {
      console.log('搜索123123', ele)

      console.log('this.tableDataTotal=====>', this.tableDataTotal)
      this.tableDataTotal.setQuickFilter(ele)
    },
    // 点击按钮
    clickFun (data) {
      console.log('item', data)
      const { item } = data
      item.loading = true
      switch (item.btnText) {
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
    },
    // 改变主题
    changeTheme (ele) {
      console.log('改变主题', ele)
      this.SET_THEME(ele)
    },
    // 操作
    operation (ele, type) {
      switch (type) {
        case 'clearAllFilter':
          this.tableDataTotal.setFilterModel(ele)
          break
        case 'jumpToRow':
          this.rowPosition = this.tableDataTotal.jumpToRow(ele)
          break
        case 'jumpToCol':
          this.colPosition = this.tableDataTotal.jumpToCol(ele)
          break
        case 'theme':
          this.SET_THEME(ele)
          break
        case 'pageSize':
          this.SET_PAGE_SIZE(ele)
          break
        case 'maxSelectedRows':
          this.SET_MAX_SELECTED_ROWS(ele)
          break
        case 'maxExportRows':
          this.SET_MAX_EXPORT_ROWS(ele)
          break
        case 'openCloEllipsis':
          this.SET_OPEN_CLO_ELLIPSIS(ele)
          break
        case 'showFirstColumn':
          this.SET_SHOW_FIRST_COLUMN(ele)
          break
        case 'showCalcBottomRow':
          this.SET_SHOW_CALC_BOTTOM_ROW(ele)
          break
        case 'filterEventClearSelected':
          this.SET_FILTER_EVENT_CLEAR_SELECTED(ele)
          break
      }
    }
  }
}
</script>

<style lang="scss">
// 单元格可复制
.ag-unselectable {
  user-select: initial !important;
  -moz-user-select: text;
  -ms-user-select: text;
  -webkit-user-select: text;
}
</style>
