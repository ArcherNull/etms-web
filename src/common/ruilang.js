/*
 * @Author: Null
 * @Date: 2022-08-15 07:55:25
 * @Description: 锐浪报表打印
 */
import { webapp_ws_ajax_run, urlAddRandomNo } from '@/utils/ruilang/grwebapp'

export const testJsonData = { 'Table': [{ 'searchValue': null, 'params': {}, 'pageSize': null, 'pageNum': null, 'orderByColumn': null, 'isAsc': null, 'fieldSort': null, 'likeField': null, 'prodivisionIds': null, 'startTime': null, 'endTime': null, 'objectIdList': null, 'commonTime': null, 'objectStrList': null, 'yesOrNoField': null, 'inField': null, 'gtField': null, 'ltField': null, 'commStrValue': null, 'objectNo': 'WB8000007739', 'applyNo': 'IV800000003243', 'paybillNo': 'PB800000004818', 'verifyoffMoney': '366.000', 'verifyoffLeftMoney': '0.000', 'paybillMoney': '366.000', 'paymentMoney': '0.000', 'paymentLeftMoney': '366.000', 'paybillState': '已核销', 'indemnityMoney': '100.000', 'supplierType': '临时车', 'transitType': null, 'costType': '整车成本', 'happenDate': '2022-08-02', 'platformName': '山西传化陆鲸科技有限公司', 'platformId': '1547871262356901889', 'oilcardNo': null, 'paymentName': '深圳德坤物流有限公司', 'paymentNum': '10864000000524885', 'recObjectId': '1547822952376012802', 'recObjectName': '李远明', 'userName': 'song', 'bankName': '4132', 'bankBranch': '4132', 'bankNum': '十大', 'bankProvince': '四川省', 'bankProvinceid': null, 'bankCity': '内江市', 'bankCityid': null, 'outType': '临时车', 'transferType': null, 'paymentType': '回单付/月结款', 'paymentMode': '平台支付', 'verifyoffUser': '杨桃明', 'verifyoffDate': '2022-08-13 08:59:31', 'backUser': null, 'backDate': null, 'paybillUser': null, 'paybillDate': null, 'prodivisionName': '测试项目部', 'createdById': '1550645016451452930', 'createdBy': '杨桃明', 'createdTime': '2022-08-13 08:56:11', 'applyUser': '杨桃明', 'applyDate': '2022-08-13 08:57:03', 'payCancelUser': null, 'payCancelDate': null, 'paybillRemark': '股份公司', 'carNo': '粤B78441', 'recpayCreatedBy': '杨桃明', 'recpayCreatedTime': '2022-08-13 08:59:31', 'oneSubject': '应付账款', 'twoSubject': '结算', 'threeSubject': '整车成本', 'feeType': '回单付/月结款', 'recpaySummary': null, 'inoutType': '支出', 'recpayState': '正常', 'cancelByName': null, 'cancelByDate': null, 'happenMonth': '2022-08-02', 'recPayMoney': '366.000', 'voucherNo': 'PB800000004818', 'hxMoney': '466.000', 'supplierName': null, 'numericalOrder': 1, 'orderNoIndex': 1, 'printDate': '2022-08-15 09:48:18', 'getDateRange': '2022-08-08 00:00:00 -- 2022-08-15 23:59:59' }, { 'searchValue': null, 'params': {}, 'pageSize': null, 'pageNum': null, 'orderByColumn': null, 'isAsc': null, 'fieldSort': null, 'likeField': null, 'prodivisionIds': null, 'startTime': null, 'endTime': null, 'objectIdList': null, 'commonTime': null, 'objectStrList': null, 'yesOrNoField': null, 'inField': null, 'gtField': null, 'ltField': null, 'commStrValue': null, 'objectNo': 'WB8000007739', 'applyNo': 'IV800000003243', 'paybillNo': 'PB800000004818', 'verifyoffMoney': '366.000', 'verifyoffLeftMoney': '0.000', 'paybillMoney': '366.000', 'paymentMoney': '0.000', 'paymentLeftMoney': '366.000', 'paybillState': '已核销', 'indemnityMoney': '100.000', 'supplierType': '临时车', 'transitType': null, 'costType': '整车成本', 'happenDate': '2022-08-02', 'platformName': '山西传化陆鲸科技有限公司', 'platformId': '1547871262356901889', 'oilcardNo': null, 'paymentName': '深圳德坤物流有限公司', 'paymentNum': '10864000000524885', 'recObjectId': '1547822952376012802', 'recObjectName': '李远明', 'userName': 'song', 'bankName': '4132', 'bankBranch': '4132', 'bankNum': '十大', 'bankProvince': '四川省', 'bankProvinceid': null, 'bankCity': '内江市', 'bankCityid': null, 'outType': '临时车', 'transferType': null, 'paymentType': '回单付/月结款', 'paymentMode': '平台支付', 'verifyoffUser': '杨桃明', 'verifyoffDate': '2022-08-13 08:59:31', 'backUser': null, 'backDate': null, 'paybillUser': null, 'paybillDate': null, 'prodivisionName': '测试项目部', 'createdById': '1550645016451452930', 'createdBy': '杨桃明', 'createdTime': '2022-08-13 08:56:11', 'applyUser': '杨桃明', 'applyDate': '2022-08-13 08:57:03', 'payCancelUser': null, 'payCancelDate': null, 'paybillRemark': '股份公司', 'carNo': '粤B78441', 'recpayCreatedBy': '杨桃明', 'recpayCreatedTime': '2022-08-13 08:59:31', 'oneSubject': '应付账款', 'twoSubject': '结算', 'threeSubject': '整车成本', 'feeType': '理赔金额', 'recpaySummary': null, 'inoutType': '支出', 'recpayState': '正常', 'cancelByName': null, 'cancelByDate': null, 'happenMonth': '2022-08-02', 'recPayMoney': '366.000', 'voucherNo': 'PB800000004818', 'hxMoney': '-100.000', 'supplierName': null, 'numericalOrder': 2, 'orderNoIndex': 2, 'printDate': '2022-08-15 09:48:18', 'getDateRange': '2022-08-08 00:00:00 -- 2022-08-15 23:59:59' }], 'calculation': [{ 'prodivisionName': '测试项目部', 'happenDate1': '2022-08-02', 'verifyoffTotalMoney': 366, 'numericalOrder': 1, 'orderNoIndex': 1 }] }

