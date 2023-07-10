/*
 * @Author: junsong Chen 779217162@qq.com
 * @Date: 2023-06-06 08:43:10
 * @LastEditTime: 2023-06-06 11:25:02
 * @Description: 按钮事件全局节流
 *
 * 参考文档：https://www.cnblogs.com/pengchenggang/p/16550909.html
 *
 */
// 公共文件
import { Message } from 'element-ui'
const setVueClickGlobalThrottle = Vue => {
  // 节流
  const on = Vue.prototype.$on
  Vue.prototype.$on = function (event, func) {
    // console.info('全局拦截 click $on事件 event', event)
    let previous = 0
    let newFunc = func
    if (event === 'click') {
    //   console.info('全局拦截 click 事件 setVueClickGlobalThrottle')
      newFunc = function () {
        const now = new Date().getTime()
        if (previous + 1000 <= now) {
          func.apply(this, arguments)
          previous = now
        } else {
          Message.warning(`您点这么快是着急去干饭吗`)
        }
      }
    }
    on.call(this, event, newFunc)
  }
}

export default setVueClickGlobalThrottle
