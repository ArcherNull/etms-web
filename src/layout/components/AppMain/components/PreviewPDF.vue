<!--
 * @Author: Null
 * @Date: 2022-01-19 10:20:28
 * @Description: 预览PDF弹窗
-->
<template>
  <el-dialog
    title="PEF文件预览"
    :visible="previewPDFUrl !== ''"
    width="70%"
    :before-close="operation"
    :modal-append-to-body="true"
  >
    <div>
      <iframe name="previewPDFFrame" />
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PreviewPDF',
  computed: {
    ...mapState('form', ['previewPDFUrl'])
  },
  watch: {
    previewPDFUrl: function (newVal) {
      if (newVal) {
        console.log('获取到预览PDF文件的链接URL', newVal)
        //
        setTimeout(() => {
          this.loadPDF(newVal)
        })
      }
    }
  },
  methods: {
    operation () {
      this.$store.commit('form/SET_PREVIEW_PDF_URL', '')
    },
    // 加载PDF
    loadPDF (url) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('target', 'previewPDFFrame') // 自定义下载文件名（如exemple.txt）
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(link.href) // 释放url
      document.body.removeChild(link) // 清除残留的文档片段<a></a>
    }
  }
}
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 70vh;
}
</style>
