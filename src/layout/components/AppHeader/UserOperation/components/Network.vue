<!--
 * @Author: Null
 * @Date: 2022-11-30 15:00:52
 * @Description: 网络
-->
<template>
  <el-popover class="Network" placement="bottom" width="250" trigger="click" @show="hoverHandler">
    <div slot="reference" class="Network-container dk-icon-btn">Network</div>
    <div class="Network-content">
      <div class="Network-content__text">
        有效网络连接类型: {{ connection.effectiveType }}
      </div>
      <div class="Network-content__text">
        估算的下行速度/带宽: {{ connection.downlink }}
      </div>
      <div class="Network-content__text">
        估算往返时间: {{ connection.rtt }}ms
      </div>
      <div class="Network-content__text">
        打开请求数据保护模式: {{ connection.saveDate || '无' }}
      </div>
    </div>
  </el-popover>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Network',
  data () {
    return {
      showMessageBoard: false
    }
  },
  computed: {
    ...mapState('setting/network', ['connection'])
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
.Network {
  height: 100%;
  &-container {
    width: $header-icon-btn-width;
    height: 100%;
  }
}
</style>
