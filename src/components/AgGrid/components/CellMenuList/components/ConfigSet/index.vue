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
          :rules="configFormRules"
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
          :rules="configFormRules"
          size="mini"
          label-width="150px"
        >
          <el-form-item label="表格主题">
            <el-select :value="theme" placeholder="请选择" @change="changeTheme">
              <el-option
                v-for="(item,index) in themeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="每页条数" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="表格行高" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="表格行样式" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="最大被选择行数" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="最大导入数据条数" prop="name">
            <el-input v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="列省略展开" prop="name">
            <el-switch v-model="configForm.name" />
          </el-form-item>
          <el-form-item label="显示/隐藏合计行" prop="name">
            <el-switch v-model="configForm.name" />
          </el-form-item>
        </el-form>
      </div>
    </FirstTitle>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ConfigSet',
  components: {
    FirstTitle: () => import('../FirstTitle/index.vue'),
    SearchBox: () => import('../SearchBox/index.vue'),
    MyBtnList: () => import('../MyBtnList/index.vue'),
    MyButton: () => import('../MyButton/index.vue')

  },
  data () {
    return {
      theme: '', // 主题名
      themeList: [
        {
          label: 'balham',
          value: 'balham'
        },
        {
          label: 'balham-dark',
          value: 'balham-dark'
        },
        {
          label: 'alpine',
          value: 'alpine'
        },
        {
          label: 'material',
          value: 'material'
        },
        {
          label: 'blue',
          value: 'blue'
        },
        {
          label: 'refresh',
          value: 'refresh'
        },
        {
          label: 'dark',
          value: 'dark'
        }
      ],
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
      configFormRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations('agGrid/theme', ['SET_THEME']),

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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
