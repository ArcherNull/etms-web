<!--
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
-->
<template>
  <div
    :style="{ height: height }"
    class="settingsBox dk-pr-8 dk-pl-8"
    flex="main:start cross:center"
  />
</template>

<script>
export default {
  name: 'SidebarFooter', // sidebar的底部设置
  props: {
    height: {
      type: String,
      default: '40px'
    }
  },
  data () {
    return {}
  }
}
</script>
