<!--
 * @Author: Null
 * @Date: 2022-06-21 10:13:12
 * @Description: 上传组件
-->

<template>
  <div>
    <!-- excels上传 -->
    <ExcelUpload />
    <!-- 图片上传 -->
    <ImageUpload />
    <!-- zip文件上传 -->
    <ZipUpload />
  </div>
</template>

<script>
export default {
  name: 'MyUpload',
  components: {
    ExcelUpload: () => import('./components/ExcelUpload.vue'),
    ImageUpload: () => import('./components/ImageUpload.vue'),
    ZipUpload: () => import('./components/ZipUpload.vue')
  }
}
</script>

<style lang="scss" scoped>

</style>
