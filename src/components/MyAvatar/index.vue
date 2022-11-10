<!--
 * @Author: Null
 * @Date: 2022-03-21 16:28:26
 * @Description: 用户头像
-->

<template>
  <el-avatar :size="24" :src="url" />
</template>

<script>
export default {
  name: 'MyAvatar',
  props: {
    url: {
      type: String,
      default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
