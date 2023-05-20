<!--
 * @Author: Null
 * @Date: 2021-12-02 00:41:13
-->
<template>
  <div>
    <!-- 面包屑导航/用户信息/消息通知 -->
    <div
      :style="{ 'height': navBoxHeight }"
      class="appHeader"
      flex="main:justify cross:stretch"
    >
      <!-- 面包屑导航 -->
      <div class="appHeader-navBox" flex="main:start cross:center">
        <!-- 展开/折叠icon -->
        <div class="dk-mr-4 dk-icon-btn fold-icon-css" @click="SET_FOLD_MENUBAR(!menubarIsFold)">
          <SvgIcon :name="menubarIsFold ? 'indent' : 'outdent'" />
        </div>
        <!-- 面包屑导航 -->
        <Breadcrumb />
        <!-- 通知栏 -->

        <!-- IP本机定位 -->
      </div>
      <!-- 用户登录 -->
      <div class="appHeader-userInfo">
        <UserOperation />
      </div>
    </div>
    <!-- 标签导航 -->
    <TagsView :height="tagsViewsHeight" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Breadcrumb from './Breadcrumb/index.vue'
import TagsView from './TagsView/index.vue'
import UserOperation from './UserOperation/index.vue'

export default {
  name: 'AppHeader', // 头部布局
  components: {
    Breadcrumb,
    TagsView,
    UserOperation
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['navBoxHeight', 'tagsViewsHeight', 'menubarIsFold'])
  },
  methods: {
    ...mapMutations('setting/layout', ['SET_FOLD_MENUBAR'])
  }
}
</script>

<style lang="scss" scoped>
.fold-icon-css {
  font-size: 12px;
  width: 32px;
  height: 100%;
}
</style>
