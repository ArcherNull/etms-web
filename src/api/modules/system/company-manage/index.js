import http from '@/serve/requestMethods.js'

export default {
  // 公司列表
  companyList: (params) => http.get('/user/base/company/list', params),
  // 删除公司列表
  deleteCompany: (companyIds) => http.delete('/user/base/company/' + companyIds).then(res => res),
  // 新增公司信息
  addCompany: (data) => http.post('/user/base/company/add', data).then(res => res),
  // 修改公司列表
  editCompany: (data) => http.put('/user/base/company/edit', data).then(res => res),
  // 获取公司信息详细信息
  companyDetail: (companyIds) => http.get('/user/base/company/' + companyIds).then(res => res)
}
