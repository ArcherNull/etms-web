<!--
 * @Author: Null
 * @Date: 2022-11-30 08:34:24
 * @Description:
-->
<template>
  <div class="TotalRow">
    <div class="TotalRow-left">
      <LabelBox
        v-for="(item,index) in tableTotalLeftList"
        :key="index"
        :label-item="item"
        @clickFun="clickFun"
      />
    </div>
    <div class="TotalRow-right">
      <LabelBox v-for="(item,index) in tableTotalRightList" :key="index" :label-item="item" />
    </div>
  </div>
</template>

<script>
import { isArray, isEmpty, cloneDeep } from 'lodash'
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
      tableTotalLeftList: [],
      tableTotalRightList: [],
      jumpSelectedRows: [], // 用于跳转行数据位置
      jumpToColumnsArr: [], // 用于跳转列数据位置
      jumpColIntervalPo: -1 // 记录已经跳转的位置
    }
  },
  watch: {
    tableDataTotal: {
      handler (newVal) {
        if (newVal) {
          this.initTableTotal(newVal)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initTableTotal (newVal) {
      this.initData()
      this.tableTotalLeftList = this.dealTableTotalLeftList(newVal)
      this.tableTotalRightList = []
    },
    initData () {
      this.jumpSelectedRows = []
      this.jumpToColumnsArr = []
      this.jumpColIntervalPo = -1
    },
    // 左侧
    dealTableTotalLeftList (val) {
      const keys = Object.keys(val)
      if (keys?.length) {
        const LeftNumArr = this.dealTableTotalLeftNum(val)
        const LeftPinnedArr = this.dealTableTotalLeftPinned(val)
        return [...LeftNumArr, ...LeftPinnedArr]
      } else {
        return []
      }
    },
    // 数字定位数据
    dealTableTotalLeftNum (val) {
      const titleObj = {
        tableRowDataLength: {
          title: '后端返回的总数据',
          color: '#FF8F8F'
        },
        filterRowDataLength: {
          title: '表格网格中筛选过后的数据',
          color: '#E6A23C'
        },
        selectedRowDataLength: {
          title: '表格网格中选中过后的数据',
          color: '#3898FF'
        },
        columnDefsLength: {
          title: '列数据最大长度',
          color: '#7CCDF0'
        },
        rowPosition: {
          title: '当前单元格所处行位置',
          color: '#DA91F4'
        },
        colPosition: {
          title: '当前单元格所处列位置',
          color: '#78E6D8'
        }
      }
      const displayKeys = Object.keys(titleObj)
      const arr = displayKeys.map((ele) => {
        const itemObj = titleObj[ele]
        return {
          title: itemObj.title || 'X',
          color: itemObj.color || '#333',
          field: ele,
          content: val[ele]
        }
      })
      return arr
    },
    // 单元格固定状态
    dealTableTotalLeftPinned (val) {
      const titleObj = {
        colPinnedPosition: {
          title: '列固定位置,L【left】:固定于左侧; R【right】:固定于右侧; N【normal】:表示正常',
          color: '#FF8F8F'
        },
        rowPinnedPosition: {
          title: '行固定位置,T【top】:固定于顶部; B【bottom】:固定于底部; N【normal】:表示正常',
          color: '#E6A23C'
        }
      }
      const displayKeys = Object.keys(titleObj)
      const arr = displayKeys.map((ele) => {
        const itemObj = titleObj[ele]
        const getContent = (val) => {
          if (val) {
            return val?.slice(0, 1)?.toUpperCase()
          } else {
            return 'N'
          }
        }

        console.log('val[ele]', val[ele])
        return {
          title: itemObj.title || 'X',
          color: itemObj.color || '#333',
          field: ele,
          content: getContent(val[ele])
        }
      })
      return arr
    },
    // 右侧
    dealTableTotalRightList (val) {
      const keys = Object.keys(val)
      if (keys?.length) {
        const titleObj = {
          rowPosition: {
            title: '行',
            color: '#FF8F8F'
          },
          colPosition: {
            title: '列',
            color: '#E6A23C'
          }
        }
        const displayKeys = Object.keys(titleObj)
        const arr = displayKeys.map((ele) => {
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
    },
    // 点击事件
    clickFun (item) {
      console.log('点击事件', item)
      switch (item.field) {
        case 'filterRowDataLength':
          this.setFilterRowData()
          break
        case 'selectedRowDataLength':
          this.jumpSelectedRowData()
          break
        case 'columnDefsLength':
          this.jumpToColumns()
          break
      }
    },
    // 选中行跳转
    jumpSelectedRowData () {
      console.log('选中行跳转')
      const { selectedRowData, selectedRowDataLength, jumpToRow } = this.tableDataTotal
      if (this.jumpSelectedRows.length) {
        const shiftData = this.jumpSelectedRows.shift()

        console.log('this.jumpSelectedRows', this.jumpSelectedRows)
        console.log('选中行跳转位置=====>', shiftData.numericalOrder)
        this.$message.info(`选中行跳转表新的行位置【${shiftData.numericalOrder}】`)
        jumpToRow(shiftData.numericalOrder - 1)
      } else {
        if (selectedRowDataLength !== 0 && isArray(selectedRowData) && !isEmpty(selectedRowData)) {
          console.log('selectedRowData=====>', selectedRowData)
          this.jumpSelectedRows = cloneDeep(selectedRowData)
          this.jumpSelectedRowData()
        } else {
          this.$message.warning(`未选中行数据`)
        }
      }
    },
    // 选中列跳转 ，跟据当前单元格列向后为间隔4的跳转,也就是以4为等分划分
    jumpToColumns () {
      console.log('选中行跳转')
      const { columnDefsLength, colPosition, jumpToCol } = this.tableDataTotal
      const jumpFun = (num) => {
        const findIndex = this.jumpToColumnsArr.findIndex(item => item > num)
        const jumpNum = this.jumpToColumnsArr[findIndex]

        console.log('jumpNum=====>', jumpNum)
        this.$message.info(`选中列跳转表新的列位置【${jumpNum}】`)

        if (findIndex === this.jumpToColumnsArr.length - 1) {
          this.jumpColIntervalPo = -1
        } else {
          this.jumpColIntervalPo = findIndex
        }
        jumpToCol(jumpNum)
      }
      if (this.jumpToColumnsArr.length) {
        const ind = this.jumpColIntervalPo === -1 ? 0 : this.jumpColIntervalPo
        jumpFun(this.jumpToColumnsArr[ind] + 1)
      } else {
        const interval = 4
        // 列长度要比间隔大
        if (columnDefsLength > interval) {
          const intervalLev = Math.floor(columnDefsLength / interval)

          // 加上头部0， 尾部columnDefsLength
          const jumpToColumnsArr = []
          for (let i = 0; i <= intervalLev; i++) {
            jumpToColumnsArr.push(interval * i)
          }
          if (columnDefsLength[intervalLev] < columnDefsLength) {
            jumpToColumnsArr.push(columnDefsLength)
          }
          this.jumpToColumnsArr = jumpToColumnsArr
          jumpFun(colPosition)
        }
      }
    },
    // 重置筛选
    setFilterRowData () {
      console.log('重置筛选')
      this.tableDataTotal.setFilterModel(null)
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
  &-left,
  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
