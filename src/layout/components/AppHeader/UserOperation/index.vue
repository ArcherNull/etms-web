<!--
 * @Author: Null
 * @Date: 2021-11-13 00:12:15
-->
<template>
  <div class="app-header-user" flex="main:riight cross:center">
    <!-- 全局搜索 -->
    <SearchAll />
    <!-- 网络 -->
    <SearchAll />
    <!-- 前端日志 -->
    <ErrorLog />
    <!-- 国际化 -->
    <Local />
    <!-- 消息通知 -->
    <Message />
    <!-- 全屏按钮 -->
    <FullScreen />
    <!-- 用户信息 -->
    <UserInfo />
    <!-- 设置 -->
    <Setting />
  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue'
import FullScreen from './components/FullScreen.vue'
import Message from './components/Message.vue'
import Local from './components/Local.vue'
import ErrorLog from './components/ErrorLog.vue'
import Setting from './components/Setting/index.vue'
import SearchAll from './components/SearchAll.vue'

export default {
  name: 'UserOperation', // 用户信息下拉框
  components: {
    UserInfo,
    FullScreen,
    Message,
    Local,
    ErrorLog,
    Setting,
    SearchAll
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app-header-user{
  font-size: 14px;
  height: 100%;
}
</style>
