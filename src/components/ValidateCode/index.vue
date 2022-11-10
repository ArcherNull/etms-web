<!--
 * @Author: Null
 * @Date: 2021-11-09 20:10:24
 * @Description: 验证码组件
-->
<template>
  <div>
    <canvas id="myCanvas" @click="refreshCode" />
  </div>
</template>

<script>
export default {
  name: 'ValidateCode',
  data () {
    return {
      identifyCode: ''
    }
  },
  mounted () {
    this.refreshCode()
  },
  methods: {
    // 刷新验证码
    refreshCode () {
      const that = this
      that.$commJs.identicalCode(4).then((res) => {
        that.$emit('getValidateCode', res)
        that.$commJs.canvasCode('myCanvas', res)
      })
    },
    // 验证密码，是否正确
    confirm () {
      if (this.codeShow) {
        this.$commJs
          .validate(this.inputVal, this.validateCode)
          .then((res) => {
            if (res) {
              this.$msg.success('验证成功！')
              this.codeShow = false
            }
          })
          .catch(() => {
            this.refreshCode()
            this.inputVal = ''
            this.$msg.error('验证错误！')
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#myCanvas {
  width: 5.625rem;
  height: 2.375rem;
}
</style>
