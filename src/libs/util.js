/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 网页配置文件
 */
import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import setting from '@/setting'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = setting.name || 'Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面或用于文件下载
 * @param {String} url https/http 地址
 */
util.open = function (url) {
  const targetId = `${setting.name}-link-temp`
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', targetId)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById(targetId))
}

/**
 * @description: jsonP跨域请求
 * @param {String} url 请求的链接
 * @return {*}
 */
export const jsonP = function (url) {
  const script = document.createElement('script')
  script.setAttribute('src', url)
  script.setAttribute('type', 'text/javascript')
  const body = document.getElementsByTagName('body')[0]
  body.appendChild(script)
  // setTimeout(() => {
  //   body.remove(script)
  // }, 3000)
}

export default util
