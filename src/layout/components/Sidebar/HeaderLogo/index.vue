<!--
 * @Author: Null
 * @Date: 2021-12-02 00:10:09
-->
<template>
  <div class="siderbar-logo" :style="{ height: height }">
    <transition name="sidebarLogoFade">
      <LogoImg v-if="isFold" :img-url="require('@/assets/images/login.jpg')" />
      <LogoImg v-else :img-url="require('@/assets/images/login.jpg')" />
    </transition>
  </div>
</template>

<script>
import LogoImg from './LogoImg.vue'
export default {
  name: 'HeaderLogo', // sidebar的顶部logo图标
  components: {
    LogoImg
  },
  props: {
    // logo区域高度k
    height: {
      type: String,
      default: '50px'
    },
    isFold: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.siderbar-logo {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  &-img {
    height: 50px;
  }
}

/* logo折叠渐隐动画 */
.sidebarLogoFade-enter-active {
  transition: opacity 3.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
