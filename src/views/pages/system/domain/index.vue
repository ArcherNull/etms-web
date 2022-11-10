<!--
 * @Author: Null
 * @Date: 2021-12-29 14:50:44
 * @Description: 系统管理--域名管理
-->

<template>
  <div>
    <div>样式处理</div>
    <div class="testDiv" :class="{ border: test }">
      测试1--class动态绑定对象方式
    </div>
    <div :class="['testDiv', test ? 'border' : '']">
      测试2--class动态绑定数组方式
    </div>
    <div class="testDiv" :class="{ border: test?'solid 1px #f00':'', color:test?'yellow':'' }">测试3--class绑定单个样式【不规范，只能绑定border样式】</div>

    <div class="testDiv" :style="{ border: test?'solid 1px #f00':'' , color:test?'pink':'' }">测试4--绑定单个样式</div>

    <div class="testDiv" :style="test? borderObj:{}">测试5--绑定样式对象</div>

    <MyGrid />

    <el-input v-model="value" @change.native.prevent="search" />
    <el-input v-model="value1" @keyup.enter.native="search" />

  </div>
</template>

<script>
import { evaluate } from '@/common/math'
export default {
  name: 'Domain',
  data () {
    return {
      test: true,
      borderObj: {
        border: 'solid 1px #f00',
        color: 'green',
        fontWeight: 'bold'
      },
      value: '',
      value1: ''
    }
  },
  created () {
    const value = evaluate('12.7 cm to inch')
    console.log('12.7 cm to inch', value)
  },
  methods: {
    search (ele) {
      console.log('输入的值', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.testDiv {
  margin-bottom: 10px;
  &.border {
    border: solid 1px #f00;
  }
}
</style>
