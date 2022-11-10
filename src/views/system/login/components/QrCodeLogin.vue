<!--
 * @Author: Null
 * @Date: 2022-05-26 08:59:31
 * @Description:
-->
<template>
  <el-card shadow="never" flex="main:center cross:center">
    <MyQrcode :show-card-bg="false" :qcode-extra-fun-icon="[]" />
  </el-card>
</template>

<script>
export default {
  name: 'QrCodeLogin'
}
</script>

<style lang="scss" scoped></style>
