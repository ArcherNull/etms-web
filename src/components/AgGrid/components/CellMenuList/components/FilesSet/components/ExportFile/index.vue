<!--
 * @Author: Null
 * @Date: 2022-11-14 20:11:20
 * @Description: 导出文件
-->
<template>
  <div class="ExportFile">
    <el-form label-width="100px">
      <el-form-item label="导出方式">
        <el-radio-group v-model="exportMode">
          <el-radio label="frontExport">前端导出</el-radio>
          <el-radio label="endExport">后端导出</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'ExportFile',
  data () {
    return {
      exportMode: 'frontExport'
    }
  }
}
</script>
