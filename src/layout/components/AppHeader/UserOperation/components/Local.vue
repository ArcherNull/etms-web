<!--
 * @Author: Null
 * @Date: 2022-02-08 08:36:20
 * @Description: 国际化语言
-->
<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <MyToolTip :content="`当前语言：${languageList[$i18n.locale]}`">
      <div class="header-local-container dk-icon-btn">
        <SvgIcon :name="$i18n.locale" />
      </div>
    </MyToolTip>
    <el-dropdown-menu slot="dropdown" class="header-userInfo__container_menu">
      <el-dropdown-item command="zh-CN"> <SvgIcon name="zh-CN" /><span class="dk-ml-4">中文</span></el-dropdown-item>
      <el-dropdown-item command="en"> <SvgIcon name="en" /><span class="dk-ml-4">English</span></el-dropdown-item>
      <el-dropdown-item command="zh-TW"> <SvgIcon name="zh-TW" /><span class="dk-ml-4">繁体</span></el-dropdown-item>
      <el-dropdown-item command="ja"> <SvgIcon name="ja" /><span class="dk-ml-4">日文</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Local', // 国际化
  computed: {
    ...mapState('setting/local', ['languageList'])
  },
  methods: {
    handleCommand (ele) {
      this.$i18n.locale = ele
    }
  }
}
</script>

<style lang="scss" scoped>
.header-local-container {
  width: $header-icon-btn-width;
  height: 100%;
}

</style>
