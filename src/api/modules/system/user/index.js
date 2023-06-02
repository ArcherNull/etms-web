/*
 * @Author: Null
 * @Date: 2022-12-27 14:53:34
 * @Description:
 */
import http from '@/serve/requestMethods.js'

export default {
  // 用户信息
  getUserInfo: (params) => http.get('/user/base/user/getInfo', params),

  // 用户权限信息
  getPowerInfo: (params) => http.get('/user/base/user/getPowerInfo', params),

  // 菜单列表
  getMenuTreeList: (params) => http.get('/user/base/menudetail/menuTreeList', params)

}
