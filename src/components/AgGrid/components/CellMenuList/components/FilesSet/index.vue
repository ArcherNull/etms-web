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

    <!-- 前端导入解析 -->
    <MyDialog
      :visible.sync="openFrontParseFile"
      title="前端导入解析"
      width="850px"
    >
      <div slot="content"><ParsingExcel /></div>
      <div slot="footer">
        <MyButton @click.stop="openFrontParseFile = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 后端导入解析 -->
    <MyDialog
      :visible.sync="openEndParseFile"
      title="后端导入解析"
      width="850px"
    >
      <div slot="content">后端导入解析</div>
      <div slot="footer">
        <MyButton @click.stop="openEndParseFile = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 前端导出 -->
    <MyDialog :visible.sync="openFrontExport" title="前端导出" width="850px">
      <div slot="content">前端导出</div>
      <div slot="footer">
        <MyButton @click.stop="openFrontExport = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 后端导出 -->
    <MyDialog :visible.sync="openEndExport" title="后端导出" width="850px">
      <div slot="content">后端导出</div>
      <div slot="footer">
        <MyButton @click.stop="openEndExport = false">取消</MyButton>
      </div>
    </MyDialog>

    <!-- 图片剪裁 -->
    <MyDialog :visible.sync="cropperModel" title="图片剪裁" width="850px">
      <div slot="content">
        <SecondTitle title="本地文件">
          <MyCropperUpLoad slot="content" />
        </SecondTitle>
        <SecondTitle title="表格文件">
          <MyCropperUpLoad slot="content" />
        </SecondTitle>
      </div>
      <div slot="footer">
        <MyButton @click.stop="cropperModel = false">取消</MyButton>
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
    ParsingExcel: () => import('../ParsingExcel/index.vue'),
    MyButton: () => import('../MyButton/index.vue'),
    MyBtnList: () => import('../MyBtnList/index.vue'),
    MyDialog: () => import('../MyDialog/index.vue'),
    MyCropperUpLoad: () => import('./components/MyCropperUpLoad/index.vue')
  },
  data () {
    return {
      importBtnConfig: {
        config: {
          size: 'mini'
        },
        schemas: [
          {
            type: 'primary',
            btnText: '前端导入解析'
          },
          {
            type: 'primary',
            btnText: '后端导入解析'
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
            btnText: '前端导出'
          },
          {
            type: 'primary',
            btnText: '后端导出'
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
          }
        ]
      },
      cropperModel: false,
      openFrontParseFile: false,
      openEndParseFile: false,
      openFrontExport: false,
      openEndExport: false
    }
  },
  methods: {
    clickFun (data) {
      console.log('item', data)
      const { item } = data
      item.loading = true
      switch (item.btnText) {
        case '前端导入解析':
          console.log('前端导入解析')
          this.openFrontParseFile = true
          break
        case '后端导入解析':
          console.log('后端导入解析')
          this.openEndParseFile = true
          break
        case '前端导出':
          console.log('前端导出')
          this.openFrontExport = true
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
          break
        case '线上预览':
          console.log('线上预览')
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
