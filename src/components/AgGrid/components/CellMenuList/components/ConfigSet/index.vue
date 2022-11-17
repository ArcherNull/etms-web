<!--
 * @Author: Null
 * @Date: 2022-11-11 13:41:28
 * @Description: 字段设置
-->
<template>
  <div class="ConfigSet">
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
          <el-form-item label="表格主题" prop="name">
            <el-select v-model="configForm.name" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
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
export default {
  name: 'ConfigSet',
  components: {
    FirstTitle: () => import('../FirstTitle/index.vue'),
    SearchBox: () => import('../SearchBox/index.vue'),
    MyBtnList: () => import('../MyBtnList/index.vue')
  },
  data () {
    return {
      options: [],
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
</style>
