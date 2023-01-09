<!--
 * @Author: Null
 * @Date: 2021-12-02 00:19:38
-->
<template>
  <div class="siderbarMenu" :style="{ height: height }">
    <!-- 菜单搜索区域 -->
    <MenuSearch :height="menuSearchHeight" />
    <!-- 菜单向区域 -->
    <div class="siderbarMenu-menuBox">
      <!-- <MenuItem title="菜单项" icon="add" /> -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <!-- collapse-transition 是否开启折叠动画 unique-opened 	是否只保持一个子菜单的展开 -->
        <el-menu
          class="siderbarMenu-menuBox-menu"
          :default-active="current"
          :collapse="menubarIsFold"
          :background-color="menuBgColor"
          :text-color="menuTextColor"
          :unique-opened="false"
          :active-text-color="menuActiveTextColor"
          :collapse-transition="false"
          mode="vertical"
          :router="true"
        >
          <SidebarItem
            v-for="route in asyncRoute"
            :key="route.path"
            :index="route.path"
            :route="route"
            :base-path="route.path"
            :default-atict="current"
            :default-id="activeId"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import MenuSearch from './components/MenuSearch/index.vue'
import SidebarItem from './components/SidebarItem/index.vue'

// import { frameInRoutes } from '@/router/routers'

export default {
  name: 'SidebarMenu',
  components: {
    MenuSearch,
    SidebarItem
  },
  props: {
    height: {
      type: String,
      default: '500px'
    }
  },
  data () {
    return {
      isCollapse: false, // 是否折叠
      menuBg: '', // 菜单栏背景颜色
      menuText: '', // 菜单栏文本
      menuActiveText: '' // 被选中的文本颜色
      // asyncRoute: frameInRoutes // 动态路由
    }
  },
  computed: {
    ...mapState('setting/tagViews', ['current']),
    ...mapState('setting/layout', ['menubarIsFold']),

    ...mapGetters([
      'menuSearchHeight',
      'menuBgColor',
      'menuTextColor',
      'menuActiveTextColor',
      'asyncRoute'
    ]),
    // 当前选中的
    activeId () {
      const route = this.$route
      const { meta } = route
      return meta.id
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .siderbarMenu-menuBox-menu {
  height: calc(100vh - 90px);
  box-sizing: border-box;
  .el-submenu {
    .el-submenu__title {
      padding-left: 14px !important;
      .sub-el-icon {
        margin-right: 15px;
      }
      .el-submenu__icon-arrow {
        margin-top: -4px;
      }
    }
  }
}
</style>
