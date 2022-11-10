<!--
 * @Author: Null
 * @Date: 2022-02-09 10:19:34
 * @Description: 设置样式弹窗表单
-->
<template>
  <div class="settingStyle">
    <MyDialog
      :visible="showDialog"
      width="45%"
      :before-close="handleClose"
    >
      <span slot="title" class="dk-fb-title"> 设置样式更改 </span>
      <div slot="content" class="dialog-content">
        <!-- 设置tabs的定位样式 -->
        <div class="dialog-content__title dk-mt-0">定位样式</div>
        <el-radio-group :value="panelTabsPosition">
          <el-radio-button label="top" @click.native="SET_PANEL_TABS_POSITION('top')">top</el-radio-button>
          <el-radio-button label="right" @click.native="SET_PANEL_TABS_POSITION('right')">right</el-radio-button>
          <el-radio-button label="bottom" @click.native="SET_PANEL_TABS_POSITION('bottom')">bottom</el-radio-button>
          <el-radio-button label="left" @click.native="SET_PANEL_TABS_POSITION('left')">left</el-radio-button>
        </el-radio-group>
        <!-- 无 icon / 无文本 / 有icon及文本 -->
        <div class="dialog-content__title">tabItem样式</div>
        <el-radio-group :value="tabItemData">
          <el-radio-button label="icon" @click.native="SET_PANEL_TABS_ITEM(['text'])">仅icon</el-radio-button>
          <el-radio-button label="text" @click.native="SET_PANEL_TABS_ITEM(['icon'])">仅文本</el-radio-button>
          <el-radio-button label="icontext" @click.native="SET_PANEL_TABS_ITEM(['icon' , 'text'])">icon+文本</el-radio-button>
        </el-radio-group>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </MyDialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'SettingStyle',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('settingsPanel/panelStyle', ['panelTabsPosition', 'panelTabsItem', 'openMeasurePixel']),
    tabItemData () {
      const str = this.panelTabsItem.join('')
      return str
    }
  },
  methods: {
    ...mapMutations('settingsPanel/panelStyle', ['SET_PANEL_TABS_POSITION', 'SET_PANEL_TABS_ITEM']),
    handleClose (ele) {
      this.$emit('closeDialog', false)
    },
    changTabsPanelPosition (ele) {
      console.log('更改tabs的position位置', ele)
      this.SET_PANEL_TABS_POSITION(ele)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-content {
  &__title {
    font-size: 15px;
    color: #333;
    font-weight: bold;
    user-select: none;
    margin: 16px 0 10px 0;
  }
}
</style>
