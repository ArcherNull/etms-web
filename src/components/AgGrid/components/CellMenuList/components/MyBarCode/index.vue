<!--
 * @Author: Null
 * @Date: 2022-08-18 15:44:43
 * @Description: 条形码组件
-->
<template>
  <div v-loading="refreshLoading" class="MyBarCode borderRed" flex>
    <canvas id="MyBarCode" @click="refreshBarCode()" />
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
export default {
  name: 'MyBarCode',
  data () {
    return {
      refreshLoading: false
    }
  },
  mounted () {
    this.drawMyBarCode()
  },
  methods: {
    drawMyBarCode () {
      JsBarcode('#MyBarCode')
        .options({ font: 'OCR-B' })
        .EAN13('1234567890128', { fontSize: 18, textMargin: 0 })
        .blank(20)
        .EAN5('12345', { height: 85, textPosition: 'top', fontSize: 16, marginTop: 15 })
        .render()
    },

    drawMyBarCode2 () {
      JsBarcode('#MyBarCode')
        .options({ font: 'OCR-B' })
        .EAN13('1234567891019', { fontSize: 18, textMargin: 0 })
        .blank(20)
        .EAN5('54321', { height: 85, textPosition: 'top', fontSize: 16, marginTop: 15 })
        .render()
    },

    // 刷新条形码
    refreshBarCode () {
      console.log('刷新条形码')
      this.refreshLoading = true
      setTimeout(() => {
        this.drawMyBarCode2()
        this.refreshLoading = false
      }, 2500)
    }
  }
}
</script>

<style lang="scss" scoped>
.MyBarCode{
    display: inline-block;
    @extend %card;
}
</style>
