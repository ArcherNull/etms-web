/*
 * @Author: Null
 * @Date: 2022-04-15 09:25:26
 * @Description: 新手引导driver.js封装
 */

import Driver from 'driver.js' // import driver.js
import '@/assets/styles/admin/driver/index.scss' // import driver.js css

export default function createGuide (steps, callbacks) {
  let driverIndex = 1
  const driver = new Driver({
    padding: 0,
    opacity: 0.4,
    animate: true,
    doneBtnText: '我知道了',
    // keyboardControl: true,
    stageBackground: '#fff',
    closeBtnText: '跳过', //  关闭按钮文案
    nextBtnText: '下一步', // 下一步的按钮文案
    prevBtnText: '上一步', // 上一步的按钮文案
    onNext: (ele) => {
      console.log('点击下一步', ele, driverIndex)
      driverIndex += 1
      if (callbacks && callbacks.onNext && typeof callbacks.onNext === 'function') {
        callbacks.onNext(ele, driverIndex)
      }
      setTimeout(() => {
        document.getElementsByClassName('driver-close-btn')[0].innerText = `跳过(${driverIndex}/${steps.length})`
      })
    },
    onReset: (ele) => {
      console.log('点击跳过')
      if (callbacks) {
        const steps = driver.getSteps()
        if (steps[steps.length - 1] === ele && callbacks.onDone && typeof callbacks.onDone === 'function') {
          callbacks.onDone(ele)
        } else if (callbacks.onReset && typeof callbacks.onReset === 'function') {
          callbacks.onReset(ele)
        }
      }
    }
  })
  driver.defineSteps(steps)

  return driver
}
