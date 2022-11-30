<!--
 * @Author: Null
 * @Date: 2022-11-11 13:41:28
 * @Description: 字段设置
-->
<template>
  <div class="ConfigSet" @click.stop="">
    <FirstTitle title="全局搜索">
      <div slot="content">
        <el-form
          ref="configForm"
          :model="configForm"
          size="mini"
          label-width="150px"
        >
          <el-form-item label="全局搜索">
            <SearchBox
              :loading="searchLoading"
              :search-box-config="{
                placeholder: '请输入搜索数据',
                size: 'mini'
              }"
              @search="searchFun"
            />
          </el-form-item>
          <el-form-item label="复制单元格内容">
            <MyButton size="mini" type="primary" @click.stop="copyContent('123123')">
              复制
            </MyButton>
          </el-form-item>
          <el-form-item label="行跳转" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="列跳转" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
        </el-form>
      </div>
    </FirstTitle>
    <FirstTitle title="全局配置">
      <div slot="left">
        <MyBtnList :btn-list-config="btnListConfig" @clickFun="clickFun" />
      </div>
      <div slot="content">
        <el-form
          ref="configForm"
          :model="configForm"
          size="mini"
          label-width="150px"
        >
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
          <el-form-item label="表格行高" prop="name">
            <el-input v-model="configForm.name" type="number" @change="operation($event, 'pageSize')" />
          </el-form-item>
          <el-form-item label="表格行样式" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="最大被选择行数" prop="name">
            <el-input :value="maxSelectedRows" @change="operation($event, 'maxSelectedRows')" />
          </el-form-item>
          <el-form-item label="最大导入数据条数" prop="name">
            <el-input :value="maxExportRows" @change="operation($event, 'maxExportRows')" />
          </el-form-item>
          <el-form-item label="列省略展开" prop="name">
            <el-switch :value="openCloEllipsis" @change="operation($event, 'openCloEllipsis')" />
          </el-form-item>
          <el-form-item label="显示序列行">
            <el-switch :value="showFirstColumn" @change="operation($event, 'showFirstColumn')" />
          </el-form-item>
          <el-form-item label="显示/隐藏合计行" prop="name">
            <el-switch :value="showCalcBottomRow" @change="operation($event, 'showCalcBottomRow')" />
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
    agTable: {
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
      }
    }
  },
  computed: {
    ...mapState('agGrid/theme', ['theme', 'themeList']),
    ...mapState('agGrid/cellContextMenu', ['openCloEllipsis', 'pageSize', 'maxSelectedRows', 'maxExportRows', 'showFirstColumn', 'showCalcBottomRow'])
  },
  methods: {
    ...mapMutations('agGrid/theme', ['SET_THEME']),
    ...mapMutations('agGrid/cellContextMenu', ['SET_OPEN_CLO_ELLIPSIS', 'SET_PAGE_SIZE', 'SET_MAX_SELECTED_ROWS', 'SET_MAX_EXPORT_ROWS', 'SET_SHOW_FIRST_COLUMN', 'SET_SHOW_CALC_BOTTOM_ROW']),

    // 搜索
    searchFun (ele) {
      console.log('搜索', ele)
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
