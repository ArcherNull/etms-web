/*
 * @Author: Null
 * @Date: 2022-12-27 14:53:34
 * @Description:
 */
import http from '@/serve/requestMethods.js'

export default {
  // 用户信息
  getUserInfo: (params) => http.get('/base/user/getInfo', params)

}
