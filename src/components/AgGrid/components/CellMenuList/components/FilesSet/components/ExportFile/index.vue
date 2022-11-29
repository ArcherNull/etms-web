<!--
 * @Author: Null
 * @Date: 2022-11-14 20:11:20
 * @Description: 导出文件
-->
<template>
  <div class="ExportFile">
    <el-form ref="exportForm" label-width="135px" :rules="exportFormRules" :model="exportForm">
      <el-form-item label="导出方式" prop="exportMode">
        <el-radio-group v-model="exportForm.exportMode" @change="changeExportMode">
          <el-radio label="frontExport">前端导出</el-radio>
          <el-radio label="endExport">后端导出</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前表" prop="currentTable">
        {{ exportForm.currentTable }}
      </el-form-item>
      <div v-if="exportForm.exportMode ==='frontExport' ">
        <el-form-item label="选中数据" prop="selectedRowData">
          {{ exportForm.selectedRowData }}
        </el-form-item>
      </div>

      <div v-else>
        <el-form-item label="导出数据时间段" prop="timerRange">
          <el-date-picker
            v-model="exportForm.timerRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </div>

      <el-form-item label="导出文件格式" prop="exportFileFormat">
        <el-select v-model="exportForm.exportFileFormat" placeholder="请选择">
          <el-option
            v-for="item in exportFileFormatOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'ExportFile',
  data () {
    return {

      exportFileFormatOptions: [
        {
          value: 'xlsx',
          label: '导出XLSX'
        },
        {
          value: 'csv',
          label: '导出CSV'
        },
        {
          value: 'pdf',
          label: '导出PDF'
        },
        {
          value: 'txt',
          label: '导出TXT'
        }
      ],
      exportForm: {
        exportMode: 'frontExport',
        currentTable: 'table1',
        selectedRowData: [],
        exportFileFormat: 'xlsx',
        timerRange: []
      },
      exportFormRules: {
        exportMode: [
          { required: true, message: '请选择导出方式', trigger: ['blur', 'change'] }
        ],
        currentTable: [
          { required: true, message: '请选中当前表名', trigger: ['blur', 'change'] }
        ],
        selectedRowData: [
          { required: true, type: 'array', message: '请先选中数据', trigger: ['blur', 'change'] }
        ],
        exportFileFormat: [
          { required: true, message: '请选择导出文件格式', trigger: ['blur', 'change'] }
        ],
        timerRange: [
          { required: true, message: '请选择导出数据时间段', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 导出
    onSubmit () {
      console.log('导出')
      this.$refs.exportForm.validate(valid => {
        if (valid) {
          console.log('this.exportForm=====>', this.exportForm)
        }
      })
    },
    // 改变导出方式
    changeExportMode (ele) {
      console.log('改变导出方式', ele)
      this.$refs.exportForm.clearValidate()
    }
  }
}
</script>
