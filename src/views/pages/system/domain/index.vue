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
    <div
      class="testDiv"
      :class="{
        border: test ? 'solid 1px #f00' : '',
        color: test ? 'yellow' : ''
      }"
    >
      测试3--class绑定单个样式【不规范，只能绑定border样式】
    </div>

    <div
      class="testDiv"
      :style="{
        border: test ? 'solid 1px #f00' : '',
        color: test ? 'pink' : ''
      }"
    >
      测试4--绑定单个样式
    </div>

    <div class="testDiv" :style="test ? borderObj : {}">
      测试5--绑定样式对象
    </div>

    <MyGrid />

    <el-input v-model="value" @change.native.prevent="search" />
    <el-input v-model="value1" @keyup.enter.native="search" />

    <el-cascader :collapse-tags="true" :options="options" :props="props" clearable @change="changeCascader" />
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
      value1: '',
      props: { multiple: true },
      options: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: 2,
              label: '上海',
              children: [
                {
                  value: 3,
                  label: '普陀',
                  children: [
                    {
                      value: 22,
                      label: '上海',
                      children: [
                        { value: 31, label: '普陀' },
                        { value: 41, label: '黄埔' },
                        { value: 52, label: '徐汇' }
                      ]
                    }
                  ]
                },
                {
                  value: 41,
                  label: '黄埔',
                  children: [
                    {
                      value: 2,
                      label: '上海',
                      children: [
                        { value: 354, label: '普陀' },
                        { value: 44, label: '黄埔' },
                        { value: 55, label: '徐汇' }
                      ]
                    }
                  ]
                },
                { value: 5, label: '徐汇' }
              ]
            },
            {
              value: 7,
              label: '江苏',
              children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' }
              ]
            },
            {
              value: 12,
              label: '浙江',
              children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' }
              ]
            }
          ]
        },
        {
          value: 17,
          label: '西北',
          children: [
            {
              value: 18,
              label: '陕西',
              children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' }
              ]
            },
            {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' }
              ]
            }
          ]
        }
      ]
    }
  },
  created () {
    const value = evaluate('12.7 cm to inch')
    console.log('12.7 cm to inch', value)
  },
  methods: {
    search (ele) {
      console.log('输入的值', this.value)
    },
    // 项目部
    changeCascader (ele) {
      console.log('项目部=====>', ele)
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
