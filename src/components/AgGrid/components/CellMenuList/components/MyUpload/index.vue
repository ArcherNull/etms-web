<!--
 * @Author: Null
 * @Date: 2022-11-29 16:19:56
 * @Description:
-->
<template>
  <div class="MyUpload">
    <el-upload
      v-bind="customizedAttrs"
      v-on="$listeners"
    >
      <MyButton :disabled="!customizedAttrs.accept" type="primary">点击上传</MyButton>
      <div slot="tip" class="el-upload__tip">能上传{{ customizedAttrs.accept || '所有类型' }}文件，且不超过{{ customizedAttrs.limitSize }}M</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'MyUpload',
  components: {
    MyButton: () => import('../MyButton/index.vue')
  },
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    customizedAttrs () {
      const that = this
      const obj = {
        // accept: '*', // 接受上传的文件类型
        multiple: true, // 是否开启多传
        limit: 1, // 图片上传最大数量
        limitSize: 1, // 最大上传尺寸，单位M
        autoUpload: false, // 是否在选取文件后立即进行上传
        action: 'https://jsonplaceholder.typicode.com/posts/', // 上传路径
        disabled: false, // 是否禁用
        onPreview: that.onPreview,
        onRemove: that.onRemove,
        beforeRemove: that.beforeRemove,
        onExceed: that.onExceed,
        onChange: that.onChange
      }

      return Object.assign(obj, this.$attrs)
    }
  },
  methods: {
    onChange (file, fileList) {
      console.log('onChange=====>', file, fileList)
    },
    onRemove (file, fileList) {
      console.log('onRemove=====>', file, fileList)
    },
    onPreview (file) {
      console.log('onPreview=====>', file)
    },
    onExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.customizedAttrs.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
