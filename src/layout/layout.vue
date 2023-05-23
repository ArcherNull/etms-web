<!--
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
-->
<template>
  <div class="layoutBox">
    <el-container class="layout">
      <el-aside :width="sidebarWidth" class="layout-sidebar">
        <Sidebar />
      </el-aside>
      <el-container class="layout-main">
        <el-header :height="headerHeight" class="layout-main-header">
          <AppHeader />
        </el-header>
        <el-main
          id="layout-main-container"
          v-loading="appMainLoading"
          class="layout-main-container"
        >
          <AppMain :router-view-key="routerViewKey" />
        </el-main>
      </el-container>
    </el-container>
    <!-- 滚动 -->
    <el-backtop target=".layout-main-container" :bottom="100">
      <div class="scrollTop">
        <i class="el-icon-upload2" />
      </div>
    </el-backtop>

    <!-- 文件上传组件 -->
  </div>
</template>

<script>
import { AppHeader, AppMain, Sidebar } from './components'
import { mapGetters } from 'vuex'
import ResizeHandler from './mixin/ResizeHandler.js'
import { resetMessageInterval } from '@/common/timePoll'

export default {
  name: 'Layout',
  components: {
    AppHeader,
    AppMain,
    Sidebar
  },
  mixins: [ResizeHandler],
  data () {
    return {
      asideShow: true,
      appMainLoading: false
    }
  },
  computed: {
    ...mapGetters(['sidebarWidth', 'headerHeight']),
    /**
     * @description 最外层容器的背景图片样式
     */
    // styleLayoutMainGroup () {
    //   const theme = this.$setting.theme
    //   const { showCurrentTheme, localThemeList, onlineThemeList } = theme
    //   const { isOnline, themeIndex } = showCurrentTheme

    //   if (isOnline) {
    //     return {
    //       backgroundImage: `url('${this.$baseUrl}${onlineThemeList[themeIndex].preview}')`
    //     }
    //   } else {
    //     return {
    //       // backgroundImage: `url('../assets/images/theme/simple.jpg')`
    //     }
    //   }
    // },
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey () {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || ''
      return `${stamp ? `__stamp-${stamp}-` : ''}${this.$route.path}`
    }
  },
  watch: {
    routerViewKey (newVal, oldVal) {
      this.appMainLoading = !(newVal === oldVal)
      setTimeout(() => {
        this.appMainLoading = false
      }, 500)
    }
  },
  mounted () {
    resetMessageInterval()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.layoutBox {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // background-image: url('../assets/images/theme/simple.jpg');
  .layout {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    .layout-sidebar {
      box-sizing: border-box;
    }
    .layout-main {
      .el-header {
        padding: 0 0px;
      }
      &-header {
        box-sizing: border-box;
      }
      &-container {
        box-sizing: border-box;
        width: 100%;
        overflow: auto;
        padding: 10px;
        background-image: url('../assets/images/theme/simple.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -ms-overflow-style: none;
        overflow: '-moz-scrollbars-none';
        scrollbar-width: none; /*  火狐   */
        // background: $color-bg;
        // background-image: linear-gradient(#1ab8b8, #3bb54a);
        &::-webkit-scrollbar {
          display: none; /*  Chrome  */
          width: 0 !important ; /*  Chrome  */
        }
      }
    }
  }
}

.scrollTop {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
  font-size: 30px;
  font-weight: bolder;
}

.layoutBox {
  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }
}
</style>
