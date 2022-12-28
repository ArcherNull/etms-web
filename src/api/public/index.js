/*
 * @Author: Null
 * @Date: 2022-06-16 09:48:01
 * @Description: 公共api文件
 */

import http from '@/serve/requestMethods.js'

export default {
  // 公司列表
  companyList: (params) => http.post('/admin/login', params).then((res) => res)
}
