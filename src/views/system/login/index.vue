<template>
  <div class="login">
    <vue-particles
      class="login-bg"
      color="#ffffff"
      :particle-opacity="0.65"
      :particles-number="40"
      shape-type="circle"
      :particle-size="7"
      lines-color="#ffffff"
      :lines-width="2"
      :line-linked="true"
      :line-opacity="0.8"
      :lines-distance="200"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />
    <div
      class="login-box"
      flex="dir:top main:justify cross:stretch box:justify"
    >
      <div class="page-login--content-header">
        <p class="page-login--content-header-motto">
          {{ wellknownSaying }}
        </p>
      </div>
      <div
        class="page-login--content-main"
        flex="dir:top main:center cross:center"
      >
        <!-- logo -->
        <img class="page-login--logo" src="./images/logo.png">
        <!-- form -->
        <div class="page-login--form">
          <el-tabs v-model="loginType" @tab-click="handleClick">
            <el-tab-pane label="账号密码登录" name="loginForm">
              <LoginForm v-if="loginType === 'loginForm'" />
            </el-tab-pane>
            <el-tab-pane label="手机号登录" name="loginPhone">
              <LoginPhone v-if="loginType === 'loginPhone'" />
            </el-tab-pane>
            <el-tab-pane label="验证码登录" name="qrCodeLogin">
              <QrCodeLogin v-if="loginType === 'qrCodeLogin'" />
            </el-tab-pane>
          </el-tabs>

          <p class="page-login--options" flex="main:justify cross:center">
            <el-checkbox
              v-show="loginType === 'loginForm'"
              v-model="isRememberPassword"
            >记住密码</el-checkbox>
            <span v-show="loginType === 'loginForm'">忘记密码?</span>
          </p>
          <!-- 开源项目 -->
          <div class="page-login--quick" flex="main:center cross:center">
            <span class="dk-content-12">没有账号？</span>
            <MyButton type="text" @click="dialogVisible = true">
              去注册
            </MyButton>
          </div>
        </div>
      </div>
      <div class="page-login--content-footer">
        <p class="page-login--content-footer-locales">
          <a
            v-for="language in $setting.language"
            :key="language.value"
            @click="onChangeLocale(language.value)"
          >
            {{ language.label }}
          </a>
        </p>
        <p class="page-login--content-footer-copyright">
          Copyright
          <!-- <i class="el-icon-s-promotion" /> -->
          <SvgIcon slot="prepend" name="copyright" />
          2022 Admin Projects 开源组织出品
          <a
            href="#"
            @click="
              $message.danger(
                '由专业的，优秀的，帅气的前端摸鱼攻城狮Null制作而成'
              )
            "
          >
            @Null
          </a>
        </p>
        <p class="page-login--content-footer-options">
          <a
            target="_blank"
            href="https://gitee.com/acher_Saber/dekun_admin#/acher_Saber/dekun_admin/blob/master/README_rules.md"
          >帮助</a>
          <a href="#" @click="$message.warning('没有隐私')">隐私</a>
          <a href="#" @click="$message.warning('条款不配')">条款</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
    QrCodeLogin: () => import('./components/QrCodeLogin.vue'),
    LoginPhone: () => import('./components/LoginPhone.vue')
  },
  data () {
    return {
      loginType: 'loginForm', // 登陆方式，登陆表单-loginForm ; 二维码登录-qrCodeLogin ;
      isRememberPassword: false // 是否记住密码
    }
  },
  computed: {
    wellknownSaying () {
      const { wellKnowSayingList, currentWellKnowSaying, defaultLanguage } =
        this.$setting
      return wellKnowSayingList[currentWellKnowSaying][defaultLanguage]
    }
  },

  methods: {
    // 切换语言
    onChangeLocale (ele) {
      console.log('切换语言', ele)
    },
    loginTabsActive (type = '') {
      return this.loginType === type ? 'primary' : ''
    },
    // 点击tab
    handleClick (ele) {
      console.log('点击tab', ele.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: url('../../../assets/images/login.jpg');
  background: url('./images/login-bg.png') center no-repeat;
  // background: #ffffff;
  background-color: $color-bg;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.login-bg {
  width: 100%;
  height: 100%;
}
.login-box {
  position: absolute;
  left: 50%;
  height: 98vh;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-box-title {
  line-height: 50px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid #ffffff;
}
.login-box-from {
  width: 100%;
  height: auto;
  padding: 30px;
  box-sizing: border-box;
}

// main
.page-login--logo {
  width: 200px;
  margin-bottom: 2em;
  margin-top: -2em;
}

// header
.page-login--content-header {
  padding: 1em 0;
  .page-login--content-header-motto {
    margin: 0px;
    padding: 0px;
    color: $color-text-normal;
    text-align: center;
    font-size: 12px;
  }
}

// 登录表单
.page-login--form {
  width: 350px;
  user-select: none;
  // 登陆选项
  .page-login--options {
    height: 24px;
    font-size: 14px;
    color: $color-primary;
    margin: 10px 0 15px;
  }
  .page-login--quick {
    width: 100%;
  }
  ::v-deep .el-tabs {
    .el-tabs__header {
      margin: 0 0 10px;
      .el-tabs__nav-wrap {
        display: flex;
        align-content: center;
        justify-content: center;
      }
    }
  }
}

// footer
.page-login--content-footer {
  padding: 1em 0;
  .page-login--content-footer-locales {
    padding: 0px;
    margin: 0px;
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: $color-text-normal;
    a {
      color: $color-text-normal;
      margin: 0 0.5em;
      &:hover {
        color: $color-text-main;
      }
    }
  }
  .page-login--content-footer-copyright {
    padding: 0px;
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: $color-text-normal;
    a {
      color: $color-text-normal;
    }
  }
  .page-login--content-footer-options {
    padding: 0px;
    margin: 0px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    a {
      color: $color-text-normal;
      margin: 0 1em;
    }
  }
}
</style>
