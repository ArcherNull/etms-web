<!--
 * @Author: Null
 * @Date: 2022-02-08 08:36:20
 * @Description: 顶部--用户登录信息展示
-->
<template>
  <el-dropdown class="header-userInfo" trigger="click" @command="handleCommand">
    <div class="header-userInfo__container dk-icon-btn" flex>
      <!-- 用户头像 -->
      <div class="header-userInfo__container_awater" flex="main:center cross:center">
        <!-- <el-avatar :size="24" :src="userImg" /> -->
        <MyAvatar :url="userImg" />
      </div>

      <!-- 用户名称 -->
      <div class="header-userInfo__container_username text-ellipsis">管理员管理员管理员管理员管理员</div>
    </div>
    <el-dropdown-menu slot="dropdown" class="header-userInfo__container_menu">
      <el-dropdown-item command="userCenter"> <SvgIcon name="userInfo" /><span class="dk-ml-4">个人中心</span></el-dropdown-item>
      <el-dropdown-item command="project"> <SvgIcon name="briefcase" /><span class="dk-ml-4">切换项目</span></el-dropdown-item>
      <el-dropdown-item command="editPassword"> <SvgIcon name="edit-password" /><span class="dk-ml-4">修改密码</span></el-dropdown-item>
      <el-dropdown-item command="resetPassword"> <SvgIcon name="reset-password" /><span class="dk-ml-4">重置密码</span></el-dropdown-item>
      <el-dropdown-item command="lock"> <SvgIcon :name="lockState?'lock':'unlock'" /><span class="dk-ml-4">{{ lockState ?'解锁': '锁定' }}屏幕</span></el-dropdown-item>
      <el-dropdown-item command="logout"><SvgIcon name="power-off" /><span class="dk-ml-4">退出登录</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'UserInfo',
  data () {
    return {
      lockState: false // 屏幕锁定状态 ， false 未锁定 ； true 锁定
    }
  },
  computed: {
    userImg () {
      return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    ...mapActions('user/userInfo', ['logout']),
    ...mapMutations('settingsPanel/panelStyle', ['SET_SHOW_SETTING_DRAWER']),

    handleCommand (ele) {
      switch (ele) {
        case 'userCenter':
          console.log('个人中心')
          this.SET_SHOW_SETTING_DRAWER()
          break
        case 'project':
          console.log('切换项目')
          this.SET_SHOW_SETTING_DRAWER()
          break
        case 'editPassword':
          console.log('修改密码')
          break
        case 'resetPassword':
          console.log('重置密码')
          break
        case 'lock':
          console.log('锁定屏幕')
          this.lockState = !this.lockState
          break
        case 'logout':
          console.log('退出登录')
          this.logout()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-userInfo{
  height: 100%;
  &__container{
    height: 100%;
    &_awater{
      width: 32px;
    }
    &_username{
      max-width: 70px;
    }
  }
}
</style>
