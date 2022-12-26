<!--
 * @Author: Null
 * @Date: 2022-05-26 08:59:31
 * @Description: 账号密码登录表单
-->
<template>
  <div class="page-login--form">
    <el-card shadow="never">
      <el-form
        ref="loginForm"
        label-position="top"
        :rules="rules"
        :model="loginForm"
        size="default"
      >
        <el-form-item prop="userLogin">
          <el-input
            v-model="loginForm.userLogin"
            type="text"
            placeholder="请输入用户名"
            name="username"
            clearable
            auto-complete="on"
          >
            <!-- <i slot="prepend" class="el-icon-user-solid" /> -->
            <SvgIcon slot="prepend" name="admin" />
          </el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            v-model="loginForm.userPwd"
            type="password"
            placeholder="请输入密码"
            name="password"
            auto-complete="new-password"
            show-password
            @keyup.enter.native="submit"
          >
            <!-- <i slot="prepend" class="el-icon-key" /> -->
            <SvgIcon slot="prepend" name="key" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" type="text" placeholder="验证码">
            <SvgIcon slot="prepend" name="verify" />
            <template slot="append">
              <div class="login-code">
                <ValidateCode @getValidateCode="validateCode = $event" />
              </div>
            </template>
          </el-input>
        </el-form-item>
        <MyButton
          :loading="loading"
          type="primary"
          class="button-login"
          @click="submit"
        >
          {{ submitBtnText }}
        </MyButton>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { checkPassword, checkUserName } from '@common/rules.js'
import common from '@/common/index'
import util from '@/libs/util'
import setting from '@/setting'

let validateCode

const checkValidateCode = (rules, value, callback) => {
  common.validateFun(value, validateCode).then((res) => {
    if (res) {
      return callback()
    } else {
      return callback('验证码不正确')
    }
  })
}

export default {
  name: 'LoginForm',
  props: {
    // 表单类型， loginForm-用于登录表单 ； safeVerifyForm-用于安全校验表单
    formType: {
      type: String,
      default: 'loginForm'
    },
    // 安全校验函数
    safetyVerifyFun: {
      type: [Function, String],
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      validateCode: '',
      loginForm: {
        // 登陆表单
        userLogin: 'admin',
        userPwd: '123456',
        code: ''
      },
      rules: {
        // 登陆验证规则
        userLogin: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 16,
            message: '长度在 2 到 16 个字符',
            trigger: 'blur'
          },
          { validator: checkUserName, trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          },
          { validator: checkPassword, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: checkValidateCode, trigger: 'blur' }
        ]
      },
      isRememberPassword: false // 是否记住密码
    }
  },
  computed: {
    submitBtnText () {
      if (this.safetyVerifyFun) {
        return '确定'
      } else {
        return '登录'
      }
    }
  },
  watch: {
    validateCode: function (newVal) {
      console.log('newVal', newVal)
      validateCode = newVal
      this.loginForm.code = newVal
    }
  },
  methods: {
    // 登录提交表单按钮
    submit () {
      console.log('登录提交表单')
      this.loading = true
      const isVerifyForm = this.safetyVerifyFun && typeof this.safetyVerifyFun === 'function'
      if (!isVerifyForm) {
        this.validateLoginForm()
      } else {
        // 检验校验是否通过，通过就返回true , 不通过就返回false
        this.safetyVerifyFun(() => true)
      }
    },
    // 登录表单验证
    validateLoginForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('this.loginForm', this.loginForm)
          this.login()
        } else {
          this.loading = false
        }
      })
    },
    // 调取登录接口
    login () {
      const that = this
      if (this.formType === 'loginForm') {
        util.cookies.set('token', validateCode)
        setTimeout(() => {
          that.$router.push({
            path: that.$route.query.redirect || '/index'
          })
          this.loading = false
        }, 250)

        setTimeout(() => {
          this.$notify({
            title: '登录成功',
            message: `${setting.name}，欢迎您回来`,
            type: 'success'
          })
        }, 400)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 登录表单
.page-login--form {
  // 登录按钮
  .button-login {
    width: 100%;
  }
  // 输入框左边的图表区域缩窄
  .el-input-group__prepend {
    padding: 0px 14px;
  }
  .login-code {
    height: 40px - 2px;
    display: block;
    margin: 0px -20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
}
</style>
