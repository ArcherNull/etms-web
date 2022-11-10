<!--
 * @Author: Null
 * @Date: 2022-01-11 14:19:54
 * @Description: 侧边菜单栏--菜单栏单项
-->

<template>
  <!-- 菜单路由是否隐藏 -->
  <div
    v-if="route.meta && !route.meta.hidden"
    class="siderbarMenu-siderbar-item"
  >
    <!-- 没有下级，可点击跳转的路由， 可接受外链或者页面路由 -->
    <template v-if="!route.children">
      <MenuLink :to="route.path">
        <el-menu-item
          v-waves
          :index="route.path"
          class="siderbarMenu-siderbar-item__container"
          :style="{
            height: menuChildrenLevelHeight,
            'line-height': menuChildrenLevelHeight,
          }"
          :title="$t(`layout.sidebar.menu.${route.path}`)"
        >
          <MenuItem
            :title="$t(`layout.sidebar.menu.${route.path}`) || $t(`layout.sidebar.menu./`)"
            :icon="route.meta && route.meta.icon"
          />
        </el-menu-item>
      </MenuLink>
    </template>

    <!-- 一级路由，有下级 -->
    <el-submenu v-else :index="route.path" :title="$t(`layout.sidebar.menu.${route.path}`)" popper-append-to-body>
      <!-- 一级/二级父标题，无法实现点击跳转，其下有children 子集 -->
      <template slot="title">
        <MenuItem
          v-if="route.meta"
          :title="$t(`layout.sidebar.menu.${route.path}`) || $t(`layout.sidebar.menu./`)"
          :icon="route.meta && route.meta.icon"
        />
      </template>
      <!-- 二级可跳转 -->
      <SidebarItem
        v-for="(child, index) in route.children"
        :key="child.path + index"
        :route="child"
        :default-atict="defaultActive"
        :default-id="defaultId"
        :base-path="child.path"
      />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuLink from '../MenuLink/index.vue'
import MenuItem from '../MenuItem/index.vue'

export default {
  name: 'SidebarItem',
  components: {
    MenuLink,
    MenuItem
  },
  // filters: {
  //   languageSwitch (route) {
  //     console.log('languageSwitch--------------', route.path)
  //     const replaceStr = route.path.replace(/\//g, '.')
  //     const locale = this.$t(`layout.sidebar.menu${replaceStr}`) || '未知页面'
  //     // return route.meta.title
  //     return locale
  //   }
  // },
  props: {
    // 路由，必传
    route: {
      type: Object,
      default: () => {},
      require: true
    },
    defaultActive: {
      type: String,
      default: ''
    },
    defaultId: {
      type: String,
      default: ''
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['menuChildrenLevelHeight', 'sidebarWidth'])
  }
}
</script>

<style lang="scss">
.siderbarMenu-siderbar-item {
  .el-menu-item,
  .el-submenu__title {
    height: 40px;
    line-height: 40px;
    &:hover {
    //  background-color: $menuHover !important;
     background-color: red !important;

   }
  }
  .el-menu-item.is-active {
    background: $color-primary !important;
  }
}
</style>
