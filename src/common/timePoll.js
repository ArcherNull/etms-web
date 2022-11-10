/*
 * @Author: Null
 * @Date: 2022-04-27 09:37:05
 * @Description: 轮询定时器
 */

let timer = null

// 是否开启测试环境
const isDev = process.env.NODE_ENV === 'development'
// const isDev = false

// 测试环境，设定时间15s , 弹窗显示时间7s
const devTime = 2 * 60 * 1000
const devLimitTime = 7000

// 生产环境，第一次进入，加载接口。后进入，设定时间5min , 弹窗显示时间15s
const proTime = 5 * 60 * 1000
const proLimitTime = 15000

const timeout = isDev ? devTime : proTime
const limitTimeout = isDev ? devLimitTime : proLimitTime

// 定时器计数
let count = 1

function timePoll (time = timeout) {
  const limitTime = limitTimeout
  if (count === 1) { getMessageData(limitTime) }
  if (time > limitTime) {
    const setIntervalFun = (time) => {
      if (timer) {
        clearInterval(timer)
      }
      timer = setInterval(() => {
        time--
        count++

        if (time <= 0) {
          setIntervalFun()
        } else {
          getMessageData(limitTime)
        }
      }, time)
    }
    setIntervalFun(time)
  } else {
    alert(`消息通知定时器最少设置${limitTime / 1000}s`)
  }
}

// 请求接口
function getMessageData (limitTime) {
  console.log(`轮询请求接口====>${count}次`, limitTime)
}

// 获取数据
export function clearMessageInterval () {
  count = 1
  clearInterval(timer)
}

// 重置定时器
export function resetMessageInterval () {
  clearMessageInterval()
  timePoll()
}
