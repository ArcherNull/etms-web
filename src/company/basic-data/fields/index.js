/*
 * @Author: Null
 * @Date: 2022-11-09 12:01:42
 * @Description:
 */
import { isEmpty, isArray, isObject } from 'lodash'

export const fieldsConfig = {
  name: '表名', // 表名
  id: '12345', // 表id，表唯一
  company: 'KA', // 所属公司
  permission: '', // 权限码
  path: '/system/task-manage/task-plan', // 所属页面路径，系统路由路径唯一
  pathAnchor: 'right',
  showFirstColumn: true, // 是否展示序号列

  database: {
    name: '姓名',
    sex: '性别',
    age: '年龄',
    age1: '年龄1',
    jg: '籍贯',
    sf: '省份',
    dz: '地址',
    date: '时间'
  },
  // 自定义表格columnDefs,优先级大于database
  columnDefs: [],
  specColumns: [
    {
      headerName: '姓名123',
      field: 'name',
      pinned: 'left', // 固定在左侧
      headerComponentParams: { menuIcon: 'fa-cog' },
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
      }
    },
    {
      headerName: '姓名',
      field: 'name',
      pinned: 'left', // 固定在左侧
      headerComponentParams: { menuIcon: 'fa-cog' },
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
      }
    },
    {
      headerName: '年龄之和',
      field: 'age2',
      afterField: 'age', // 改新增的前端字段，放置于那个字段后
      sort: 'desc',
      cellRenderer: (params) => {
        return Number(params.data.age) + Number(params.data.age1)
      }
    },
    {
      headerName: '年龄之和2',
      field: 'age2',
      afterField: 'age', // 改新增的前端字段，放置于那个字段后
      sort: 'desc',
      cellRenderer: (params) => {
        return Number(params.data.age) + Number(params.data.age1)
      }
    },
    {
      headerName: '年龄之和123',
      field: 'age2',
      afterField: 'age', // 改新增的前端字段，放置于那个字段后
      sort: 'desc',
      cellRenderer: (params) => {
        return Number(params.data.age) + Number(params.data.age1)
      }
    }
  ]
}

// 数据拼装要分为三个步骤走：
// 1、拼装基础数据，headerName , field
// 2、拼装用户自定义字段特征，包含 hide , width , filter , sort , 排序， 单元格样式等特征
// 3、插入页面特定设置，包含末尾固定列操作， 列自定义， 前端自定义生成列

// 采用Promise 链式调用的方式，实现有层级先后顺序执行
// 创建类对象，实现多实例调用

/**
 * @description: 生成列头配置项
 * @param { Object } database 前端存储原始的字段对象
 * @param { Array } oldServerData 存储在服务器中的用户自定义字段
 * @return {*}
 */
export class InitColumnDefs {
  // 序号列
  static FIRST_COLUMN = {
    headerName: '#',
    colId: 'rowNum',
    valueGetter: 'node.id',
    // sort: 'asc',
    // sortable: false,
    filter: false,
    width: 100,
    pinned: 'left', // 固定在左侧
    lockPosition: true, // 锁定位置，默认为false,该属性设置为true时，拖拽列无效；如果不设置pinned: 'right', 默认展示在最左方
    checkboxSelection: true, // 设置当前列有可选项=
    headerCheckboxSelection: true,
    cellRenderer: (params) => Number(params.value) + 1
  }

  constructor (fieldsConfig, oldServerData) {
    const { database, columnDefs, showFirstColumn, specColumns } = fieldsConfig

    if (!isEmpty(database)) {
      if (oldServerData?.length) {
        console.log('oldServerData', oldServerData)
      } else {
        if (isEmpty(columnDefs)) {
          let colDefs = []
          if (isEmpty(specColumns)) {
            colDefs = this.initColDefs(database)
            showFirstColumn && colDefs.unshift(this.FIRST_COLUMN)
          } else {
            colDefs = this.dealSpecColumns(database, specColumns)
          }
          return colDefs
        } else {
          showFirstColumn && columnDefs.unshift(this.FIRST_COLUMN)
          return columnDefs
        }
      }
    } else {
      console.error('database是必传字段,且不能为空')
    }
  }
  // 获取基础的列头数据
  initColDefs (database, supplyColumns, insertColumns) {
    console.log('database', database)
    console.log('supplyColumns', supplyColumns)
    if (isObject(database) && !isEmpty(database)) {
      const colDefs = []
      Object.keys(database).forEach((item) => {
        let findItem = []
        // 补充列
        if (isArray(supplyColumns) && !isEmpty(supplyColumns)) {
          findItem = supplyColumns?.filter((ele) => ele.field === item)
        }
        const obj = {
          headerName: database[item],
          field: item
        }
        console.log('findItem=====>', findItem)
        // 如果存在补充列，那么headerName跟补充列保持一致
        if (!isEmpty(findItem) && isArray(findItem)) {
          if (findItem.length > 1) {
            console.log('findItem', findItem)
            console.error(`字段名称为${item},设置的自定义列重复`)
            findItem.forEach((ele) => {
              colDefs.push({
                ...obj,
                ...ele
              })
            })
          } else {
            colDefs.push({
              ...obj,
              ...findItem[0]
            })
          }
        } else {
          colDefs.push(obj)
        }
      })

      // 插入列
      if (isArray(insertColumns) && !isEmpty(insertColumns)) {
        insertColumns.forEach((ele) => {
          const idsArr = []
          const filterItem = colDefs.filter((item, ind) => {
            if (item.field === ele.afterField) {
              idsArr.push(ind)
              return true
            } else {
              return false
            }
          })

          console.log('filterItem=====>', filterItem)
          if (isArray(filterItem) && !isEmpty(filterItem)) {
            console.log('idsArr', idsArr)
            idsArr.forEach((id) => {
              colDefs.splice(id, 0, ele)
            })
          } else {
            console.error(`插入列字段名称为${ele.field},插入原列字段${ele.afterField}后，未成功`)
          }
        })
      }
      return colDefs
    } else {
      console.error('database参数是必传项并且不能为空对象')
    }
  }
  // 处理特殊的自定义列
  dealSpecColumns (database, specColumns) {
    // 特殊列： 1）前端插入列；1.1）同字段，不同表头名插入列
    //  2）自定义列；
    // 区分插入列和补充列
    const insertColumns = []
    const supplyColumns = []

    specColumns.forEach((ele, ind) => {
      if (ele.afterField) {
        insertColumns.push(ele)
      } else {
        supplyColumns.push(ele)
      }
    })

    console.log('insertColumns=====>', insertColumns)

    const colDefs = this.initColDefs(database, supplyColumns, insertColumns)

    console.log('colDefs=====>', colDefs)

    return colDefs
  }
}
