<!--
 * @Author: Null
 * @Date: 2022-11-29 14:14:02
 * @Description: 格式转化工具
-->
<template>
  <div class="ConvertFormat">
    <el-form
      ref="conFormatForm"
      label-width="105px"
      :rules="conFormatFormRules"
      :model="conFormatForm"
    >
      <el-form-item label="转换方式" prop="convertMode">
        <el-radio-group v-model="conFormatForm.convertMode" @change="changeConvertMode">
          <el-radio label="frontConvert">前端转换</el-radio>
          <el-radio label="endConvert">后端转换</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文件类别" prop="fileClassify">
        <el-select
          v-model="conFormatForm.fileClassify"
          placeholder="请选择文件类别"
          clearable
          @change="changeFileClassify"
        >
          <el-option
            v-for="item in fileClassifyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="conFormatForm.fileClassify !=='content'" label="文件" prop="file">
        <MyUpload :accept="acceptType" :disabled="!acceptType" :file-list="fileList" />
      </el-form-item>

      <el-form-item v-else label="文件内容" prop="content">
        <el-input
          v-model="conFormatForm.content"
          maxlength="500"
          :rows="4"
          show-word-limit
          type="textarea"
          placeholder="请输入文件内容"
          clearable
        />
      </el-form-item>

      <el-form-item label="输出格式" prop="exportFormat">
        <el-select
          v-model="conFormatForm.exportFormat"
          placeholder="请选择输出格式"
          clearable
          @change="changeExportFormat"
        >
          <el-option
            v-for="item in exportFormatList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="输出方式" prop="exportMode">
        <el-radio-group v-model="conFormatForm.exportMode" @change="changeExportMode">
          <el-radio label="autoDownload">自动下载</el-radio>
          <el-radio label="generateLink">生成下载链接</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="输出结果">
        <div v-if="generateResults">{{ generateResults }}</div>
        <div v-else class="dk-danger-text">暂无结果，请点击输出</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ConvertFormat',
  components: {
    MyUpload: () => import('../../../MyUpload/index.vue')
  },
  data () {
    return {
      generateResults: '',
      conFormatForm: {
        convertMode: 'frontConvert',
        fileClassify: '',
        file: '',
        content: '',
        exportFormat: '',
        exportMode: 'autoDownload'
      },
      conFormatFormRules: {
        convertMode: [
          {
            required: true,
            message: '请选择转换方式',
            trigger: ['change']
          }
        ],
        fileClassify: [
          {
            required: true,
            message: '请选择文件类别',
            trigger: ['blur', 'change']
          }
        ],
        content: [
          {
            required: true,
            message: '请输入内容',
            trigger: ['blur', 'change']
          }
        ],
        file: [
          {
            required: true,
            message: '请选择文件',
            trigger: ['change']
          }
        ],
        exportFormat: [
          {
            required: true,
            message: '请选择输出格式',
            trigger: ['change']
          }
        ],
        exportMode: [
          {
            required: true,
            message: '请选择输出方式',
            trigger: ['blur', 'change']
          }
        ]
      },

      fileClassifyList: [
        {
          label: '图片类',
          value: 'image'
        },
        {
          label: 'EXCEL类',
          value: 'excel'
        },
        {
          label: '文档类',
          value: 'doc'
        },
        {
          label: '内容',
          value: 'content'
        }
      ],
      exportFormatList: [],
      // 文件类型
      fileType: {
        image: {
          importFileType: ['jpg', 'jpeg', 'png'],
          exportFileType: ['jpg', 'jpeg', 'png', 'base64']
        },
        excel: {
          importFileType: ['csv', 'xlsx', 'xls'],
          exportFileType: ['csv', 'xlsx', 'xls']
        },
        doc: {
          importFileType: ['doc', 'text', 'json', 'pdf'],
          exportFileType: ['text', 'pdf']
        },
        content: {
          exportFileType: ['text', 'pdf']
        }
      },
      // 文件列表
      fileList: [],
      acceptType: ''
    }
  },
  methods: {
    // 转换方式更改
    changeConvertMode (ele) {
      console.log('转换方式更改', ele)
    },
    // 转换文件类别
    changeFileClassify (ele) {
      console.log('转换文件类别', ele)
      ele &&
        this.$refs.conFormatForm.clearValidate(
          ele === 'content' ? 'file' : 'content'
        )
      this.refreshExportFormat(ele)
    },
    // 更新输出格式方法
    refreshExportFormat (ele) {
      let selectList = []
      if (ele) {
        const { importFileType, exportFileType } = this.fileType[ele]
        selectList = exportFileType?.map((item) => {
          return {
            label: item,
            disabled: item === ele,
            value: item
          }
        })
        if (importFileType?.length) {
          console.log('importFileType=====>', importFileType)
          this.acceptType = importFileType?.map(ele => '.' + ele).join(',')
        }
      }
      this.exportFormatList = selectList
    },

    // 转换输出格式
    changeExportFormat (ele) {
      console.log('转换输出格式', ele)
    },
    // 转换输出方式
    changeExportMode (ele) {
      console.log('转换输出方式', ele)
    },
    // 表单提交
    onSubmit () {
      this.$refs.conFormatForm.validate((valid) => {
        if (valid) {
          this.generateResults = 'https://www.baidu.com'
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
