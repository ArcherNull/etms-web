<!--
 * @Author: Null
 * @Date: 2022-04-01 17:17:37
 * @Description: Qrcode生成二维码插件
-->
<template>
  <div
    :class="['MyQrcode', showCardBg ? 'MyQrcode-card-bg' : '']"
    :style="{ height: `${height + 52}px`, width: `${width + 32}px` }"
    flex="dir:top main:center"
  >
    <!-- 二维码状态 -->
    <div v-if="qrcodeErrorText === ''" class="MyQrcode-box">
      <!-- 二维码展示区域 -->
      <div
        :id="qrCodeComId"
        v-loading="makeQrcodeLoading"
        class="MyQrcode-box-content"
        :style="{ height: `${height}px`, width: `${width}px` }"
        @click="makeQrcode()"
      />
      <!-- 二维码额外功能 -->
      <div
        v-show="showExtraFunIcon"
        :class="[
          'MyQrcode-box-extraFun',
          showExtraFunIcon ? 'extraFunIcon-margin' : ''
        ]"
        flex
      >
        <!-- 下载图片 -->
        <SvgIcon
          v-show="qcodeExtraFunIcon.includes('downLoad')"
          name="downLoad"
          title="下载png"
          class-name="MyQrcode-box-extraFun__btn dk-icon-btn"
          @click="downLoadQrcode()"
        />
        <!-- 下载压缩包 -->
        <SvgIcon
          v-show="qcodeExtraFunIcon.includes('zip')"
          name="zip"
          title="下载zip"
          class-name="MyQrcode-box-extraFun__btn dk-icon-btn"
          @click="downLoadQRCodeZip()"
        />
        <!-- 刷新 -->
        <SvgIcon
          v-show="qcodeExtraFunIcon.includes('refresh')"
          name="refresh"
          title="刷新"
          class-name="MyQrcode-box-extraFun__btn dk-icon-btn"
          @click="makeQrcode()"
        />
      </div>
    </div>
    <div
      v-else
      class="MyQrcode-error dk-placeholder"
      flex="main:center cross:center"
      @click="refreshQrCode()"
    >
      {{ qrcodeErrorText }}
    </div>
  </div>
</template>

<script>
import Qrcode from 'qrcodejs2'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'MyQrcode',
  components: {
    SvgIcon
  },
  props: {
    // 二维码id
    qrcodeId: {
      type: String,
      default: 'qrcode'
    },
    // qrcode二维码的内容
    qrcodeContent: {
      type: String,
      default: 'https://baidu.com'
    },
    // 二维码额外功能
    qcodeExtraFunIcon: {
      type: Array,
      default () {
        return ['downLoad', 'zip', 'refresh']
      }
    },
    // 是否展示白色card背景
    showCardBg: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // link: 'https://baidu.com',
      qrcodeApi: '',
      // 用于下载图片
      imgSrc: '',
      makeQrcodeLoading: false, // 生成二维码loading
      qrcodeErrorText: '' // 二维码加载失败，提示文本
    }
  },
  computed: {
    ...mapState('element/myQrcode', [
      'width',
      'height',
      'background',
      'foreground'
    ]),
    qrCodeComId () {
      const currentPath = this.$router.history.current.path
      if (this.qrcodeId) {
        return `${currentPath}-${this.qrcodeId}`
      } else {
        return currentPath
      }
    },
    // 展示
    showExtraFunIcon () {
      return ['downLoad', 'zip', 'refresh'].filter((ele) =>
        this.qcodeExtraFunIcon.includes(ele)
      )
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.qrcode()
    })
  },
  methods: {
    //  生成二维码
    qrcode () {
      this.makeQrcodeLoading = true
      this.qrcodeErrorText = ''

      console.log('this.qrCodeComId', this.qrCodeComId)
      const dom = document.getElementById(this.qrCodeComId)

      const loadError = () => {
        this.makeQrcodeLoading = false
        this.qrcodeErrorText = '加载失败，点击刷新'
      }

      if (dom) {
        if (this.qrcodeContent) {
          try {
            const qrcode = new Qrcode(dom, {
              width: this.width || 100,
              height: this.height || 100, // 高度
              text: this.qrcodeContent, // 二维码内容
              render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
              background: this.background, // 背景色
              foreground: this.foreground // 前景色
            })
            this.qrcodeApi = qrcode

            // 存放二维码图片下载链接
            const qrCodeObj = document.getElementById(this.qrCodeComId)
            const img = qrCodeObj.querySelector('img')
            img.onload = () => {
              // 注意这里一定要在img.onload()中取src，否则取到为null
              this.imgSrc = img.src
              this.makeQrcodeLoading = false
            }
          } catch (error) {
            loadError()
          }
        } else {
          loadError()
        }
      } else {
        loadError()
      }
    },
    refreshQrCode () {
      this.qrcode()
    },
    // 清除二维码
    clearQrcode () {
      this.qrcodeApi.clear()
    },
    // 重新替换二维码内容
    makeQrcode () {
      this.makeQrcodeLoading = true
      setTimeout(() => {
        this.qrcodeApi.makeCode(this.qrcodeContent)
      }, 500)
    },
    // 下载二维码图片
    downLoadQrcode () {
      // this.$commJs.downLoadByATag(this.imgSrc, '文件')
      const alink = document.createElement('a')
      alink.setAttribute('href', this.imgSrc) // 如果使用canvas，那么把imgSrc改为canvas
      alink.download = 'qrCode.png'
      alink.click()
    },
    // 下载二维码压缩包
    downLoadQRCodeZip () {
      this.$commJs.qrCodeDownLoadZipFile([
        {
          name: '二维码',
          url: this.imgSrc
        }
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.MyQrcode {
  padding: 16px;
  // @extend %card;
  box-sizing: border-box;
  &-box {
    &-content {
      @extend %gary-bg;
    }
    &-extraFun {
      &__btn {
        width: 1.5rem;
        height: 1.5rem;
        fill: currentColor;
        color: $color-primary;
        margin-right: 6px;
      }
    }
  }
  &-error {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
.extraFunIcon-margin {
  padding: 6px 0;
}
.MyQrcode-card-bg {
  @extend %card;
}
</style>
