/*
 * @Author: Null
 * @Date: 2021-11-09 20:00:19
 * @Description: 前端验证码校验
 */

const validateCode = {
  /**
   *  验证码校验
   *  value : 校验值
   *  code ：生成的验证码值
   *  isUpperCase :是否区分大小写
   */
  validateFun: function (value, code, isUpperCase = true) {
    let inputCode
    value = value.trim()
    code = code.trim()
    return new Promise(function (resolve, reject) {
      // 不区分大小写
      if (!isUpperCase) {
        inputCode = value
      } else {
        inputCode = value.toUpperCase()
        code = code.toUpperCase()
      }
      // 取得输入的验证码并转化为大写
      if (inputCode) {
        // 若输入的验证码长度为0
        if (inputCode === code) {
          resolve(true)
        } else {
          resolve(false)
        }
      } else {
        resolve(false)
      }
    })
  },

  /**
   *  生成验证码
   *  length : 验证码长度
   */
  identicalCode: function (length = 4) {
    return new Promise(function (resolve) {
      let code = ''
      const codeLength = length // 验证码的长度
      // 随机数
      const random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ]
      for (let i = 0; i < codeLength; i++) {
        // 循环操作
        const index = Math.floor(Math.random() * 62) // 取得随机数的索引（0~52）
        code += random[index] // 根据索引取得随机数加到code上
      }
      resolve(code)
    })
  },
  /**
   * 绘制验证码图片
   * canvasId 为验证码canvas图片id
   * code验证码上面的文字
   */
  canvasCode: function (canvasId, code) {
    const fontSizeMin = 35 // 最小字体
    const fontSizeMax = 50 // 最大字体
    const contentWidth = 220 // 画布宽度
    const contentHeight = 50 // 画布高度
    // 获取挂载到的DOM的id
    const canvas = document.getElementById(canvasId)
    canvas.width = contentWidth // 设置画布宽高
    canvas.height = contentHeight
    // 创建画布
    const cv = canvas.getContext('2d')
    cv.textBaseline = 'bottom'
    // 绘制背景
    cv.fillStyle = randomColor(200, 220)
    cv.fillRect(0, 0, contentWidth, contentHeight)
    // 8cv.font = 'italic 700 50px/100px 宋体'
    for (let i = 0; i < code.length; i++) {
      drawText(cv, code[i], i)
    }
    drawLine(cv)
    drawDot(cv)

    // 生成一个随机数
    function randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    // 生成一个随机的颜色
    function randomColor (min, max) {
      const r = randomNum(min, max)
      const g = randomNum(min, max)
      const b = randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }

    function drawText (cv, txt, i) {
      cv.fillStyle = randomColor(50, 160) // 随机生成字体颜色
      cv.font = randomNum(fontSizeMin, fontSizeMax) + 'px SimHei' // 随机生成字体大小
      const x = (i + 1) * (contentWidth / (code.length + 1))
      const y = randomNum(fontSizeMax, contentHeight - 5)
      var deg = randomNum(-30, 30)
      // 修改坐标原点和旋转角度
      cv.translate(x, y)
      cv.rotate((deg * Math.PI) / 180)
      cv.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      cv.rotate((-deg * Math.PI) / 180)
      cv.translate(-x, -y)
    }

    function drawLine (cv) {
      // 绘制干扰线
      for (let i = 0; i < 4; i++) {
        cv.strokeStyle = randomColor(100, 200)
        cv.beginPath()
        cv.moveTo(randomNum(0, contentWidth), randomNum(0, contentHeight))
        cv.lineTo(randomNum(0, contentWidth), randomNum(0, contentHeight))
        cv.stroke()
      }
    }

    function drawDot (cv) {
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        cv.fillStyle = randomColor(0, 255)
        cv.beginPath()
        cv.arc(
          randomNum(0, contentWidth),
          randomNum(0, contentHeight),
          1,
          0,
          2 * Math.PI
        )
        cv.fill()
      }
    }
  }
}

export default validateCode
