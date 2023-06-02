/*
 * @Author: Null
 * @Date: 2022-12-27 14:53:50
 * @Description:
 */
import http from '@/serve/requestMethods.js'

export default {
  // 登录
  login: (params) => http.post('/user/base/user/login', params).then(res => res)

}
