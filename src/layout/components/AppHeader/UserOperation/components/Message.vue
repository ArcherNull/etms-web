<!--
 * @Author: Null
 * @Date: 2022-02-08 08:36:20
 * @Description: 消息通知
-->
<template>
  <el-popover
    class="header-message"
    placement="bottom"
    width="300"
    trigger="click"
    @show="hoverHandler"
  >
    <div slot="reference" class="header-message-container dk-icon-btn">
      <el-badge :is-dot="tipsNum">
        <SvgIcon name="news" />
      </el-badge>
    </div>

    <el-tabs
      v-if="showMessageBoard"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="通知" name="通知"> 通知 </el-tab-pane>
      <el-tab-pane label="公告" name="公告"> 公告 </el-tab-pane>
      <el-tab-pane label="单证中心" name="单证中心"> 单证中心 </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      activeName: '通知',
      tipsNum: false,
      showMessageBoard: false
    }
  },
  methods: {
    hoverHandler () {
      this.showMessageBoard = true
    },
    handleClick (ele) {
      console.log('handleClick', ele)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-message {
  height: 100%;
  &-container {
    width: $header-icon-btn-width;
    height: 100%;
  }
}
</style>