export const downLoadExeUrl =
  'http://www.rubylong.cn/download/gridreport6-webapp.exe'

/**
 * @description:锐浪报表打印封装
 * @param { 报表数据 } data
 * @param { 报表模板路径 } ruilangModel
 * @param { 预览方式 ， print / preview } type
 * @return {*}
 */
export function ruilangPrint (data, ruilangModel, type = 'preview') {
  const reilangUrl =
      process.env.NODE_ENV === 'development'
        ? `./static/grf/${ruilangModel}.grf`
        : `../static/grf/${ruilangModel}.grf`

  const args = {
    report: urlAddRandomNo(reilangUrl),
    data,
    type
  }
  webapp_ws_ajax_run(args)
}

/**
 * @description:  锐浪报表html5实现打印预览
 * @param { 报表数据 } data
 * @param { 报表模板路径 } ruilangModel
 * @param { DOM节点id , ruilang_report_holder } DOMid
 * @param { className , 最好是跟DOMid写成同一个名字,  ruilang_report_holder } className
 * @return {*}
 */
export function ruilangHtml5Print (
  data,
  ruilangModel,
  DOMid = 'ruilang_report_holder',
  className = 'ruilang_report_holder'
) {
  window.sessionStorage.removeItem('ruilangHtml5DomStr')

  const reilangUrl =
  process.env.NODE_ENV === 'development'
    ? `./static/grf/${ruilangModel}.grf`
    : `../static/grf/${ruilangModel}.grf`

  // eslint-disable-next-line no-undef
  const reportViewer = rubylong.grhtml5.insertReportViewer(
    DOMid,
    reilangUrl,
    data
  )
  reportViewer.start()
  setTimeout(() => {
    const print = document.getElementsByClassName(className)[0].innerHTML
    window.sessionStorage.setItem('ruilangHtml5DomStr', print)
    openNewWindow()
  }, 2000)
}

/**
 * @description: 获取可视窗口高度,该方法用于在浏览器中另外打开一个窗口，并且不关闭当前窗口
 * @param {*} w
 * @param {*} h
 * @return {*}
 */
function openNewWindow (w = 1400, h = 800, title = 'HTML5打印') {
  // 开启新弹窗打印的页面路径
  const printHtmlPath = process.env.NODE_ENV === 'development'
    ? `./static/print/html5Print.html`
    : '../static/print/html5Print.html'

  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top

  const width = this.windowWidth()
  const height = this.windowHeight()

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop

  // 打开居中的浏览器窗口
  const newWindow = window.open(
    printHtmlPath,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )

  if (window.focus) {
    newWindow.focus()
  }
}
