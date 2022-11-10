<!--
 * @Author: Null
 * @Date: 2022-04-02 14:12:08
 * @Description: 解析Qrcode二维码插件
-->
<template>
  <div class="MyQrcodeDecode">
    <input id="file" type="file" accept="image/*">
    <el-button @click="getFileInfo">
      获取图片信息
    </el-button>
  </div>
</template>

<script>
import qrcodeParser from 'qrcode-parser'
export default {
  name: 'MyQrcodeDecode',
  methods: {
    getFileInfo () {
      const file = document.getElementById('file').files[0]
      this.decodeQrcode(file)
    },
    // 解析二维码
    decodeQrcode (file) {
      const getObjectURL = this.$commJs.getObjectURL
      qrcodeParser(getObjectURL(file)).then(res => {
        console.log('二维码信息为：', res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.MyQrcodeDecode{
  padding: 20px;
  @extend %card;
}
</style>
