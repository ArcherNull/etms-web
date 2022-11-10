/*
 * @Author: Null
 * @Date: 2022-01-25 16:38:35
 * @Description: 存放elementUi组件公用的属性或方法
 */

// 一级标题前的色块背景
export const titleBgColor = {
  info: '#3898ff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#ff8f8f'
}

const elementUICommon = {
  // el-date-picker 标签 type="date" 只选择年月日的快捷面板options
  datePickerOptions: {
    disabledDate (time) {
      return time.getTime() > Date.now()
    },
    shortcuts: [
      {
        text: '今天',
        onClick (picker) {
          picker.$emit('pick', new Date())
        }
      },
      {
        text: '昨天',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      },
      {
        text: '一周前',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }
    ]
  },
  // el-date-picker 标签 type="monthrange" 只选择年月日的快捷面板options
  monthPickerOptions: {
    shortcuts: [
      {
        text: '本月',
        onClick (picker) {
          picker.$emit('pick', [new Date(), new Date()])
        }
      },
      {
        text: '今年至今',
        onClick (picker) {
          const end = new Date()
          const start = new Date(new Date().getFullYear(), 0)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近六个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setMonth(start.getMonth() - 6)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  },
  // el-date-picker 标签 type="datetimerange" 或者 type="daterange" 只选择年月日的快捷面板options
  datetimerangePickerOptions: {
    shortcuts: [
      {
        text: '最近一周',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }
    ]
  },

  // el-button不同按钮的颜色
  elBtnStyle: {
    // 用于普通按钮
    normal: {
      color: '#666'
    },
    // 用于资质审核、立即运行、费用计算、重新计费、（计划任务管理）
    waitCheck: {
      backgroundColor: '#fff',
      borderColor: '#3898ff',
      color: '#3898ff'
    },
    // 用于财务审核、审核、启动（计划任务）、进票签收
    needCheck: {
      backgroundColor: '#fff',
      borderColor: '#67c23a',
      color: '#67c23a'
    },
    // 用于警示类操作、如取消账单、取消申请、付款、不开票等
    warning: {
      backgroundColor: '#fff',
      borderColor: '#e6a23c',
      color: '#e6a23c'
    },
    // 用于危险类操作、如删除、禁止、否决、打回、停止等
    danger: {
      backgroundColor: '#fff',
      borderColor: '#ff8f8f',
      color: '#ff8f8f'
    }
  }
}

export default elementUICommon
