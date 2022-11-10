<!--
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
 * @Description:  根组件
-->
<template>
  <div id="app" :class="theme">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState('setting/theme', ['theme'])
  }
}
</script>

<style>

</style>
