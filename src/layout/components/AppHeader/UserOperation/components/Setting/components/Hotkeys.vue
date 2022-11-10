<!--
 * @Author: Null
 * @Date: 2022-03-05 09:39:57
 * @Description: 设置--热键设置
-->

<template>
  <div class="Hotkeys">
    <MyDescriptions
      :column="2"
      :border="true"
      title="常用热键"
      :descriptions-list="systemInfoList"
    />

    <!-- 修改快捷键 -->
    <MyDialog
      :visible="dialogVisible"
      :modal="false"
      :before-close="() => (dialogVisible = false)"
      @closeDrawer="dialogVisible = false"
    >
      <div slot="title">{{ hotkeysDialogTitle }}</div>
      <div slot="content">
        <HotkeysDialogCon :current-selected="currentSelected" />
      </div>
      <div slot="footer">
        <MyButton @click="dialogVisible = false">取 消</MyButton>
        <MyButton type="primary" @click="dialogVisible = false">确 定</MyButton>
      </div>
    </MyDialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Hotkeys',
  components: {
    HotkeysDialogCon: () => import('./components/HotkeysDialogCon.vue')
  },
  data () {
    return {
      dialogVisible: false,
      hotkeysDialogTitle: '快捷键设置',
      // 当前快捷键选中
      currentSelected: {}
    }
  },
  computed: {
    ...mapState('settingsPanel/hotkeys', [
      'hotkeysShowSettingsPanel',
      'hotkeyShowNotice',
      'hotkeyShowSearch',
      'shortcutPanel'
    ]),
    ...mapState('settingsPanel/panelStyle', ['showSettingDrawerCount']),
    ...mapState('searchAll/searchAllDialog', ['showSearchAllDialogCount']),

    systemInfoList () {
      return [
        {
          label: '设置弹窗',
          content: this.hotkeysShowSettingsPanel,
          helpMessage: `累计点击${this.showSettingDrawerCount}次`,
          contentAfterBtn: [
            {
              icon: 'el-icon-edit',
              class: 'Hotkeys-contentAfterBtn',
              click: () => {
                this.editHotkeys(0)
              }
            }
          ]
        },
        {
          label: '消息通知',
          content: this.hotkeyShowNotice,
          helpMessage: `累计点击${this.showSearchAllDialogCount}次`,
          contentAfterBtn: [
            {
              icon: 'el-icon-edit',
              class: 'Hotkeys-contentAfterBtn',
              click: () => {
                this.editHotkeys(1)
              }
            }
          ]
        },
        {
          label: '全局搜索面板',
          content: this.hotkeyShowSearch,
          contentAfterBtn: [
            {
              icon: 'el-icon-edit',
              class: 'Hotkeys-contentAfterBtn',
              click: () => {
                this.editHotkeys(2)
              }
            }
          ]
        },
        {
          label: '快捷面板',
          content: this.shortcutPanel,
          contentAfterBtn: [
            {
              icon: 'el-icon-edit',
              class: 'Hotkeys-contentAfterBtn',
              click: () => {
                this.editHotkeys(3)
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    editHotkeys (index) {
      const current = this.systemInfoList[index]
      this.hotkeysDialogTitle = `${current.label}-快捷键设置`
      const slotList = current.content.split('+')
      this.currentSelected = {
        title: '当前选择',
        slotList: slotList,
        helpMessage: '最多只能输入三个快捷键',
        btnList: [
          {
            btnText: '自定义',
            type: 'text'
          }
        ]
      }
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.Hotkeys-contentAfterBtn {
  margin-left: 20px;
  padding: 0;
}
</style>
