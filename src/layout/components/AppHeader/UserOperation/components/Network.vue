<!--
 * @Author: Null
 * @Date: 2022-11-30 15:00:52
 * @Description: 网络
-->
<template>
  <el-popover class="Network" placement="bottom" width="250" trigger="click" @show="hoverHandler">
    <div
      slot="reference"
      title="当前网络"
      :class="['Network-container dk-icon-btn',
               connection.effectiveType==='2g'?'netWork-2g':
               connection.effectiveType==='3g'?'netWork-3g':
               connection.effectiveType==='4g'?'netWork-4g':
               connection.effectiveType==='5g'?'netWork-5g':'netWork-no']"
    >{{ connection.effectiveType || '无' }}</div>
    <div class="Network-content">
      <div
        v-for="(item,index) in Object.keys(connection)"
        :key="index"
        class="Network-content__box"
      >
        <span class="Network-content__box-title">{{ labelObj[item]['title'] }}</span>
        <span class="Network-content__box-content">
          {{ connection[item] || '无' }}
          <span
            class="Network-content__box-content-unit"
          >{{ labelObj[item]['unit'] }}</span>
        </span>
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
      showMessageBoard: false,
      labelObj: {
        effectiveType: {
          title: '有效网络连接类型:'
        },
        downlink: {
          title: '估算的下行速度/带宽:',
          unit: 'Mb/s'
        },
        rtt: {
          title: '打开请求数据保护模式:',
          unit: 'ms'
        },
        saveDate: {
          title: '打开请求数据保护模式:'
        }
      }
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
    font-weight: bold;
    font-size: 16px;
  }
  &-content {
    &__box {
      padding-bottom: 4px;
      &-title {
        color: #999;
      }
      &-content {
        font-weight: bold;
        font-size: 16px;
        margin-left: 6px;
        &-unit {
          font-size: 12px;
          font-weight: 400;
          color: #67c23a;
        }
      }
    }
  }
}

/*
#FF8F8F  none
#E6A23C  2g
#3898FF 3g
#67C23A 4g
#DA91F4 5g
*/
.netWork-no {
  color: #ff8f8f;
}
.netWork-2g {
  color: #e6a23c;
}
.netWork-3g {
  color: #3898ff;
}
.netWork-4g {
  color: #67c23a;
}
.netWork-5g {
  color: #da91f4;
}
</style>
