<!--
 * @Author: Null
 * @Date: 2022-01-11 14:14:20
 * @Description: 动态组件--用于路由跳转或外链跳转
-->

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/common/validate.js'

export default {
  name: 'MenuLink',
  props: {
    // 必传，跳转路径
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal () {
      return isExternal(this.to)
    },
    type () {
      // 如果是外链,则显示a标签
      if (this.isExternal) {
        return 'a'
      }
      // 不是外链则展示router-link标签
      return 'router-link'
    }
  },
  methods: {
    linkProps (to) {
      // 如果是外链
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // 如果是页面路径
      return {
        to: to
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
