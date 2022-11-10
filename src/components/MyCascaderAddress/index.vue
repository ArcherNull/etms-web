<!--
 * @Author: Null
 * @Date: 2022-06-07 08:36:06
 * @Description: 省市区地址级联框
-->
<template>
  <MyCascader ref="MyCascader" v-model="value" :props="props" :options="options" @change="changeFun" />
</template>

<script>
import pcaRegion from '@/assets/json/pcaRegion.json'
import pcRegion from '@/assets/json/pcRegion.json'
import province from '@/assets/json/province.json'
import city from '@/assets/json/city.json'
import area from '@/assets/json/area.json'
// import { getChildrenObject } from '@/common/commFun.js'

export default {
  name: 'MyCascaderAddress',
  props: {
    // 表示地址类型， pca表示省市区；pc表示只有省市; p表示只有省 ; c表示只有市; a表示只有区
    type: {
      type: String,
      default: 'pca'
    },
    // 获取的值
    defaultValue: {
      type: Array,
      default: () => []
    },
    // 获取子节点的数据
    getCheckedNodes: {
      type: [Function, String],
      default: ''
    }
  },
  data () {
    return {
      props: {
        value: 'id',
        label: 'fullname'
      },
      value: '', // 获取默认值
      options: []
    }
  },
  watch: {
    defaultValue: {
      handler (newVal) {
        if (newVal) {
          this.value = newVal
        } else {
          this.value = []
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.options = this.judgeOptionsType()
  },
  methods: {
    // 级联框选中的数据
    changeFun (ele) {
      console.log('级联框选中的数据=====>', ele)
      this.$emit('change', ele)
      if (this.getCheckedNodes) {
        this.$nextTick(() => {
          const node = this.$refs?.MyCascader?.$children[0]?.getCheckedNodes() || []
          console.log('获取省市区的子节点数据===>', node)
          typeof this.getCheckedNodes === 'function' && this.getCheckedNodes(() => node)
        })
      }
    },
    // 判断options的类型
    judgeOptionsType () {
      if (this.type === 'pca') {
        return pcaRegion
      } else if (this.type === 'pc') {
        return pcRegion
      } else if (this.type === 'p') {
        return province
      } else if (this.type === 'c') {
        return city
      } else if (this.type === 'a') {
        return area
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

