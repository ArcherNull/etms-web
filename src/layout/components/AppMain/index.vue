<!--
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
-->
<template>
  <div class="appMain">
    <!-- 主内容 -->
    <transition name="nodebook" mode="out-in">
      <keep-alive :include="keepAlive">
        <!-- router-view 需要绑定动态key值，否则会导致页面穿重 -->
        <router-view :key="routerViewKey" />
      </keep-alive>
    </transition>

    <!-- 用于预览PDF的弹窗 -->
    <!-- <PreviewPDF /> -->

    <!-- 安全校验弹窗 -->
    <!-- <SafetyVerifyDialog /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import PreviewPDF from './components/PreviewPDF.vue'
// import SafetyVerifyDialog from './components/SafetyVerifyDialog.vue'

export default {
  name: 'AppMain',
  components: {
    // PreviewPDF,
    // SafetyVerifyDialog
  },
  props: {
    routerViewKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cachedViews: [],
      visible: false
    }
  },
  computed: {
    ...mapState('setting/tagViews', ['keepAlive'])
  }
}
</script>

<style lang="scss" scoped>
/* 内容主题加载过渡样式 */
.nodebook-enter,
.nodebook-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

.nodebook-enter-to,
.nodebook-leave {
  transform: scale(1);
  opacity: 1;
}
.nodebook-enter-active,
.nodebook-leave-active {
  transition: all 0.3s;
}
</style>
