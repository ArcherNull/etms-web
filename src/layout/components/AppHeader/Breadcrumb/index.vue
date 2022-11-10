<!--
 * @Author: Null
 * @Date: 2021-12-02 00:06:36
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb" mode="out-in" flex>
      <el-breadcrumb-item
        v-for="(item, index) in routerLevelList"
        :key="item.path"
        class="app-breadcrumb-content"
        flex="main:left"
      >
        <div v-if="item.meta.title">
          <span
            v-if="
              item.redirect === 'index' || index == routerLevelList.length - 1
            "
            class="no-redirect"
          >
            {{ $t(`layout.sidebar.menu.${item.path}`) }}
          </span>
          <router-link
            v-else
            :to="item.redirect || item.path"
          >
            {{ $t(`layout.sidebar.menu.${item.path}`) }}
          </router-link>
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      // 等级路由列表[1,2,3,4级路由]
      routerLevelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // 筛选出路由层级
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )

      // 将首页恒定固定在最前面
      const first = matched[0]
      if (first && first.name === 'index') {
        matched = [{ path: '/index', meta: { title: '首页' }}]
      }
      this.routerLevelList = matched
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  .el-breadcrumb {
    font-size: $font-text-13;
    @extend %flex-nowarp;
    // .redirect {
    //   color: $color-text-sub;
    // }
    .no-redirect {
      color: $color-text-main;
      cursor: text;
    }
  }
  &-content {
    word-break: keep-all;
  }
}

/* 面包屑动画样式 */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-move {
  transition: all 0.5s;
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
