/*
 * @Author: Null
 * @Date: 2021-12-13 11:03:44
 * @Description: 登录模块入口文件
 */

import http from '@/serve/requestMethods.js'

export default {
  // 登录
  login: (params) => http.post('/base/user/login', params).then(res => res)

}
