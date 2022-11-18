/*
 * @Author: Null
 * @Date: 2021-11-11 09:07:49
 * @Description: 公共方法
 */
import { isString } from 'lodash'
import axios from 'axios'
import setting from '../setting'
import { saveAs } from 'file-saver'
import * as JSZip from 'jszip'
import { Message } from 'element-ui'
import store from '@/store/index'

// import * as Sortable from 'sortablejs'

/**
 * @description: 当前页面内锚点跳转
 * @param {Object|String} that 当前页面指针
 * @param {String} cDomId 自定义的锚点标题
 * @return {*}
 */
export function jumpPageAnchor (that, cDomId = '') {
  if (that) {
    let currentPath
    let anchorContent
    if (typeof that === 'string') {
      currentPath = that
      anchorContent = cDomId
    } else {
      const route = that.$route
      if (route) {
        currentPath = route.path
        const { anchor } = route.params
        anchorContent = cDomId || anchor
      } else {
        // 存在this , 但是没有route对象
        console.error('存在this , 但是没有route对象')
        return
      }
    }
    const domId = `${currentPath}:${anchorContent}`

    console.log('domId', domId)
    // 如果当前已经在这个页面不跳转 直接去
    pageScrollToAnchor(domId)
  }
}

/**
 * @description: 视图锚点滚动
 * @param { String } domId 元素节点id
 * @return {*}
 */
export function pageScrollToAnchor (domId = '') {
  console.log('domId', domId)
  if (domId) {
    // 如果当前已经在这个页面不跳转 直接去
    const toElement = document.getElementById(domId)
    console.log('toElement============>', toElement)
    toElement &&
      toElement.scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'start' // 上边框与视窗顶部平齐。默认值
      })
  } else {
    console.error('元素id为空,请检查！')
  }
}

/**
 * @description: 获取当前页面得anchor锚点列表
 * @return {*}
 */
export function generateCurrentPageAnchor () {
  const domObj = document.getElementsByClassName('firstTitle-box-anchor')
  // 转换HTMLCollection对象为数组
  const newArr = Array.from(domObj)
  const anchorList = []
  newArr.forEach((ele) => {
    anchorList.push({
      id: ele.id, // 用于锚点定位
      title: ele.id.split(':')[1], // 用于锚点标题
      tipsNum: 0 // 用于那个节点得消息提醒
    })
  })
  store.commit('setting/tagViews/SET_CURRENT_ANCHOR_LIST', anchorList)
}

/**
 * @description: 深度查找数组对象内的值，用于查找二级三级目录路由
 * @param { arr : Object[] 要查找的路由，key：String 查找对应的键名 ；value:要查找对应的值 }
 * @return { index ,返回对应的索引值}
 * this.$comm.getObject(this.permission_routes, 'name', '车辆报价中心')
 * console.log(getObject(data, 'name', '车辆报价中心'));
 */
export function getChildrenObject (array, key, value, children = 'children') {
  let obj
  array.some(function iter (arr) {
    if (arr[key] === value) {
      obj = arr
      return true
    }
    return Array.isArray(arr[children]) && arr[children].some(iter)
  })
  return obj
}

