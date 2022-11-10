/*
 * @Author: Null
 * @Date: 2022-06-16 19:17:06
 * @Description: 请求缓存
 */

import Axios from 'axios'
import { generateReqKey } from './httpCommon'
import store from '@/store/index'

const options = {
  storage: true, // 是否开启localStorage缓存
  dbName: 'apiCache',
  path: 'apiCache',
  storage_expire: 600000, // localStorage 数据存储时间10min（刷新页面判断是否清除）
  expire: 20000 // 每个接口数据缓存ms 数
}
// 初始化
;(async function () {
  const cache = await store.dispatch('setting/db/get', {
    dbName: options.dbName,
    path: 'apiCache',
    defaultValue: {},
    user: true
  })
  console.log('cache', cache)
  // const cache = window.localStorage.getItem(options.storageKey)
  if (cache) {
    const { storageExpire } = cache
    // 未超时不做处理
    if (
      storageExpire &&
      getNowTime() - storageExpire < options.storage_expire
    ) {
      return
    }
  }
  console.log('立即执行=====>')
  await store.dispatch('setting/db/set', {
    dbName: options.dbName,
    path: 'apiCache',
    defaultValue: { data: {}, storageExpire: getNowTime() },
    user: true
  })
})()

// 获取缓存项
function getCacheItem (key) {
  const cache = window.localStorage.getItem(options.storageKey)
  const { data } = JSON.parse(cache)
  return (data && data[key]) || null
}

// 设置缓存项
function setCacheItem (key, value) {
  const cache = window.localStorage.getItem(options.storageKey)
  const { data, storageExpire } = JSON.parse(cache)
  data[key] = value
  window.localStorage.setItem(
    options.storageKey,
    JSON.stringify({ data, storageExpire })
  )
}

const _CACHES = {}
// 使用Proxy代理
const cacheHandler = {
  get: function (target, key) {
    let value = target[key]
    console.log(`${key} 被读取`, value)
    if (options.storage && !value) {
      value = getCacheItem(key)
    }
    return value
  },
  set: function (target, key, value) {
    console.log(`${key} 被设置为 ${value}`)
    target[key] = value
    if (options.storage) {
      setCacheItem(key, value)
    }

    return true
  }
}
const CACHES = new Proxy(_CACHES, cacheHandler)

export function requestInterceptor (config, axios) {
  // 开启缓存则保存请求结果和cancel 函数
  if (config?.extraConfig?.cache) {
    const data = CACHES[`${generateReqKey(config)}`]
    // 这里用于存储是默认时间还是用户传递过来的时间
    let setExpireTime
    config.setExpireTime
      ? (setExpireTime = config.setExpireTime)
      : (setExpireTime = options.expire)
    // 判断缓存数据是否存在 存在的话 是否过期 没过期就返回
    if (data && getNowTime() - data.expire < setExpireTime) {
      config.cancelToken = new Axios.CancelToken((cancel) => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(data)
      }) // 传递结果到catch中
    }
  }
}

export function responseInterceptor (response) {
  console.log('responseInterceptor-response=====>', response)
  // 返回的code === 200 时候才会缓存下来
  if (response && response.config?.extraConfig?.cache) {
    const resData = JSON.parse(response.data)
    if (resData?.code === 200) {
      const data = {
        expire: getNowTime(),
        data: response
      }

      console.log('data=====>', data)
      CACHES[`${generateReqKey(response.config)}`] = data
    }
  }
}

// 获取当前时间戳
function getNowTime () {
  return new Date().getTime()
}
