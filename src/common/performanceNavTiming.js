/*
 * @Author: Null
 * @Date: 2022-04-26 13:57:28
 * @Description: 展示navigation对象信息
 */
import store from '@/store/index'
export function showNavigationDetails () {
  const [entry] = performance.getEntriesByType('navigation')
  console.table(entry.toJSON())
}

/**
 * @description: 网络连接状况
 * @return {*}
 */
export function networkConnection () {
  const { rtt, downlink, effectiveType, saveDate } = navigator.connection
  console.group('当前网络状态')
  console.log(`有效网络连接类型:${effectiveType}`) // 2g 3g 4g
  console.log(`估算的下行速度/带宽:${downlink}Mb/s`)
  console.log(`估算往返时间:${rtt}ms`)
  console.log(`打开请求数据保护模式:${saveDate || '无'}`)
  console.groupEnd()

  const connection = {
    rtt,
    downlink,
    effectiveType,
    saveDate
  }
  store.commit('setting/network/SET_CONNECTION', connection)
  return connection
}
