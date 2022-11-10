<!--
 * @Author: Null
 * @Date: 2022-03-22 13:56:30
 * @Description: MyLoading组件
-->

<template>
  <div class="MyLoading" flex="main:center cross:center" v-on="$listeners">
    <div v-if="customizedAttrs.loadingType === 'Fade-Circle'" class="loader-Fade-Circle" />
    <div v-else-if="customizedAttrs.loadingType === '3D-Flip'" class="loader-3D-Flip" />
    <div v-else-if="customizedAttrs.loadingType === 'Surround-Slice'" class="loader-Surround-Slice" />
    <div v-else-if="customizedAttrs.loadingType === 'Surround-Circle'" class="loader-Surround-Circle" />
    <!-- 默认加载loading -->
    <div v-else-if="customizedAttrs.loadingType === 'default'" class="loader-default">
      <div class="my-loading-loader">
        <div class="my-loading" />
        <div class="my-loading-text">加载中...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyLoading',
  inheritAttrs: false,
  props: {
    loadingType: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('element/myLoading', ['currentSelectedLoadingType']),
    // Fade-Circle 渐隐圆环 ； 3D-Flip 翻转； Surround-Slice 环绕切片； Surround-Circle 环绕圆
    customizedAttrs () {
      if (this.loadingType) {
        return {
          loadingType: this.loadingType
        }
      } else {
        return {
          loadingType: this.currentSelectedLoadingType || 'default',
          // 支持传过来的size覆盖默认的size
          ...this.$attrs
        }
      }
    }
  }
}
</script>

<style lang="scss">
.MyLoading {
  position: relative;
  width: 100%;
  min-height: 100px;
  border-radius: 3px;
  font-size: 48px;
  color: $color-primary;
  padding: 1em;
  margin-bottom: 0.15em;
  vertical-align: top;
  -webkit-transition: 0.3s color, 0.3s border;
  transition: 0.3s color, 0.3s border;
}
[class*='loader-'] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}

.loader-Fade-Circle {
  position: relative;
}
.loader-Fade-Circle:before,
.loader-Fade-Circle:after {
  content: '';
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-color: currentcolor;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: loader-Fade-Circle 2s infinite ease-in-out;
  animation: loader-Fade-Circle 2s infinite ease-in-out;
}
.loader-Fade-Circle:after {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
@-webkit-keyframes loader-Fade-Circle {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes loader-Fade-Circle {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.loader-3D-Flip {
  background-color: currentcolor;
  border-radius: 8px;
  background: url('../../assets/images/logo-hide.png') center no-repeat;
  background-size: 100% 100%;
  -webkit-animation: loader-3D-Flip 1.2s infinite ease-in-out;
  animation: loader-3D-Flip 1.2s infinite ease-in-out;
}
@-webkit-keyframes loader-3D-Flip {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
@keyframes loader-3D-Flip {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

.loader-Surround-Slice {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
  -webkit-perspective: 1000px;
  perspective: 1000px;
  border-radius: 50%;
}
.loader-Surround-Slice:before,
.loader-Surround-Slice:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}
.loader-Surround-Slice:before {
  -webkit-transform: rotateX(70deg);
  transform: rotateX(70deg);
}
.loader-Surround-Slice:after {
  -webkit-transform: rotateY(70deg);
  transform: rotateY(70deg);
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
@-webkit-keyframes spin {
  0%,
  100% {
    box-shadow: 0.2em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: 0.2em 0.2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 0.2em 0 0px currentcolor;
  }
  37% {
    box-shadow: -0.2em 0.2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -0.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -0.2em -0.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -0.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: 0.2em -0.2em 0 0 currentcolor;
  }
}
@keyframes spin {
  0%,
  100% {
    box-shadow: 0.2em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: 0.2em 0.2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 0.2em 0 0px currentcolor;
  }
  37% {
    box-shadow: -0.2em 0.2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -0.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -0.2em -0.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -0.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: 0.2em -0.2em 0 0 currentcolor;
  }
}

.loader-Surround-Circle {
  position: relative;
  background-color: currentcolor;
  border-radius: 50%;
}
.loader-Surround-Circle:after,
.loader-Surround-Circle:before {
  content: '';
  position: absolute;
  width: 0.25em;
  height: 0.25em;
  border-radius: 50%;
  opacity: 0.8;
}
.loader-Surround-Circle:after {
  left: -0.5em;
  top: -0.25em;
  background-color: currentcolor;
  -webkit-transform-origin: 0.75em 1em;
  transform-origin: 0.75em 1em;
  -webkit-animation: loader-Surround-Circle 1s linear infinite;
  animation: loader-Surround-Circle 1s linear infinite;
  opacity: 0.6;
}
.loader-Surround-Circle:before {
  left: -1.25em;
  top: -0.75em;
  background-color: currentcolor;
  -webkit-transform-origin: 1.5em 1em;
  transform-origin: 1.5em 1em;
  -webkit-animation: loader-Surround-Circle 2s linear infinite;
  animation: loader-Surround-Circle 2s linear infinite;
}
@-webkit-keyframes loader-Surround-Circle {
  0% {
    -webkit-transform: rotateZ(0deg) translate3d(0, 0, 0);
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: rotateZ(360deg) translate3d(0, 0, 0);
    transform: rotateZ(360deg) translate3d(0, 0, 0);
  }
}
@keyframes loader-Surround-Circle {
  0% {
    -webkit-transform: rotateZ(0deg) translate3d(0, 0, 0);
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: rotateZ(360deg) translate3d(0, 0, 0);
    transform: rotateZ(360deg) translate3d(0, 0, 0);
  }
}

/* 默认加载动画 */
.my-loading-loader {
  position: relative;
  font-size: 12px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
}

.my-loading-loader .my-loading {
  position: relative;
  width: 100%;
  height: 10px;
  border: 1px solid $color-primary;
  border-radius: 10px;
  animation: turnDefault 1s linear 0.42s infinite;
}

.my-loading-loader .my-loading:before {
  content: "";
  display: block;
  position: absolute;
  width: 0%;
  height: 100%;
  background: $color-primary;
  box-shadow: 10px 0px 15px 0px $color-primary;
  animation: loadDefault .5s linear infinite;
}

.my-loading-loader .my-loading-text {
  width: 100%;
  position: absolute;
  top: 10px;
  color: $color-primary;
  text-align: center;
  animation: bounceDefault .5s linear infinite;
}

@keyframes loadDefault {
  0% {
    width: 0%;
  }

  87.5%,
  100% {
    width: 100%;
  }
}

@keyframes turnDefault {
  0% {
    transform: rotateY(0deg);
  }

  6.25%,
  50% {
    transform: rotateY(180deg);
  }

  56.25%,
  100% {
    transform: rotateY(360deg);
  }
}

@keyframes bounceDefault {
  0%,
  100% {
    top: 10px;
  }

  12.5% {
    top: 30px;
  }
}
/* 默认加载动画 */
</style>
