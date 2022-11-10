<!--
 * @Author: Null
 * @Date: 2022-03-25 14:46:30
 * @Description: 安全校验按钮
-->

<template>
  <div class="SafetyVerifyButton">
    <MyButton
      :loading="safetyVerifyLoading"
      :icon="safetyVerifyIcon"
      @click="safetyVerifyFun"
    >{{ safetyVerifyBtnText }}</MyButton>

    <!-- 登录表单校验 -->
    <MyDialog
      :visible="safetyVerifyLoading && safetyVerifyType === 'loginForm'"
      width="400px"
      title="登陆密码校验"
      @close="safetyVerifyLoading = false"
    >
      <LoginForm slot="content" :safety-verify-fun="testVerifyFun" />
    </MyDialog>

    <!-- 手机号验证码登录校验 -->
    <MyDialog
      :visible="safetyVerifyLoading && safetyVerifyType === 'loginPhone'"
      width="400px"
      title="手机号验证码登录校验"
      @close="safetyVerifyLoading = false"
    >
      <LoginPhone slot="content" :safety-verify-fun="testVerifyFun" />
    </MyDialog>

    <!-- 二维码登录校验 -->
    <MyDialog
      :visible="safetyVerifyLoading && safetyVerifyType === 'qrCodeLogin'"
      width="400px"
      title="二维码登录校验"
      @close="safetyVerifyLoading = false"
    >
      <QrCodeLogin slot="content" :safety-verify-fun="testVerifyFun" />
    </MyDialog>
  </div>
</template>
<script>
import MyButton from '@/components/MyButton/index.vue'
export default {
  name: 'SafetyVerifyButton',
  components: {
    MyButton,
    LoginForm: () => import('@/views/system/login/components/LoginForm.vue'),
    LoginPhone: () => import('@/views/system/login/components/LoginPhone.vue'),
    QrCodeLogin: () => import('@/views/system/login/components/QrCodeLogin.vue')
  },
  props: {
    // 验证成功或失败的回调函数，回传的是安全校验结果safetyVerifyResult 值为 fail 或 success
    callback: {
      type: Function,
      default: () => {}
    },
    // 校验按钮类型 loginForm 表示使用登录账号密码实现；loginPhone 表示使用手机号验证码验证； qrCodeLogin 表示使用二维码登录验证
    safetyVerifyType: {
      type: String,
      default: 'loginPhone'
    },
    // 按钮名称
    btnText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 安全校验状态 fail,表示校验失败 ； success 表示校验成功； verify 表示需要校验，但未执行校验
      safetyVerifyState: 'verify',
      // 安全校验loading
      safetyVerifyLoading: false,
      // 安全校验结果 success / fail
      safetyVerifyResult: 'fail',
      // 安全校验超时时间 5s
      safetyVerifyTimeOut: 5000,
      // 安全按钮失效检验时间 15min
      safetyVerifyOutOfDateTime: 1000 * 60 * 15,
      // 安全校验按钮定时器
      safetyVerifyInterval: null
    }
  },
  computed: {
    safetyVerifyIcon () {
      const safetyVerifyState = this.safetyVerifyState
      return safetyVerifyState === 'success'
        ? 'el-icon-unlock'
        : safetyVerifyState === 'verify'
          ? 'el-icon-lock'
          : 'el-icon-error'
    },
    safetyVerifyBtnText () {
      if (this.btnText) {
        return this.btnText
      } else {
        return '安全校验'
      }
    }
  },
  methods: {
    safetyVerifyFun () {
      this.safetyVerifyLoading = true
      console.log('安全性校验打开')
      // setTimeout(() => {
      //   this.safetyVerifyLoading = false
      // }, 2000)
    },
    // 测试用
    testVerifyFun (callback) {
      const bool = callback()
      console.log('bool ===>', bool)
      if (bool) {
        this.safetyVerifyState = 'success'
        this.safetyVerifyLoading = false
      } else {
        this.safetyVerifyState = 'success'
        this.safetyVerifyLoading = false
      }
    }
    // 校验按钮校验状态

  }
}
</script>

<style lang="scss" scoped>
.SafetyVerifyButton {
}
</style>
