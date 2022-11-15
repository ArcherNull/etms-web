/*
 * @Author: Null
 * @Date: 2022-06-21 09:18:31
 * @Description:格式转换函数
 */

/**
 * @description: 通过a标签下载文件 【格式转换，也考虑过使用a标签直接转换后缀名，但是可能会造成文件损坏】
 * @param {String} url 文件链接
 * @return {*}
 */
export function downLoadByATag (url, fileName = 'downLoad', extname = '.png') {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${fileName}${extname}`) // 自定义下载文件名（如exemple.txt）
  document.body.appendChild(link)
  link.click()
  window.URL.revokeObjectURL(link.href) // 释放url
  document.body.removeChild(link) // 清除残留的文档片段<a></a>
}

/**
 * @description: Excel文件格式转换函数，只支持excel文件，格式为  .csv / .xlsx
 * @param { 接收的文件流 ， 必传 } bold
 * @param { 转换格式的文件案名 } fileName
 * @param { 转换的格式 } format
 * @return {*}
 */
export function convertExcelFormat (bold, fileName = 'downLoad', extname = '.csv') {
  const blob = new Blob([bold], {
    type: 'application/vnd.ms-excel'
  }) // 核心代码
  const url = window.URL.createObjectURL(blob)
  downLoadByATag(url, fileName, extname)
}

/**
 * @description: Image文件格式转换函数，只支持excel文件，格式为  .csv / .xlsx
 * @param { 接收的文件流 ， 必传 } bold
 * @param { 转换格式的文件案名 } fileName
 * @param { 转换的格式 } format
 * @return {*}
 */
export function convertImageFormat (bold, fileName = 'downLoad', extname = '.png') {
  const contentTypeObj = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif'
  }[extname]
  const blob = new Blob([bold], {
    type: contentTypeObj
  }) // 核心代码
  const url = window.URL.createObjectURL(blob)
  downLoadByATag(url, fileName, extname)
}

/**
 * @description: 获取文件的信息并转换格式
 * @param {*} domId
 * @param {*} filename
 * @param {*} extname
 * @return {*}
 */
export async function chooseExcel (domId, filename = 'downLoad', extname = '.xlsx') {
  if (domId) {
    const files = document.getElementById(domId).files[0]
    console.log('files图片文件的信息的获取', files)
    if (files) {
      const regStr = /\.csv|\.xlsx$/
      if (regStr.test(files.name)) {
        const fileToBuffer = (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve(reader.result)
            }
            reader.readAsArrayBuffer(file)
          })
        }
        const bold = await fileToBuffer(files)
        console.log('bold', bold)
        convertExcelFormat(bold, filename, extname)
      } else {
        console.error('请上传.csv/.xlsx后缀结尾的excel文件')
      }
    } else {
      console.error('未获取到文件流数据')
    }
  } else {
    console.error('未获取到文件')
  }
}

/**
 * @description: .csv文件的excel 转换为 .xlsx 文件的excel
 * @param { String } domId 元素节点id
 * @param { String } filename 文件名
 * @return {*}
 */
export function csvExcelConvertToxlsxExcel (domId, filename = 'csvExcelConvertToxsxExcel') {
  chooseExcel(domId, filename)
}

/**
 * @description: .xlsx文件的excel 转换为 .csv文件的excel
 * @param { String } domId 元素节点id
 * @param { String } filename 文件名
 * @return {*}
 */
export function xlsxExcelConvertTocsvExcel (domId, filename = 'xlsxExcelConvertTocsvExcel') {
  chooseExcel(domId, filename, '.csv')
}

export default {
  convertExcelFormat,
  convertImageFormat,
  chooseExcel,
  downLoadByATag,
  csvExcelConvertToxlsxExcel,
  xlsxExcelConvertTocsvExcel
}
