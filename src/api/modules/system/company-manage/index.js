import http from '@/serve/requestMethods.js'

export default {
  // 公司列表
  companyList: (params) => http.get('/base/company/list', params),
  // 删除公司列表
  deleteCompany: (companyIds) => http.delete('/base/company/' + companyIds).then(res => res),
  // 新增公司信息
  addCompany: (data) => http.post('/base/company/add', data).then(res => res),
  // 修改公司列表
  editCompany: (data) => http.put('/base/company/edit', data).then(res => res),
  // 获取公司信息详细信息
  companyDetail: (companyIds) => http.get('/base/company/' + companyIds).then(res => res)
}
