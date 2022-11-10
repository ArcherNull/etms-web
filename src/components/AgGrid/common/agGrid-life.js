/*
 * @Author: Null
 * @Date: 2022-03-21 11:06:02
 * @Description: ag-grid渲染生命周期类 ， agTableOptions对象自定义拼装
 *
 * 为什么要写这个ag-grid渲染生命周期类？
 * 1）如果一个页面有多个ag-grid，保证各个ag-grid实例独立，互不干涉及影响【虽然ag-grid-vue本身就能保住各个独立，但是二次封装
 * 不可避免地会有影响】
 * 2）单独拼装列头，添加列头的操作方法，设置用户自定义列头，列头的个性化操作等
 * 3）行数据处理
 * 4）自定义合计行处理
 * 5）设置自定义置顶行等
 * 6）添加自定义操作列，不再借助vuex实现通信，而是借助中间件agGrid-middleware通信
 *
 *
 * 拔插式的组件设计
 */

class AgGridLifeTime {
  constructor () {
    // 任务队列
    this.taskList = []
    setTimeout(() => {
      this.next()
    })
  }

  /**
   * @description: 惰性函数
   * @param { number } time 延迟时间，单位s
   * @return {*}
   */
  sleep (time) {
    const that = this
    const fun = ((t) => {
      return function () {
        setTimeout(() => {
          console.log(`I sleep ${t} seconds`)
          that.next()
        }, t * 1000)
      }
    })(time)
    this.taskList.push(fun)
    return this
  }

  /**
   * @description: 惰性函数，优先级比sleep高
   * @param { number } time 延迟时间，单位s
   * @return {*}
   */
  sleepFirst (time) {
    const that = this
    const fun = ((t) => {
      return function () {
        setTimeout(() => {
          console.log(`I sleep ${t} seconds firstly !`)
          that.next()
        }, t * 1000)
      }
    })(time)
    this.taskList.unshift(fun)
    return this
  }

  /**
   * @description: 下一步执行函数
   */
  next () {
    const fun = this.taskList.shift()
    fun && fun()
  }
}

/**
 * @description: ag-grid生命周期函数
 * @param {*} name
 * @return {*}
 */
export function AgGridLife (name) {
  return new AgGridLifeTime(name)
}
