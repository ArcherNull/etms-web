<!--
 * @Author: Null
 * @Date: 2022-06-28 15:19:04
 * @Description: 解析excel组件
-->

<template>
  <div class="ParsingExcel" @click.stop="">
    <input
      ref="excel-upload-input"
      class="ParsingExcel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    >
    <div
      class="ParsingExcel-upload-drop"
      flex="main:center cross:center"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      请拖拽Excel文件到这，或者
      <MyButton
        :loading="loading"
        class="dk-ml-10"
        type="primary"
        @click="handleUpload"
      >
        点击上传
      </MyButton>
    </div>

    <MyDialog
      width="90%"
      :visible="dialogVisible"
      @close="dialogVisible = false"
    >
      <div slot="title">
        {{ myDialogTitle }}
        <span class="dk-content">
          文件名:<span class="excelFileColor">{{ excelFileName }}</span>; 文件大小:<span class="excelFileColor">{{ excelFileSize }}</span>
        </span>
      </div>
      <div slot="content" class="scroll-div-box1">
        <AgGrid :show-cell-menu-list="false" :ag-table-options="agTableOptions" @getGridApi="getGridApi" />
      </div>
      <div slot="footer">
        <MyButton @click="dialogVisible = false">取 消</MyButton>
        <MyButton type="primary" @click="dialogVisible = false">确 定</MyButton>
      </div>
    </MyDialog>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { AgGridUtils, InitColumnDefs } from '@/components/AgGrid/common/agGrid-utils'

export default {
  name: 'ParsingExcel',
  components: {
    MyButton: () => import('../MyButton/index.vue'),
    MyDialog: () => import('../MyDialog/index.vue'),
    AgGrid: () => import('../../../../index.vue')
  },
  props: {
    // excel文件上传大小限制, 默认限制 10M以内
    excelLimitSize: {
      type: Number,
      default: 50
    }
    // beforeUpload: Function, // eslint-disable-line
    // onSuccess: Function // eslint-disable-line

  },
  data () {
    return {
      agTableOptions: {
        columnDefs: [],
        rowData: []
      },
      agTable: null,
      // 上传按钮loading
      loading: false,
      // 展示解析excel好的table数据弹窗
      dialogVisible: false,
      // 解析excel成功并导出的数据
      excelData: {
        header: null,
        results: null
      },
      // 解析前时间
      parsingExcelStartTime: '',
      // 解析弹窗标题
      myDialogTitle: '解析Excel数据预览',
      // 解析excel文件名
      excelFileName: '',
      // 解析excel文件大小
      excelFileSize: ''
    }
  },
  methods: {
    getGridApi (api) {
      const agTable = new AgGridUtils(api)
      this.agTable = agTable
    },
    // 上传前统一文件约束
    beforeUpload (file) {
      const name = file.name
      const sizeToM = file.size / 1024 / 1024
      const convertM = `${sizeToM.toFixed(2)}M`

      const alertMsg = (message, type = 'info') => {
        this.$message({
          message,
          type,
          showClose: true,
          duration: 5000
        })
      }

      this.excelFileName = name
      this.excelFileSize = convertM

      const isOverLimitSize = sizeToM < this.excelLimitSize

      if (isOverLimitSize) {
        if (sizeToM > 0 && sizeToM <= 5) {
          alertMsg(`解析文件名：${name}文件，大小${convertM}，需等待1~2分钟！`)
          return true
        } else if (sizeToM > 5 && sizeToM <= 20) {
          alertMsg(`解析文件名：${name}文件，大小${convertM}，需等待2~6分钟！`)
          return true
        } else if (sizeToM > 20 && sizeToM <= 50) {
          alertMsg(`解析文件名：${name}文件，大小${convertM}，需等待6~10分钟！`)
          return true
        } else {
          alertMsg(`解析文件名：${name}文件，大小${convertM}，超出解析承受范围！`, 'warning')
          return false
        }
      } else {
        alertMsg(`解析文件名：${name}文件，大小${convertM}M,不超出限制${this.excelLimitSize}M`, 'warning')
        return false
      }
    },
    onSuccess ({ results, header }) {
      console.log('results', results)
      console.log('header', header)

      const database = {}

      for (let i = 0; i < header.length; i++) {
        database[header[i]] = header[i]
      }

      const columnDefs = new InitColumnDefs({
        showFirstColumn: true,
        database
      })

      this.agTableOptions.columnDefs = columnDefs
      this.agTableOptions.rowData = results
      // 解析后时间
      this.diffStartTimeToEndTime()
      this.dialogVisible = true
    },
    // 计算解析前时间和解析后时间的差值
    diffStartTimeToEndTime () {
      const parsingExcelEndTime = this.$dayjs()
      const diffTime = parsingExcelEndTime.to(this.parsingExcelStartTime)
      console.log('diffTime=======>', diffTime)
    },

    // 解析完wxcel ,生成最终可用的数据
    generateData ({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    // 拖拽事件
    handleDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('仅支持上传1个文件！')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('仅支持后缀名为.xlsx, .xls, .csv格式的Excel文件')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    // 拖拽上传文件
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    // 选择上传文件事件
    handleUpload () {
      this.$nextTick(() => {
        this.$refs['excel-upload-input']?.click()
      })
    },
    // 获取到文件时，触发
    handleClick (e) {
      console.log('获取到文件时，触发======>', e)
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    // 上传文件
    upload (rawFile) {
      this.$nextTick(() => {
        this.$refs['excel-upload-input'].value = null // fix can't select the same excel
        if (!this.beforeUpload) {
          this.readerData(rawFile)
          return
        }
        const before = this.beforeUpload(rawFile)
        if (before) {
          this.getExcelFileInfo(rawFile)
        }
      })
    },
    // 展示阅读excel文件信息，并提示用户的解析时间
    getExcelFileInfo (rawFile) {
      console.log('rawFile========>', rawFile)
      this.parsingExcelStartTime = this.$dayjs()
      console.log('parsingExcelStartTime', this.parsingExcelStartTime)
      this.readerData(rawFile)
    },
    // 读取文件数据
    readerData (rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve(true)
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    // 获取列头行数据
    getHeaderRow (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    // 判断是否是excel类型的文件
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped lang="scss">
.ParsingExcel-upload {
  &-input {
    display: none;
    z-index: -9999;
  }
  &-drop {
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }
}
.excelFileColor {
  color: $color-primary;
}
</style>
