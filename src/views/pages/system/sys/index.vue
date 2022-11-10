<template>
  <div ref="caseManagementIndex" class="app-container caseManagementIndex scrollcontainer scrollcontainer_auto">
    <el-cascader ref="cascader" v-model="value" :options="options" clearable collapse-tags :props="{ multiple: true, }" @change="cascaderChange" />
  </div>
</template>

<script>
export default {
  name: 'CaseManagementIndex',
  // import引入的组件需要注入到对象中才能使用PopupTreeInput
  components: {},
  data () {
    // 这里存放数据
    return {
      preValue: [],
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: '11111',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: '222222',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: '基础',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: '表单',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: '数据',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: '消息',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: '菜单呀',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: '其他',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框',
              children: [{
                value: 'others',
                label: '其他'
              }, {
                value: 'others',
                label: '其他'
              }, {
                value: 'others',
                label: '其他'
              }]
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }
      ]
    }
  },
  // 方法集合
  methods: {
    // cascaderChange (val) {
    //   console.log('this.value', this.value)
    //   console.log('val=====>', val)
    //   console.log('val', val.flat(Infinity))
    //   console.log('val', Array.from(new Set(val.flat(Infinity))))

    //   let list = []
    //   // 二级菜单
    //   const sdmo = this.options.map(item => {
    //     return item.children
    //   })
    //   // 获取所有的二级菜单
    //   for (let i = 0; i < sdmo.length; i++) {
    //     const aaa = sdmo[i].map(item => {
    //       return item.value
    //     })
    //     list = [...list, ...aaa]
    //   }
    //   console.log('list', list)
    //   const clickList = Array.from(new Set(val.flat(Infinity)))// 获取所有被点击的数据
    //   // 保留被点击的二级菜单
    //   const cccc = clickList.filter((item) => {
    //     return list.indexOf(item) !== -1
    //   })
    //   console.log('cccc', cccc)
    // },
    cascaderChange (val) {
      console.log('this.value', this.value)
      console.log('val=====>', val)
      let lastVal = []
      if (this.$refs) {
        lastVal = this.$refs.cascader.value
      }
      this.preValue = lastVal
      console.log('lastVal=====>', lastVal)

      let firstVal = ''
      if (lastVal.length) {
        firstVal = lastVal[0][0]
        const bool = val.every(ele => ele[0] === firstVal)
        if (!bool) {
          this.value = val.filter(ele => ele[0] !== firstVal)
        }
      }
    }
  }
}
</script>
<style  lang="scss">
.el-cascader-panel {
  .el-scrollbar:first-child {
    .el-checkbox {
      display: none;
    }
  }
}
</style>

