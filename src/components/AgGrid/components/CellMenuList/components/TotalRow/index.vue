<!--
 * @Author: Null
 * @Date: 2022-11-30 08:34:24
 * @Description:
-->
<template>
  <div class="TotalRow">
    <div class="TotalRow-left">
      <LabelBox v-for="(item,index) in tableTotalList" :key="index" v-bind="item" />
    </div>
    <div class="TotalRow-right" @click="dealTableTotalList()">
      <LabelBox />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalRow',
  components: {
    LabelBox: () => import('./components/LabelBox.vue')
  },
  props: {
    tableDataTotal: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      tableTotalList: []
    }
  },
  watch: {
    tableDataTotal: {
      handler (newVal) {
        if (newVal) {
          this.tableTotalList = this.dealTableTotalList(newVal)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    dealTableTotalList (val) {
      const keys = Object.keys(val)
      if (keys?.length) {
        const titleObj = {
          tableRowData: {
            title: '总',
            color: '#FF8F8F'
          },
          filterRowData: {
            title: '筛',
            color: '#E6A23C'
          },
          selectRowData: {
            title: '选',
            color: '#3898FF'
          }
        }
        const arr = keys.map((ele) => {
          const itemObj = titleObj[ele]
          return {
            title: itemObj.title || 'X',
            color: itemObj.color || '#333',
            content: val[ele]
          }
        })
        return arr
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.TotalRow {
  width: 100%;
  padding: 0px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
