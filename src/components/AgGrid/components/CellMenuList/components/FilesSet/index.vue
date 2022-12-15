<!--
 * @Author: Null
 * @Date: 2022-11-11 13:41:28
 * @Description: 字段设置
-->
<template>
  <div class="FilesSet">
    <FirstTitle title="导入">
      <div slot="content">
        <MyBtnList :btn-list-config="importBtnConfig" @clickFun="clickFun" />
      </div>
    </FirstTitle>
    <FirstTitle title="导出">
      <div slot="content">
        <MyBtnList :btn-list-config="exportBtnConfig" @clickFun="clickFun" />
      </div>
    </FirstTitle>
    <FirstTitle title="辅助工具">
      <div slot="content">
        <MyBtnList :btn-list-config="toolBtnConfig" @clickFun="clickFun" />
      </div>
    </FirstTitle>

    <!-- 导入解析 -->
    <MyDialog :visible.sync="openParseFile" title="导入解析" :width="dialogWidth">
      <div slot="content">
        <ImportFile />
      </div>
      <div slot="footer">
        <MyButton @click.stop="openParseFile = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 导出 -->
    <MyDialog :visible.sync="openExport" title="导出" :width="dialogWidth">
      <div slot="content">
        <ExportFile ref="exportFile" />
      </div>
      <div slot="footer">
        <MyButton @click.stop="openExport = false">取消</MyButton>
        <MyButton type="primary" @click.stop="exportFilesFun">导出</MyButton>
      </div>
    </MyDialog>

    <!-- 图片剪裁 -->
    <MyDialog :visible.sync="cropperModel" title="图片剪裁" :width="dialogWidth">
      <div slot="content">
        <SecondTitle title="本地文件">
          <MyCropperUpLoad slot="content" />
        </SecondTitle>
      </div>
      <div slot="footer">
        <MyButton @click.stop="cropperModel = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 格式转化 -->
    <MyDialog :visible.sync="convertFormat" title="格式转化" :width="dialogWidth">
      <div slot="content">
        <ConvertFormat ref="convertFormat" />
      </div>
      <div slot="footer">
        <MyButton @click.stop="convertFormat = false">取消</MyButton>
        <MyButton type="primary" @click.stop="convertFormatFun">输出</MyButton>
      </div>
    </MyDialog>

    <!-- 线上预览 -->
    <MyDialog :visible.sync="previewOnline" title="线上预览" :width="dialogWidth">
      <div slot="content">线上预览</div>
      <div slot="footer">
        <MyButton @click.stop="previewOnline = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 数据加密 -->
    <MyDialog :visible.sync="dataEncryption" title="数据加密" :width="dialogWidth">
      <div slot="content">
        <DataEncryption ref="dataEncryption" />
      </div>
      <div slot="footer">
        <MyButton @click.stop="dataEncryption = false">取消</MyButton>
        <MyButton type="primary" @click.stop="submitDataEncryption">生成</MyButton>
      </div>
    </MyDialog>
  </div>
</template>

<script>
export default {
  name: 'FilesSet',
  components: {
    FirstTitle: () => import('../FirstTitle/index.vue'),
    SecondTitle: () => import('../SecondTitle/index.vue'),
    MyButton: () => import('../MyButton/index.vue'),
    MyBtnList: () => import('../MyBtnList/index.vue'),
    MyDialog: () => import('../MyDialog/index.vue'),
    ExportFile: () => import('./components/ExportFile/index.vue'),
    ImportFile: () => import('./components/ImportFile/index.vue'),
    DataEncryption: () => import('./components/DataEncryption/index.vue'),
    ConvertFormat: () => import('./components/ConvertFormat/index.vue'),
    MyCropperUpLoad: () => import('./components/MyCropperUpLoad/index.vue')
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
      dialogWidth: '850px',
      parseExcelModel: 'frontParseExcel',
      importBtnConfig: {
        config: {
          size: 'mini'
        },
        schemas: [
          {
            type: 'primary',
            btnText: '导入解析'
          }
        ]
      },
      exportBtnConfig: {
        config: {
          size: 'mini'
        },
        schemas: [
          {
            type: 'primary',
            btnText: '快捷导出xlsx',
            title: '快捷导出.xlsx文件'
          },
          {
            type: 'primary',
            btnText: '快捷导出csv',
            title: '快捷导出【选中数据】.csv文件'
          },
          {
            type: 'primary',
            btnText: '自定义导出'
          }
        ]
      },
      toolBtnConfig: {
        config: {
          size: 'mini'
        },
        schemas: [
          {
            type: 'primary',
            btnText: '图片剪裁'
          },
          {
            type: 'primary',
            btnText: '格式转化'
          },
          {
            type: 'primary',
            btnText: '线上预览'
          },
          {
            type: 'primary',
            btnText: '数据加密'
          }
        ]
      },
      cropperModel: false, // 图片剪裁
      openParseFile: false, // 导入解析弹窗
      openExport: false, // 导出
      convertFormat: false, // 格式转换弹窗
      previewOnline: false, // 线上预览弹窗
      dataEncryption: false // 数据加密弹窗
    }
  },
  methods: {
    clickFun (data) {
      console.log('item', data)
      const { item } = data
      item.loading = true
      switch (item.btnText) {
        case '导入解析':
          console.log('导入解析')
          this.openParseFile = true
          break
        case '自定义导出':
          console.log('自定义导出')
          this.openExport = true
          break
        case '快捷导出xlsx':
          console.log('快捷导出xlsx')
          this.tableDataTotal.exportExcelFun()
          break
        case '快捷导出csv':
          console.log('快捷导出csv')
          this.tableDataTotal.exportDataAsCsv({
            fileName: '表数据',
            onlySelectedAllPages: true, // 导出选中的行数据，并包含其它页的数据
            skipPinnedBottom: false // 跳过固定在底部的数据
          })
          break
        case '后端导出':
          console.log('后端导出')
          this.openEndExport = true
          break
        case '图片剪裁':
          console.log('图片剪裁')
          this.cropperModel = true
          break
        case '格式转化':
          console.log('格式转化')
          this.convertFormat = true
          break
        case '线上预览':
          console.log('线上预览')
          this.previewOnline = true
          break
        case '数据加密':
          console.log('数据加密')
          this.dataEncryption = true
          break
        default:
          console.log('无效点击')
          break
      }
      setTimeout(() => {
        item.loading = false
      }, 2000)
    },
    // 导出
    exportFilesFun () {
      console.log('导出')
      this.$refs.exportFile.onSubmit()
    },
    // 格式转换输出
    convertFormatFun () {
      console.log('格式转换输出')
      this.$refs.convertFormat.onSubmit()
    },
    // 数据加密表单提交
    submitDataEncryption () {
      console.log('数据加密表单提交')
      this.$refs.dataEncryption.onSubmit()
    }
  }
}
</script>

<style lang="scss" scoped>
.parseExcelModel {
  margin-bottom: 10px;
}
</style>
