/*
 * @Author: Null
 * @Date: 2022-01-07 15:38:35
 * spark-md5 官方文档：https://github.com/satazor/js-spark-md5
 * @Description: 请求前参数数据----加密
 */

// 数据加密等级：0级 / 1级 / 2级 /3级；0级代表不加密；1级代表有加密；2级代表密级较高；3级表示密级最高；4级表示随机加密
// 构建思想为: 可通过vuex

import SparkMD5 from 'spark-md5'

// // 加密等级
// const encryptionLevel = 2

// // 加密规则
// const encryptionRules = {
//   ruleLevel1: 'rule1',
//   ruleLevel2: 'rule2',
//   ruleLevel3: 'rule3',
//   ruleLevel4: 'rule4'
// }

export const preEncryption = {}

/**
 * @description: hex hash 加密
 * @param {*} encryptionText
 * @return {*}
 */
export function SparkMD5HexHash (encryptionText) {
  return SparkMD5.hash(encryptionText)
}

/**
 * 分片获取md5值
 * @param {*} file 文件对象
 * @param {*} chunkSize 分片大小
 * @param {*} progressCallback 进度修改回调
 * @returns
 */
export function md5WithChunk (file, chunkSize, progressCallback = console.log) {
  return new Promise((resolve, reject) => {
    const blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.onerror = reject
    fileReader.onload = (e) => {
      progressCallback(currentChunk / chunks)
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }
    function loadNext () {
      const start = currentChunk * chunkSize
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }
    loadNext()
  })
}
