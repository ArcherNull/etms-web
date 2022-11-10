<!--
 * @Author: Null
 * @Date: 2022-02-08 08:36:20
 * @Description: 全屏设置
-->
<template>
  <MyToolTip :content="isFullscreen ? '退出全屏' : '全屏'">
    <div
      class="header-fullscreen-container dk-icon-btn"
      @click="toggle(!isFullscreen)"
    >
      <SvgIcon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
    </div>
  </MyToolTip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'FullScreen', // 全屏
  computed: {
    ...mapState('setting/fullscreen', ['isFullscreen'])
  },
  methods: {
    ...mapActions('setting/fullscreen', ['toggle']),
    changeFullscreen () {
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
.header-fullscreen-container {
  width: $header-icon-btn-width;
  height: 100%;
}
</style>
