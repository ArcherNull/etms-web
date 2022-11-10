<!--
 * @Author: Null
 * @Date: 2022-02-14 13:56:04
 * @Description: 设置---tabs-item组件
-->
<template>
  <div class="tabItem">
    <SvgIcon v-if="panelTabsItem.includes('text')" :name="name" />
    <span v-if="panelTabsItem.includes('icon')" class="tabItem__title">
      {{ title }}
    </span>
    <!-- 提示 -->
    <span class="tabItem__notice" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TabItemCom',
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'tab-item'
    }
  },
  computed: {
    ...mapState('settingsPanel/panelStyle', ['panelTabsItem'])

  }
}
</script>

<style lang="scss" scoped>
.tabItem {
  position: relative;
  &__title {
    @extend %unable-select;
  }
  &__notice {
    width: 10px;
    height: 10px;

  }
}
</style>
