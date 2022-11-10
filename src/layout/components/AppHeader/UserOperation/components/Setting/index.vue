<!--
 * @Author: Null
 * @Date: 2022-02-08 08:36:20
 * @Description: 系统设置
-->
<template>
  <div class="header-setting">
    <!-- <MyToolTip content="设置"> -->
    <div class="header-setting-container dk-icon-btn" @click="openDrawer">
      <SvgIcon name="setting" />
    </div>
    <!-- </MyToolTip> -->

    <!-- 设置相关 :before-close="handleClose"-->
    <el-drawer
      size="45%"
      class="header-setting-drawer"
      :visible.sync="showDrawer"
      direction="rtl"
    >
      <!-- 设置drawer标题 -->
      <div slot="title" flex="cross:center">
        <SvgIcon name="setting" />
        <span class="dk-ml-4 dk-f1-title">设置</span>

        <!-- 设置弹窗的样式设置按钮 -->
        <MyToolTip content="设置弹窗样式按钮">
          <span class="dk-ml-16" @click="closeSettingStyleDialog(true)">
            <SvgIcon name="edit" class-name="header-setting-drawer__editbtn" />
          </span>
        </MyToolTip>
      </div>
      <div
        v-if="showDrawer && showSettingTabs"
        class="header-setting-drawer__content dk-plr-10"
      >
        <el-tabs v-model="activeName" :tab-position="panelTabsPosition">
          <el-tab-pane label="个人中心" name="个人中心">
            <TabItemCom slot="label" name="approval" title="个人中心" />
            <PersonalCenter />
          </el-tab-pane>
          <el-tab-pane label="主题设置" name="主题设置">
            <TabItemCom slot="label" name="theme" title="主题设置" />
            <SystemTheme />
          </el-tab-pane>
          <!-- <el-tab-pane label="系统设置" name="系统设置">
            <TabItemCom slot="label" name="cogs" title="系统设置" />
            系统设置
          </el-tab-pane>
          <el-tab-pane label="安全设置" name="安全设置">
            <TabItemCom slot="label" name="safe" title="安全设置" />
            安全设置
          </el-tab-pane>
          <el-tab-pane label="热键设置" name="热键设置">
            <TabItemCom slot="label" name="keyboard" title="热键设置" />
            <Hotkeys />
          </el-tab-pane>
          <el-tab-pane label="表格设置" name="表格设置">
            <TabItemCom slot="label" name="table" title="表格设置" />
            表格设置
          </el-tab-pane> -->
          <el-tab-pane label="关于系统" name="关于系统">
            <TabItemCom slot="label" name="exclamation" title="关于系统" />
            <AboutSystem />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>

    <!-- 设置样式弹窗 -->
    <SettingStyle
      :show-dialog="settingStyleDialogshow"
      @closeDialog="closeSettingStyleDialog"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import util from '@/libs/util'

export default {
  name: 'Setting', // 设置
  components: {
    SettingStyle: () => import('./components/SettingStyle.vue'),
    TabItemCom: () => import('./components/TabItemCom.vue'),
    AboutSystem: () => import('./components/AboutSystem.vue'),
    // Hotkeys: () => import('./components/Hotkeys.vue'),
    PersonalCenter: () => import('./components/PersonalCenter.vue'),
    SystemTheme: () => import('./components/SystemTheme.vue')
  },
  data () {
    return {
      showDrawer: false,
      showSettingTabs: false,
      activeName: '', // tabs 选中的标签页
      settingStyleDialogshow: false // 设置drawer样式弹窗
    }
  },
  computed: {
    ...mapState('settingsPanel/panelStyle', ['panelTabsPosition', 'panelTabsItem', 'showSettingDrawerCount'])
  },
  watch: {
    showSettingDrawerCount: function (newVal) {
      console.log('获取到新值', newVal)
      this.openDrawer()
    }
  },
  methods: {
    // ...mapMutations('settingsPanel/panelStyle', ['SET_SHOW_SETTING_DRAWER']),

    // 关闭抽屉前提醒
    handleClose (done) {
      this.$confirm('是否保存设置？')
        .then((res) => {
          done()
        })
        .catch((res) => {})
    },
    // 打开抽屉
    openDrawer () {
      const that = this
      that.showDrawer = !that.showDrawer
      setTimeout(() => {
        that.showSettingTabs = true
        that.activeName = '个人中心'
      }, 10)
    },
    // 关闭抽屉样式得弹窗
    closeSettingStyleDialog (bool) {
      console.log('closeSettingStyleDialog', bool)
      this.settingStyleDialogshow = bool
    }
  }
}
</script>

<style lang="scss">
.header-setting {
    height: 100%;
  &-container {
    width: $header-icon-btn-width;
    height: 100%;
  }
  &-drawer {
    .el-drawer__header {
      margin-bottom: 10px;
      padding: 10px 0 0 10px;
    }
    &__content {
      font-size: 16px;
      .el-tabs__content{
        height: calc(100vh - 110px);
        // div{
        //   height: 100%;
        // }
      }
      .el-tabs__nav-next {
        right: 0px;
        top: -1px;
       }
      .el-tabs__nav-next, .el-tabs__nav-prev {
        font-size: 14px;
       }
    }
    &__editbtn {
      width: 1rem;
      height: 1rem;
      color: gray;
    }
    .el-tabs__item {
      font-size: 15px;
    }
  }
}
</style>
