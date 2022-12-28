/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: api接口入口集成文件
 */
// 域名管理
import domain from './domain/index'
// 公司管理
import companyManage from './company-manage/index'
// 用户
import user from './user/index'

export default {
  domain,
  companyManage,
  user
}
