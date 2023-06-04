<!--
 * @Author: Null
 * @Date: 2021-12-02 00:19:38
-->
<template>
  <div class="siderbarMenu" :style="{ height: height }">
    <!-- 菜单搜索区域 -->
    <MenuSearch :height="menuSearchHeight" />
    <!-- 菜单向区域 -->
    <div v-loading="!menuRoutes.length" class="siderbarMenu-menuBox">
      <!-- <MenuItem title="菜单项" icon="add" /> -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <!-- collapse-transition 是否开启折叠动画 unique-opened 	是否只保持一个子菜单的展开 -->
        <el-menu
          class="siderbarMenu-menuBox-menu"
          :default-active="current"
          :collapse="menubarIsFold"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <SidebarItem
            v-for="route in menuRoutes"
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
import variables from './index.scss'
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
      menuActiveText: '', // 被选中的文本颜色
      menuRoutes: []
      // asyncRoute: frameInRoutes // 动态路由
    }
  },
  computed: {
    ...mapState('setting/tagViews', ['current']),
    ...mapState('setting/layout', ['menubarIsFold']),

    ...mapGetters([
      'menuSearchHeight',
      'asyncRoute'
    ]),
    // 当前选中的
    activeId () {
      const route = this.$route
      const { meta } = route
      return meta.id
    },
    variables () {
      return variables
    }
  },
  watch: {
    asyncRoute: {
      handler (newVal) {
        if (Array.isArray(newVal)) {
          this.menuRoutes = newVal
        } else {
          this.menuRoutes = []
        }
      },
      immediate: true
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
@import './index.scss';

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

  .submenu-title-noDropdown,
  .el-submenu__title {
    &:hover {
      background-color: $menuHover !important;
    }
  }

  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    // min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important; //

    &:hover {
      background-color: $menuHover !important;
    }
  }

  & .router-link-active .el-menu-item {
    color: $subMenuActiveText !important;
    background-color: $subMenuActive !important;
  }
}

// when menu collapsed
// .el-menu--vertical {
//   & > .el-menu {
//     .svg-icon {
//       margin-right: 16px;
//     }
//     .sub-el-icon {
//       margin-right: 12px;
//       margin-left: -2px;
//     }
//   }

//   .nest-menu .el-submenu > .el-submenu__title,
//   .el-menu-item {
//     // background-color: #ff0000 !important;
//     &:hover {
//       // you can use $subMenuHover
//       background-color: $menuHover !important;
//     }
//   }

//   // the scroll bar appears when the subMenu is too long
//   > .el-menu--popup {
//     max-height: 100vh;
//     overflow-y: auto;

//     &::-webkit-scrollbar-track-piece {
//       background: #d3dce6;
//     }

//     &::-webkit-scrollbar {
//       width: 6px;
//     }

//     &::-webkit-scrollbar-thumb {
//       background: #99a9bf;
//       border-radius: 20px;
//     }
//   }
// }
</style>
