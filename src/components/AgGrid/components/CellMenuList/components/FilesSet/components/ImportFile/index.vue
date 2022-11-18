<!--
 * @Author: Null
 * @Date: 2022-11-14 20:11:20
 * @Description: 导入文件
-->
<template>
  <div class="ImportFile">
    <el-form label-width="100px">
      <el-form-item label="导入解析方式">
        <el-radio-group v-model="parseExcelModel">
          <el-radio label="frontParseExcel">前端导入解析</el-radio>
          <el-radio label="endParseExcel">后端导入解析</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <ParsingExcel />
  </div>
</template>

<script>
export default {
  name: 'ImportFile',
  components: {
    ParsingExcel: () => import('../../../ParsingExcel/index.vue')
  },
  data () {
    return {
      parseExcelModel: 'frontParseExcel'

    }
  }
}
</script>

