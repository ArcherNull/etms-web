<!--
 * @Author: Null
 * @Date: 2022-02-08 08:36:20
 * @Description: 前端错误日志
-->
<template>
  <MyToolTip content="前端错误日志">
    <div class="header-errorLog-container dk-icon-btn" @click="openErrorLog">
      <SvgIcon name="bug" />
    </div>
  </MyToolTip>
</template>

<script>
export default {
  name: 'ErrorLog', // 前端日志
  data () {
    return {}
  },
  methods: {
    openErrorLog () {
      this.$router.push('/errorLog')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-errorLog-container {
  width: $header-icon-btn-width;
  height: 100%;
}
</style>
