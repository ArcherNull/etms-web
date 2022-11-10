/*
 * @Author: Null
 * @Date: 2022-04-25 17:32:20
 * @Description: 混入入口文件
 */

// 引入页面锚点方法
import { jumpPageAnchor } from '@/common/commFun.js'

export default {
  install (Vue) {
    Vue.mixin({
      beforeRouteEnter (to, from, next) {
        next((vm) => {
          const anchor = to.params.anchor
          console.log('beforeRouteEnter-next============>', to)
          vm.$nextTick(() => {
            // 页面渲染完成，跳转其它页面的锚点
            typeof anchor === 'string' && jumpPageAnchor(to.path, anchor)
          })
        })
      },
      beforeRouteUpdate (to, from, next) {
        console.log('beforeRouteUpdate============>', to)
        // just use `this`
        next()
      },
      beforeRouteLeave (to, from, next) {
        // 离开守卫是用来检测用户信息未填写完成就离开的提醒
        // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        // if (answer) {
        //   next()
        // } else {
        //   next(false)
        // }
        next()
      },
      mounted () {
        this.initPage()
      },
      methods: {
        // 复制文本到剪贴板
        copyContent (text) {
          console.log('复制文本', text)
          this.$commJs.copyToClipboard(this, text)
        },
        // 初始化页面
        initPage () {
          this.initPageAnchor()
        },
        // 初始化锚点位置
        initPageAnchor () {
          this.$commJs.generateCurrentPageAnchor()
        },
        confirmModel (config) {
          return new Promise((resolve, reject) => {
            try {
              let extraData = {}
              if (typeof config === 'string') {
                extraData = {
                  content: config
                }
              } else {
                extraData = config || {}
              }

              const data = {
                title: '提示',
                content: '请您再次确认',
                model: {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                },
                ...extraData
              }

              const { title, content, model } = data
              this.$confirm(content, title, model).then((res) => {
                if (res === 'confirm') {
                  resolve('confirm')
                } else {
                  resolve('')
                }
              }).finally(() => {
                resolve('confirmOver')
              })
            } catch (err) {
              reject(err)
            }
          })
        }
      }
    })
  }
}
