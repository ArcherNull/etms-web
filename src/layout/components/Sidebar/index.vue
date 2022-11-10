<!--
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
-->
<template>
  <div class="sidebar">
    <!-- 侧边logo -->
    <HeaderLogo
      :is-fold="menubarIsFold"
      :height="logoHeight"
    />
    <!-- 菜单栏 -->
    <SidebarMenu :is-fold="menubarIsFold" :height="menuTotalHeight" />
    <!-- 底部设置区域 -->
    <SidebarFooter :is-fold="menubarIsFold" :height="settingHeight" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HeaderLogo from './HeaderLogo/index.vue'
import SidebarFooter from './SidebarFooter/index.vue'
import SidebarMenu from './SidebarMenu/index.vue'

export default {
  name: 'Sidebar', // 侧边菜单栏
  components: {
    HeaderLogo,
    SidebarFooter,
    SidebarMenu
  },
  data () {
    return {}
  },
  computed: {
    // getters放在最外层的，未存放在模块中
    ...mapGetters([
      'settingHeight',
      'logoHeight',
      'menuTotalHeight',
      'sidebarWidth'
    ]),
    ...mapState('setting/layout', ['menubarIsFold'])
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: $sidebar-menu-bg;
  @extend %no-scroll-bar;
}
</style>