const commFun = {
  jumpPageAnchor,
  pageScrollToAnchor,
  generateCurrentPageAnchor,

  /**
   * @description: 生成指定范围内的随机数
   * @param { 最小值  ，Number } min
   * @param { 最大值  ，Number } max
   * @return { 返回min--max区间范围的值 }
   */
  getRandom (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  /**
   * @description: 监听window窗口变化window.onresize
   * @param { 回调函数 } callback
   * @param { 防抖时间ms } wait
   * @return {*}
   */
  windowOnResize (callback, wait = 350) {
    let timer = null
    window.onresize = () => {
      const height = setting.windowHeight()
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        console.log('window.onresize发生变化了', height)
        callback && typeof callback === 'function' && callback(height)
      }, wait)
    }
  },

  /**
   * @description: 匹配要查找的目录路径
   * @param { 匹配目录路径，例如'/collection' } menuStr
   * @return { 返回匹配结果boolean值, true 匹配成功 ; false 匹配失败 }
   */
  matchStr (menuStr) {
    // const iPhone = ['iPhone X','iPhone 11','iPhone XR','iPhone XS Max']
    // const reg = '\/' + iPhone.join('|') + '/'
    // console.log(iPhone.includes(modelmes.match(reg)[0]))

    // 正则表达式字面量是不接受模板字符串的
    const reg = `/\${menuStr}/`
    return menuStr.match(reg)[0] === menuStr
  },

  /**
   * @description: 获取可视窗口高度,该方法用于在浏览器中另外打开一个窗口，并且不关闭当前窗口
   * @param { 打开窗口宽度 } openWidth
   * @param { 打开窗口高度 } openHeight
   * @return { 返回坐标值(x，y) }
   */
  getWindowWidthHeight (openWidth = 500, openHeight = 500) {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : screen.top

    const width = setting.windowWidth()
    const height = setting.windowHeight()
    console.log('获取宽度', width)
    console.log('获取高度', height)

    const left = width / 2 - openWidth / 2 + dualScreenLeft
    const top = height / 2 - openHeight / 2 + dualScreenTop
    console.log('获取的的left位置', left)
    console.log('获取的高度位置', top)
  },

  /**
   * @description: 深拷贝【不推荐，因为已经有lodash了】
   * @param { 被拷贝对象 } source
   * @return {*}
   */
  deepClone (source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = this.deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  },

  /**
   * @description: 下载文件流模板
   * @param { 模板链接 } url
   * @param { 下载文件名 } fileName
   * @param { 请求方法 } method
   * @return {*}
   */
  exportTemplate: function (
    url = '/base/offerCenter/exportTemplate',
    fileName = 'downLoad',
    method = 'get'
  ) {
    const that = this
    axios({
      url: url, // 只要是本地的node.js实现dev-Server跨域，每次请求都会将本地生成的http://localhost:8080转换为目标target链接
      method,
      responseType: 'arraybuffer', // ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml',
        Authorization: 'token'
      }
    }).then((res) => {
      console.log('fileDownload', res.data)
      that.convertFormat(res.data, fileName, '.xlsx')
    })
  },

  // 压缩前将file转换成img对象
  readFileInfo (file) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()
      // 获取base64的编码
      reader.onload = function (e) {
        const base64 = e.target.result
        console.log('e.target.result', base64)
        // 在这个地方可以实现图片格式转换
        // base64Img(base64 , 'jpg');
        img.src = base64
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
   * @description: 生成文件临时路径
   * @param { Object } file 文件对象信息
   * window.URL.revokeObjectURL(link.href) 拿取buffer资源
   * @return {*}
   */
  getObjectURL (file) {
    let url = null
    if (window.createObjectURL !== undefined) {
      // basic
      url = window.createObjectURL(file)
    } else if (window.URL !== undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  },

  /**
   * @description: 防抖函数 【存在lodash】
   * @param { 执行的回调函数 } func
   * @param { 防抖的时间 } wait
   * @param { 是否立即执行 } immediate
   * @return {*}
   */
  Debounce (func, wait = 3000, immediate = false) {
    let timeout = null // 设置防抖函数的定时器

    const bounce = (func, wait, immediate) => {
      // 如果有定时器，那么清除定时器
      if (timeout !== null) clearTimeout(timeout)
      // 立即执行
      if (immediate) {
        const callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) typeof func === 'function' && func()
      } else {
        // 设置定时器，当最后一次操作后， timeout不会再被清除，所以在延时wait毫秒后执行func回调函数
        timeout = setTimeout(() => {
          typeof func === 'function' && func()
        }, wait)
      }
    }
    bounce(func, wait, immediate)
  },

  /**
   * @description: 节流函数 【存在lodash】
   * @param { 回调函数 } func
   * @param { 节流时间 } wait
   * @return {*}
   */
  throttle (func, wait = 3000) {
    let lastTime
    const eventFun = (func) => {
      const newTime = new Date()
      if (!lastTime || newTime - lastTime > wait) {
        console.log(`输入超过${wait}s,节流事件触发`)
        func()
        lastTime = newTime
      }
    }
    eventFun(func)
  },

  /**
   * @description: 拖拽方法, 适用于父div下的两个div的宽度动态拖拽【存在插件，不必要使用】
   * @return {*}
   */
  dragControllerDiv () {
    const resize = document.getElementsByClassName('resizeBtn')
    const left = document.getElementsByClassName('midLeft')
    const midRight = document.getElementsByClassName('midRight')
    const box = document.getElementsByClassName('boxDrag')
    for (let i = 0; i < resize.length; i++) {
      // 鼠标按下事件
      resize[i].onmousedown = function (e) {
        // 颜色改变提醒
        resize[i].style.background = '#818181'
        const startX = e.clientX
        resize[i].left = resize[i].offsetLeft
        // 鼠标拖动事件
        document.onmousemove = function (e) {
          const endX = e.clientX
          let moveLen = resize[i].left + (endX - startX) // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
          const maxT = box[i].clientWidth - resize[i].offsetWidth // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

          if (moveLen < 32) moveLen = 32 // 左边区域的最小宽度为32px
          if (moveLen > maxT - 150) moveLen = maxT - 150 // 右边区域最小宽度为150px

          resize[i].style.left = moveLen // 设置左侧区域的宽度

          for (let j = 0; j < left.length; j++) {
            left[j].style.width = moveLen + 'px'
            midRight[j].style.width = box[i].clientWidth - moveLen - 10 + 'px'
          }
        }
        // 鼠标松开事件
        document.onmouseup = function (evt) {
          // 颜色恢复
          resize[i].style.background = '#d6d6d6'
          document.onmousemove = null
          document.onmouseup = null
          resize[i].releaseCapture && resize[i].releaseCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        }
        resize[i].setCapture && resize[i].setCapture() // 该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false
      }
    }
  },

  /**
   * @description: 指定字符串 溢出显示省略号
   * @param {String} str
   * @param {Number} num
   */
  getSubStringSum (str = '', num = 1) {
    let newStr

    if (str) {
      str = str + ''
      if (str.trim().length > num) {
        newStr = str.trim().substring(0, num) + '...'
      } else {
        newStr = str.trim()
      }
    } else {
      newStr = ''
    }

    return newStr
  },

  /**
   * @description: 识别ie--浅识别
   */
  isIE () {
    const explorer = window.navigator.userAgent
    // 判断是否为IE浏览器
    if (explorer.indexOf('MSIE') >= 0) {
      return true
    } else {
      return false
    }
  },

  /**
   * @description: 颜色转换16进制转rgba
   * @param {String} hex
   * @param {Number} opacity
   */
  hex2Rgba (hex, opacity) {
    if (!hex) hex = '#2c4dae'
    return (
      'rgba(' +
      parseInt('0x' + hex.slice(1, 3)) +
      ',' +
      parseInt('0x' + hex.slice(3, 5)) +
      ',' +
      parseInt('0x' + hex.slice(5, 7)) +
      ',' +
      (opacity || '1') +
      ')'
    )
  },

  /**
   * @description: 去除html标签
   * @param { html标签字符串 } str
   * @return {*}
   */
  htmlSafeStr (str) {
    return str.replace(/<[^>]+>/g, '')
  },

  /**
   * @description: 获取当前页面的url参数
   * @return {*} args  序列化参数
   */
  getQueryString () {
    const qs = location.href.split('?')[1] || ''
    const args = {}
    const items = qs.length ? qs.split('&') : []
    items.forEach((item, i) => {
      const arr = item.split('=')
      const name = decodeURIComponent(arr[0])
      const value = decodeURIComponent(arr[1])
      name.length && (args[name] = value)
    })
    return args
  },

  /**
   * @description: 序列化对象
   * @param { 待序列化的对象   Object  } parmas
   * @return {*}
   */
  toParams (parmas) {
    if (parmas) {
      const query = []
      for (const key in parmas) {
        query.push(`${key}=${parmas[key]}`)
      }
      return `${query.join('&')}`
    } else {
      return ''
    }
  },

  /**
   * @description: 将数据转换为素组
   * @param { 待转换为数组的数据 } data
   * @return {*}
   */
  toArray (data) {
    return Array.isArray(data) ? data : [data]
  },

  /**
   * 动态跳转路由
   * @param {String} url
   * @param {Object} params
   */
  toPage (url, params) {
    if (params) {
      const query = []
      for (const key in params) {
        query.push(`${key}=${params[key]}`)
      }
      window.location.href = `./index.html#/${url}?${query.join('&')}`
    } else {
      window.location.href = `./index.html#/${url}`
    }
  },

  /**
   * @description: 对象中的null转为空字符串
   * @param {对象}  data
   * @return {清空null字符串}
   */
  nullToStr (data) {
    const that = this
    for (var x in data) {
      if (data[x] == null) {
        // 如果是null 把直接内容转为 ''
        data[x] = ''
      } else {
        if (Array.isArray(data[x])) {
          // 是数组遍历数组 递归继续处理
          data[x] = data[x].map((z) => {
            return that.nullToStr(z)
          })
        }
        if (typeof data[x] === 'object') {
          // 是json 递归继续处理
          data[x] = that.nullToStr(data[x])
        }
      }
    }
    return data
  },

  /**
   * @description: 生成对应的表格数据的html5，用于打印
   * @param { ag-grid表格筛选过后的字段 } fieldsCheckList
   * @param { 添加的行数据 } rowData
   * @param { 打印的标题 } title
   * @return {*}
   */
  exportTableHTMLStr (fieldsCheckList, rowData, title = '标题') {
    const that = this
    return new Promise((resolve, reject) => {
      const id = 'printJsDom'
      if (!fieldsCheckList.length) {
        that.alert('请传入对应的列头')
        resolve('')
      }
      if (!rowData.length) {
        that.alert('请选择对应的行数')
        resolve('')
      }
      // 过滤函数
      const formatJson = (filterVal, jsonData) => {
        console.log('filterVal', filterVal)
        console.log('jsonData', jsonData)
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      }

      const props = fieldsCheckList.map((ele) => ele.field)
      const titles = fieldsCheckList.map((ele) => ele.headerName)

      // 过滤行数据
      const filterData = formatJson(props, rowData)

      // 表格标题
      const getTitle = (title) => {
        return `<caption>${title}</caption>`
      }

      // 列头
      const getHeaderDom = (header = []) => {
        let domStr = '<th>序号</th>'
        header.forEach((ele, index) => {
          domStr += `<th>${ele}</th>`
        })
        return `<tr>${domStr}</tr>`
      }

      // 行数据
      const getCellDom = (rowData) => {
        let rowDomStr = ''
        rowData.forEach((ele, index) => {
          let singleStr = `<td>${index + 1}</td>`
          ele.forEach((el, ind) => {
            singleStr += `<td>${el || '--'}</td>`
          })
          rowDomStr += `<tr>${singleStr}</tr>`
        })
        return `${rowDomStr}`
      }

      // 合并表格标签字符串
      const domStr = `<table border='1' style='border-collapse: collapse;' id='${id}'>
        ${title ? getTitle(title) : ''}
        ${getHeaderDom(titles)}
        ${getCellDom(filterData)}
        </table>`
      console.log('domStr', domStr)
      resolve(domStr)
    })
  },

  /**
   * @description: 设置水印
   * @param { Object } settings 水印的相关参数，设置如下defaultSettings
   * @return {*}
   */
  setWatermark (settings) {
    // 默认设置
    const defaultSettings = {
      watermark_txt: 'text',
      watermark_classname: 'mask_div', // 如果需要给单独的盒子加水印，需要命名特殊一点的classname
      watermark_x: 20, // 水印起始位置x轴坐标
      watermark_y: 20, // 水印起始位置Y轴坐标
      watermark_rows: 20, // 水印行数
      watermark_cols: 20, // 水印列数
      watermark_x_space: 100, // 水印x轴间隔
      watermark_y_space: 50, // 水印y轴间隔
      watermark_color: '#aaa', // 水印字体颜色
      watermark_alpha: 0.4, // 水印透明度
      watermark_fontsize: '15px', // 水印字体大小
      watermark_font: '微软雅黑', // 水印字体
      watermark_width: 210, // 水印宽度
      watermark_height: 80, // 水印长度
      watermark_angle: 15 // 水印倾斜度数
      // watermark_id: 'test'
    }
    const mergeObject = Object.assign(defaultSettings, settings)

    const mask_div_classname = mergeObject.watermark_classname
    // 检查原容器内是否存有水印
    const judgeWatermaskInCOntainer = () => {
      console.log('检查原容器内是否存有水印')
      const watermarkDom = document.querySelectorAll(`.${mask_div_classname}`)
      console.log('watermarkDom', watermarkDom)
      if (watermarkDom.length) {
        console.log('存在水印DOM')
        return watermarkDom
      } else {
        console.log('不存在水印DOM')
        return []
      }
    }

    // 清除DOM水印
    const clearWatermark = (watermarkDom) => {
      console.log('清除水印')
      const watermarkParentDom = watermarkDom[0].parentNode
      console.log('watermarkParentDom', watermarkParentDom)
      if (watermarkParentDom) {
        watermarkDom.forEach((ele) => {
          watermarkParentDom.removeChild(ele)
        })
      } else {
        console.error('未获取到水印的父节点')
      }
    }

    const oTemp = document.createDocumentFragment()

    let clientWidth, scrollWidth
    let clientHeight, scrollHeight
    let dom
    const hasWatermarkDom = judgeWatermaskInCOntainer()
    console.log('hasWatermarkDom', hasWatermarkDom)
    if (!hasWatermarkDom.length) {
      // 如果存在传入id， 以id盒子为容器
      if (mergeObject.watermark_id) {
        dom = document.getElementById(mergeObject.watermark_id)
        clientWidth = dom.clientWidth
        scrollWidth = dom.scrollWidth
        scrollHeight = dom.scrollHeight
        clientHeight = dom.clientHeight
      } else {
        // 不存在传入id,则以body标签为水印添加的容器
        dom = document.body
        clientWidth = document.body.scrollWidth
        clientHeight = document.body.clientWidth
        scrollHeight = document.body.scrollHeight
        clientHeight = document.body.clientHeight
      }

      // 获取页面最大宽度
      const p_width = Math.max(scrollWidth, clientWidth)
      const cutWidth = p_width * 0.015
      const page_width = p_width - cutWidth
      // 获取页面最大高度
      const page_height = Math.max(scrollHeight, clientHeight)
      // let page_height = document.body.scrollHeight+document.body.scrollTop;
      // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
      if (
        mergeObject.watermark_cols === 0 ||
        parseInt(
          mergeObject.watermark_x +
            mergeObject.watermark_width * mergeObject.watermark_cols +
            mergeObject.watermark_x_space * (mergeObject.watermark_cols - 1)
        ) > page_width
      ) {
        mergeObject.watermark_cols = parseInt(
          (page_width -
            mergeObject.watermark_x +
            mergeObject.watermark_x_space) /
            (mergeObject.watermark_width + mergeObject.watermark_x_space)
        )
        mergeObject.watermark_x_space = parseInt(
          (page_width -
            mergeObject.watermark_x -
            mergeObject.watermark_width * mergeObject.watermark_cols) /
            (mergeObject.watermark_cols - 1)
        )
      }
      // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
      if (
        mergeObject.watermark_rows === 0 ||
        parseInt(
          mergeObject.watermark_y +
            mergeObject.watermark_height * mergeObject.watermark_rows +
            mergeObject.watermark_y_space * (mergeObject.watermark_rows - 1)
        ) > page_height
      ) {
        mergeObject.watermark_rows = parseInt(
          (mergeObject.watermark_y_space +
            page_height -
            mergeObject.watermark_y) /
            (mergeObject.watermark_height + mergeObject.watermark_y_space)
        )
        mergeObject.watermark_y_space = parseInt(
          (page_height -
            mergeObject.watermark_y -
            mergeObject.watermark_height * mergeObject.watermark_rows) /
            (mergeObject.watermark_rows - 1)
        )
      }
      let x
      let y
      for (let i = 0; i < mergeObject.watermark_rows; i++) {
        y =
          mergeObject.watermark_y +
          (mergeObject.watermark_y_space + mergeObject.watermark_height) * i
        for (let j = 0; j < mergeObject.watermark_cols; j++) {
          x =
            mergeObject.watermark_x +
            (mergeObject.watermark_width + mergeObject.watermark_x_space) * j
          const mask_div = document.createElement('div')
          mask_div.id = 'mask_div' + i + j
          mask_div.className = mask_div_classname
          mask_div.appendChild(
            document.createTextNode(mergeObject.watermark_txt)
          )
          // 设置水印div倾斜显示
          mask_div.style.webkitTransform =
            'rotate(-' + mergeObject.watermark_angle + 'deg)'
          mask_div.style.MozTransform =
            'rotate(-' + mergeObject.watermark_angle + 'deg)'
          mask_div.style.msTransform =
            'rotate(-' + mergeObject.watermark_angle + 'deg)'
          mask_div.style.OTransform =
            'rotate(-' + mergeObject.watermark_angle + 'deg)'
          mask_div.style.transform =
            'rotate(-' + mergeObject.watermark_angle + 'deg)'
          mask_div.style.visibility = ''
          mask_div.style.position = 'absolute'
          mask_div.style.left = x + 'px'
          mask_div.style.top = y + 'px'
          mask_div.style.overflow = 'hidden'
          mask_div.style.zIndex = '9999'
          mask_div.style.pointerEvents = 'none' // pointer-events:none 让水印不遮挡页面的点击事件
          mask_div.style.opacity = mergeObject.watermark_alpha
          mask_div.style.fontSize = mergeObject.watermark_fontsize
          mask_div.style.fontFamily = mergeObject.watermark_font
          mask_div.style.color = mergeObject.watermark_color
          mask_div.style.textAlign = 'center'
          mask_div.style.width = mergeObject.watermark_width + 'px'
          mask_div.style.height = mergeObject.watermark_height + 'px'
          mask_div.style.display = 'block'
          oTemp.appendChild(mask_div)
        }
      }
      dom.appendChild(oTemp)
    } else {
      clearWatermark(hasWatermarkDom)
    }
  },

  /**
   * @description: 导出txt文件
   * @param {String} data 字符串
   * @param {String} fileName 文件名
   * @return {*}
   */
  downLoadTxtFile (data, fileName = '文本') {
    var blob = new Blob([JSON.stringify(data)], {
      type: 'text/plain;charset=utf-8'
    })
    saveAs(blob, `${fileName}.txt`)
  },

  /**
   * @description: 下载二维码压缩包
   * @param {Array[]} imgArr 二维码数组
   * @param {String} fileName 压缩包文件名
   * @return {*}
   */
  qrCodeDownLoadZipFile (imgArr = [], fileName = '压缩包', suffix = 'png') {
    if (imgArr.length) {
      const zip = new JSZip() // 实例化zip
      const img = zip.folder('qrCode') // zip包内的文件夹名字
      imgArr.forEach((item) => {
        // listOfData是含有图片的数据数组
        const basePic = item.url.replace(/^data:image\/(png|jpg);base64,/, '') // 生成base64图片数据
        img.file(item.name + '.' + suffix, basePic, {
          base64: true
        }) // 将图片文件加入到zip包内
      })
      zip
        .generateAsync({
          type: 'blob'
        }) // zip下载
        .then(function (content) {
          // see FileSaver.js
          saveAs(content, `${fileName}.zip`) // zip下载后的名字
        })
    } else {
      Message.warning('压缩不存在对应文件！')
    }
  },

  /**
   * @description: 下载图片链接
   * @param {String} url 下载的图片链接
   * @param {String} suffix 后缀名
   * @param {String} fileName 文件名
   * @return {*}
   */
  downLoadImgUrl (url, fileName = 'image', suffix = 'png') {
    saveAs(url, `${fileName}.${suffix}`)
  },

  /**
   * @description: 借助微软第三方线上预览 excel / doc / pdf 等文件
   * @param {*} fileUrl 文件https路径
   * @param {*} type 类型，预览：preview ， 下载：downLoad
   * @return {*}
   *
   * 测试doc : http://image.precare.cn/%E7%BB%A9%E6%95%88%E8%80%83%E6%A0%B8-%E5%8C%BB%E9%99%A2%E6%8E%A5%E5%85%A5%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83-V1.0.0%281%29.doc
   * 测试pdf : http://3pl.dekuncn.com//upload/2022-01-19/202201191105532490ZR78NC.pdf
   *
   */
  officeappsLivePreview (fileUrl, type = 'preview') {
    const baseUrl = 'https://view.officeapps.live.com/op/view.aspx'
    const url = `${baseUrl}?src=${fileUrl}`
    if (type === 'preview') {
      window.open(url)
    } else if (type === 'downLoad') {
      window.open(fileUrl)
    }
  },

  /**
   * @description: html转义
   * @param {String} htmlStr
   * @return {*}
   */
  htmlEscape (htmlStr) {
    return htmlStr.replace(/<|>|"|&/g, (match) => {
      switch (match) {
        case '<':
          return '&lt;'
        case '>':
          return '&gt;'
        case '"':
          return '&quot;'
        case '&':
          return '&amp;'
      }
    })
  },

  /**
   * @description: 还原html
   * @param {String} str
   * @return {*}
   */
  htmlUnEscape (str) {
    return str.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
      switch (match) {
        case '&lt;':
          return '<'
        case '&gt;':
          return '>'
        case '&quot;':
          return '"'
        case '&amp;':
          return '&'
      }
    })
  },

  /**
   * @description: 获取location对象
   * @param {*}
   * @return {*}
   */
  getCurrentWindowLocationInfo () {
    const { location } = window
    const { href, protocol, host, port, hostname } = location
    const locationInfo = {
      location,
      href,
      protocol,
      host,
      port,
      hostname
    }
    console.log('获取location信息=========>', locationInfo)
    return locationInfo
  },

  /**
   * @description: 复制至剪贴板
   * @param { this指针 } that
   * @param {String} text 复制文本
   * @return {*}
   */
  copyToClipboard (that, text) {
    if (isString(text)) {
      that.$copyText(text).then(
        (res) => {
          console.log('复制成功=====>', text)
          that.$message.success('已成功复制，可直接去粘贴')
        },
        (res) => {
          console.error('复制失败！', res)
          that.$message.warning('复制失败！')
        }
      )
    } else {
      that.$message.warning('复制内容应为字符串类型！')
    }
  },

  // 构想需求：记录确认弹窗操作界面/操作内容

  /**
   * @description: 确认弹窗
   * @param { Object|String } config 配置文件
   * 当 config 的类型为String 时，直接采用默认的方式执行
   * 当 config 的类型为Object 时， 需要有 确认回调函数， 取消回调函数 ， 结束回调函数
   *
   * @return {*}
   */
  confirmModel (config, that) {
    return new Promise((resolve, reject) => {
      try {
        let extraData = {}
        if (typeof config === 'string') {
          extraData = {
            content: config
          }
        } else if (typeof config === 'object') {
          var {
            confirmCalback,
            cancelCallback,
            overCallback,
            isRecord = true,
            ...tempExtraData
          } = config
          extraData = tempExtraData
        }

        const data = {
          title: '提示',
          content: '请您再次确认?',
          model: {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          },
          ...extraData
        }

        // 记录操作日志
        const recordOperationLog = () => {
          store.dispatch('setting/log/pushOperationLog', {
            message: data.content,
            type: data.model.type,
            operationType: 'confirm'
          })
        }

        const { title, content, model } = data
        that
          .$confirm(content, title, model)
          .then((res) => {
            console.log('弹窗确认======>', res)
            if (res === 'confirm') {
              if (typeof confirmCalback === 'function') {
                confirmCalback()
              } else {
                resolve('confirm')
              }

              isRecord && recordOperationLog()
            } else if (res === 'cancel') {
              if (typeof cancelCallback === 'function') {
                cancelCallback()
              } else {
                resolve('cancel')
              }
            }
          })
          .finally(() => {
            typeof overCallback === 'function' && overCallback()
            resolve('cancel')
          })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default commFun
