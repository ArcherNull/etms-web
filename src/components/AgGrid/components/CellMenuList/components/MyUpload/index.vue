<!--
 * @Author: Null
 * @Date: 2022-11-29 16:19:56
 * @Description:
-->
<template>
  <div class="MyUpload">
    <el-upload
      class="MyUpload-up"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <MyButton type="primary">点击上传</MyButton>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'MyUpload',
  components: {
    MyButton: () => import('../MyButton/index.vue')
  }
}
</script>

<style lang="scss" scoped>

</style>
