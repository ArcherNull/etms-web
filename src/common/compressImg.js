/*
 * @Author: Null
 * @Date: 2022-08-19 12:09:16
 * @Description: 压缩图片
 */
import { convertImageFormat } from '@/common/formatConversion'

const compressImg = {
  // 压缩前将file转换成img对象
  readImg: function (file) {
    // Vue在这个地方必须要用到指针，因为method内的方法是被强行挂载到Vue对象下的，而不是window对象下
    // const that = this
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()
      // 获取base64的编码
      reader.onload = function (e) {
        // const base64 = e.target.result
        // console.log('e.target.result', e.target.result)
        // 在这个地方可以实现图片格式转换
        // that.convertBase64(base64, 'jpg')
        img.src = e.target.result
      }
      reader.onerror = function (e) {
        reject(e)
      }
      reader.readAsDataURL(file)
      img.onload = function () {
        resolve(img)
      }
      img.onerror = function (e) {
        reject(e)
      }
    })
  },

  /**
   * 压缩图片
   *@param img 被压缩的img对象
   * @param type 压缩后转换的文件类型
   * @param mx 触发压缩的图片最大宽度限制
   * @param mh 触发压缩的图片最大高度限制
   */
  compressImg: function (img, type, mx, mh) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const { width: originWidth, height: originHeight } = img
      // 最大尺寸限制
      const maxWidth = mx
      const maxHeight = mh
      // 目标尺寸
      let targetWidth = originWidth
      let targetHeight = originHeight
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > 1) {
          // 宽图片
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        } else {
          // 高图片
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        }
      }
      canvas.width = targetWidth
      canvas.height = targetHeight
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片绘制
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      canvas.toBlob(function (blob) {
        resolve(blob)
      }, type || 'image/png')
    })
  },

  // async实现异步任务同步执行
  async compressAndDownload (file) {
    const img = await this.readImg(file)
    const blob = await this.compressImg(img, file.type, 1200, 1200)
    convertImageFormat(blob)
    // 可以使用js-file-download对图片进行压缩下载，当然我们呢可以在这里直接将blob文件流传给后端
    // fileDownload(blob, 'filename.png')
    /*       const formData = new FormData()
                formData.append('file', blob, 'xxx.png') */
    // 这里可以发起接口请求
    // axios.post('http://xxx.com/api',formData)
  },

  // 压缩并返回文件对象，
  async compressAndReturnFile (file) {
    const img = await this.readImg(file)
    const blob = await this.compressImg(img, file.type, 1200, 1200)
    // 将所有格式的图片转换为png
    return new File([blob], file.name, {
      type: 'image/png'
    })
  }
}

export default compressImg
