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
    <MyDialog
      :visible.sync="openParseFile"
      title="导入解析"
      width="850px"
    >
      <div slot="content">
        <ImportFile />
      </div>
      <div slot="footer">
        <MyButton @click.stop="openParseFile = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 导出 -->
    <MyDialog :visible.sync="openExport" title="导出" width="850px">
      <div slot="content">
        <ExportFile />
      </div>
      <div slot="footer">
        <MyButton @click.stop="openExport = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 图片剪裁 -->
    <MyDialog :visible.sync="cropperModel" title="图片剪裁" width="850px">
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
    <MyDialog :visible.sync="convertFormat" title="格式转化" width="850px">
      <div slot="content">
        格式转化
      </div>
      <div slot="footer">
        <MyButton @click.stop="convertFormat = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 线上预览 -->
    <MyDialog :visible.sync="previewOnline" title="线上预览" width="850px">
      <div slot="content">
        线上预览
      </div>
      <div slot="footer">
        <MyButton @click.stop="previewOnline = false">取消</MyButton>
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

    MyCropperUpLoad: () => import('./components/MyCropperUpLoad/index.vue')
  },
  data () {
    return {
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
            btnText: '导出'
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
          },
          {
            type: 'primary',
            btnText: '随机字符串'
          }
        ]
      },
      cropperModel: false,
      openParseFile: false,
      openExport: false,
      convertFormat: false,
      previewOnline: false
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
        case '导出':
          console.log('导出')
          this.openExport = true
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
          break
        case '随机字符串':
          console.log('随机字符串')
          break
        default:
          console.log('无效点击')
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
.parseExcelModel{
  margin-bottom: 10px;
}
</style>
