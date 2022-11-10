<!--
 * @Author: Null
 * @Date: 2022-02-16 14:24:19
 * @Description: logo图片
-->
<template>
  <router-link key="collapse" to="/">
    <el-image
      class="siderbar-logo-img"
      :src="imgUrl"
      fit="fill"
      alt="logo"
    >
      <!-- 自定义图片加载失败触发 -->
      <div slot="error" :style="{ height: height }" class="image-slot" flex="main:center cross:center">
        <i class="el-icon-picture-outline" />
      </div>
    </el-image>
  </router-link>
</template>

<script>
export default {
  name: 'LogoImg',
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '50px'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
