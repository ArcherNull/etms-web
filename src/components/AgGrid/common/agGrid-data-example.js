/*
 * @Author: Null
 * @Date: 2022-02-22 15:36:26
 * @Description: ag-grid 表格假数据展示示例
 */

// import { ProficiencyFilter } from './test/proficiencyFilter'
import { NumberFloatingFilterComponent } from './test/numberFloatingFilterComponent'
import { SexFilter } from './test/SexFilter'

/**
 * @description: 该文件为调试ag-grid所存在的假数据文件，可以当作后续定制化表格作为借鉴
 */

/* ************ 生成行列头数据方法  ************** */
export const columnDefs = [
  // 首列全选或单选列
  // {
  //   headerName: '#',
  //   field: 'numericalOrder',
  //   width: 120,
  //   // initialPinned: 'left', // 固定在左方
  //   pinned: 'left', // 固定在左侧
  //   lockPosition: true, // 锁定位置，默认为false,该属性设置为true时，拖拽列无效；如果不设置pinned: 'right', 默认展示在最左方
  //   checkboxSelection: true, // 设置当前列有可选项
  //   filter: false,
  //   headerCheckboxSelection: true,
  //   headerCheckboxSelectionFilteredOnly: true
  // },
  {
    headerName: '姓名',
    field: 'name',
    pinned: 'left', // 固定在左侧
    headerComponentParams: { menuIcon: 'fa-cog' },

    // checkboxSelection: true, // 单行的单个复选框
    // tooltipField: 'status',
    // sortable: false, // false禁止排序, true允许排序
    // comparator: dateComparator, // 自定义排序，dateComparator为排序方法名
    // 给单元格添加特定的其他标签
    cellRenderer: function (params) {
      const getDom = (color = '#E6A23C') => {
        return (
          `<span style="background-color:${color};display:inline-block;width:5px;height:5px;border-radius:5px;margin-right:5px;margin-bottom:2px"></span>` +
          params.value
        )
      }
      if (params.value === '李四') {
        return getDom('#E6A23C')
      } else if (params.value === '王五') {
        return getDom('#ffffff')
      } else {
        return params.value
      }
    },
    // 单元格样式颜色
    cellStyle: function (params) {
      let color = '#25262e'
      if (params.value === '张三') {
        color = '#b4b61a'
      } else if (params.value === '李四') {
        color = '#3a65ff'
      } else if (params.value === '王五') {
        color = '#1AB66C'
      } else if (params.value === '王五3') {
        color = '#DC143C'
      } else if (params.value === '') {
        color = '#ffffff'
      }
      return { color: '#fff', background: color }
    },

    tooltipValueGetter: function (params) {
      return params.value === '王五2' ? '更改王五2' : params.value
    },
    // 单元格数据过滤
    valueFormatter: function (params) {
      // console.log('params', params)
      return params.value === '王五4' ? '更改王五4' : params.value
    }
  },
  {
    headerName: '性别',
    field: 'sex',
    editable: true,
    cellEditor: 'agSelectCellEditor', // 编辑时 显示下拉列表
    cellEditorParams: { values: ['男', '女'] },
    filter: SexFilter
  },
  {
    headerName: '年龄年龄龄年龄年龄',
    field: 'age',
    sort: 'desc'
  },
  {
    headerName: '年龄1',
    field: 'age1',
    sort: 'desc'
  },
  {
    headerName: '年龄之和',
    field: 'age2',
    sort: 'desc',
    cellRenderer: (params) => {
      return Number(params.data.age) + Number(params.data.age1)
    }
  },
  {
    headerName: '籍贯',
    field: 'jg',
    // floatingFilter: true,
    filterParams: {
      buttons: ['apply', 'reset'],
      closeOnApply: true
    }
  },
  {
    headerName: '省份',
    field: 'sf',
    tooltipField: 'sf',
    tooltipComponentParams: { color: '#ececec' },
    filter: 'agNumberColumnFilter',
    suppressMenu: true,
    floatingFilterComponent: NumberFloatingFilterComponent,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
      color: 'red'
    }
  },
  {
    headerName: '地址',
    field: 'dz',
    // floatingFilter: true,
    tooltipField: 'dz',
    editable: true, // 如果defaultColDef未全局声明editable: true,单个的列想用，就必须单独声明
    cellEditor: 'agLargeTextCellEditor', // 编辑时 显示长文本框
    cellEditorParams: {
      maxLength: '100', // 能输入的文本长度限制
      cols: '50', // 显示为10宽度
      rows: '2' // 显示为1行的高度
    }
  },
  {
    headerName: '时间',
    field: 'date'
    /*     children: [
        {
          headerName: '创建时间',
          children: [
            {
              headerName: '时间1',
              field: 'date',
              filter: 'agDateColumnFilter'
            },
            {
              headerName: '时间2',
              field: 'date',
              filter: 'agDateColumnFilter'
            }
          ]

        },
        {
          headerName: '开始时间',
          field: 'date'
        },
        {
          headerName: '结束时间',
          field: 'date'
        }
      ] */
  }
  // { headerName: '操作',
  //   field: 'agTableOperation',
  //   pinned: 'right', // 固定在左侧
  //   lockPosition: true,
  //   cellRendererFramework: 'BtnList',
  //   width: 200
  // }
]
/* ************ 生成列头数据  ************** */

/* ************ 生成行列假数据方法 ， 执行 getRowData()方法即可 ************** */
export const rowData = {
  // 获取0-9的随机数
  getRandom9 () {
    const randNum = Math.random()
    const random_1 = randNum + ''
    const age = (randNum * 100).toFixed(2)
    const age1 = (randNum * 500).toFixed(2)
    const sex = random_1 > 0.5 ? '男' : '女'
    const ran = random_1.charAt(3)
    // console.log("随机数ran", ran);
    return { ran, sex, age, age1 }
  },
  // 生成随机时间
  getRandomDate () {
    var maxdaterandom = new Date().getTime()
    // 由于当前环境为北京GMT+8时区，所以与GMT有8个小时的差值
    var mindaterandom = new Date(1970, 0, 1, 8).getTime()
    var randomdate = this.getRandom(mindaterandom, maxdaterandom)
    const ranDate = new Date(randomdate)
    const year = ranDate.getFullYear()
    const mon = ranDate.getMonth() + 1
    const month = mon < 10 ? '0' + mon : mon
    const day =
      ranDate.getDate() < 10 ? '0' + ranDate.getDate() : ranDate.getDate()
    var dateStr = `${year}-${month}-${day}`
    // console.log(dateStr);
    return dateStr
  },
  // 生成随机时间的随机数
  getRandom (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  // 获取行单元格数据
  getRowData () {
    const item = {
      name: '王五',
      sex: '男',
      age: '35',
      jg: '中国',
      sf: '浙江',
      dz: '杭州市古墩路12号',
      date: '2021-10-06'
    }
    const nameArr = [
      '张三',
      '李四',
      '王五',
      '王五1',
      '王五2',
      '王五3',
      '王五4',
      '王五5',
      '王五6',
      '王五7'
    ]
    const newData = []
    for (let i = 0; i < 999; i++) {
      const cell = JSON.parse(JSON.stringify(item))
      const random = this.getRandom9()
      cell.age = random.age
      cell.age1 = random.age1
      cell.name = nameArr[random.ran]
      cell.sex = random.sex
      cell.date = this.getRandomDate()
      newData.push(cell)
    }
    // console.log('模拟数据', newData)
    return newData
  }
}
