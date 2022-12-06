<!--
 * @Author: Null
 * @Date: 2022-04-09 16:19:46
 * @Description:
-->
<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <FormItem
        v-for="(formItem , index) in FormItemConfig"
        :key="index"
        :form-item="formItem"
        @changeInput="changeInput"
      />
    </el-form>

    <el-button type="primary" @click="submitFun">提交</el-button>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import * as total from './tree.js'
import { billingRules } from './tree.js'
export default {
  name: 'TaskTable',
  components: {
    FormItem: () => import('./components/FormItem.vue')
  },
  data () {
    return {
      FormItemConfig: [],
      billingRules,
      ruleForm: {},
      rules: {}
    }
  },
  created () {
    console.log('billingRules=====>', billingRules)
    this.FormItemConfig = [billingRules]
  },
  methods: {
    // 改变change事件
    changeInput (item) {
      console.log('该改变change事件表', item)
      const { name, formItem } = item
      const module = total[name]
      if (module) {
        this.FormItemConfig.push(cloneDeep(module))
        this.$set(this.ruleForm, formItem.field, name)
        console.log('submitForm', this.ruleForm)
        this.$refs['ruleForm'].validate()
      } else {
        this.$message.warning(`不存在${name}模块，请检查！`)
      }
    },
    // 提交
    submitFun () {
      console.log('提交')
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log('submitForm', this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
