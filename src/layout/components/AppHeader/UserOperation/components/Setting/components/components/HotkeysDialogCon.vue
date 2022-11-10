<!--
 * @Author: Null
 * @Date: 2022-03-21 08:53:33
 * @Description: 固定可设置的快捷键
-->
<template>
  <div class="HotkeysDialogCon">
    <HotkeysDiaItem
      :hotkeys-item="currentSelected"
      :selected-hotkeys="selectedHotkeys"
    />
    <div
      v-for="(item, index) in hotkeysList"
      :key="index"
      class="HotkeysDialogCon_item"
    >
      <HotkeysDiaItem
        :hotkeys-item="item"
        :selected-hotkeys="selectedHotkeys"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotkeysDialogCon',
  components: {
    HotkeysDiaItem: () => import('./HotkeysDiaItem.vue')
  },
  props: {
    currentSelected: {
      type: Object,
      require: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isCustom: false, // 是否自定义
      hotkeysList: [
        {
          title: '辅助键',
          slotList: ['ctrl', 'shift', 'alt']
        },
        {
          title: '功能键',
          slotList: ['f6', 'f7', 'f8', 'f9', 'f10', 'f11']
        },
        {
          title: '数字',
          slotList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
          title: '字母',
          slotList: ['q', 'w', 't', 'j', 'k', 'l', 's', 'n', 'p']
        }
      ]
    }
  },
  computed: {
    selectedHotkeys () {
      if (this.isCustom) {
        return []
      } else {
        return this.currentSelected.slotList
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.HotkeysDialogCon {
  padding: 5px 0;
}
</style>
