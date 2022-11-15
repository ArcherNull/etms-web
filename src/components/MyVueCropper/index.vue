<!--
 * @Author: Null
 * @Date: 2022-08-18 08:36:30
 * @Description: 图片剪裁工具
-->
<template>
  <div class="MyVueCropper">
    <div
      class="MyVueCropper-clip"
      :style="{ height: height }"
      flex="cross:stretch"
    >
      <div
        class="MyVueCropper-clip-cropper"
        :style="{ height: height, width: width }"
      >
        <vueCropper
          ref="cropper"
          v-bind="options"
          :img="imgUrl"
          @realTime="realTime"
          @imgMoving="imgMoving"
          @cropMoving="cropMoving"
        />
      </div>
      <div
        class="MyVueCropper-clip-preview"
        flex="main:center cross:center"
        :style="{ height: height, width: width }"
      >
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img">
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="MyVueCropper-button dk-mt-10" flex="main:justify">
      <div class="MyVueCropper-button__left">
        <!-- 放大 -->
        <MyButton type="primary" plain title="放大" icon="el-icon-zoom-in" @click="changeScale(1)" />
        <!-- 缩小 -->
        <MyButton type="primary" plain title="缩小" icon="el-icon-zoom-out" @click="changeScale(-1)" />
        <!-- 顺时针 -->
        <MyButton type="primary" plain title="顺时针旋转" icon="el-icon-refresh-right" @click="rotateRight()" />
        <!-- 逆时针 -->
        <MyButton type="primary" plain title="逆时针旋转" icon="el-icon-refresh-left" @click="rotateLeft()" />
        <!-- 下载剪裁图 -->
        <MyButton type="primary" plain title="下载剪裁图" icon="el-icon-download" @click="downLoadCropImg()" />
        <!-- 添加水印 -->
        <MyButton type="primary" plain title="压缩图片" @click="compressImg()">压缩</MyButton>
        <!-- 添加水印 -->
        <MyButton type="primary" plain title="添加水印" @click="addWaterMask()">印</MyButton>
      </div>
      <div class="MyVueCropper-button__right">
        <MyButton type="primary" title="上传base64数据" icon="el-icon-upload" @click="getCropBase64Data()">base64</MyButton>
        <MyButton type="primary" title="上传blob数据" icon="el-icon-upload" @click="getCropBlobData()">blob</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import { convertImageFormat } from '@/common/formatConversion'

export default {
  name: 'MyVueCropper',
  props: {
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '400px'
    },
    // 剪切图片路径， 线上链接图片或临时本地图片路径
    imgUrl: {
      type: String,
      require: true,
      default: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
    }
  },
  data () {
    return {
      options: {
        // 裁剪图片的地址
        // img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        // 裁剪生成图片的质量
        outputSize: 1,
        // 裁剪生成图片的格式
        outputType: 'png',
        // 裁剪框的大小信息
        info: true,
        // 图片是否允许滚轮缩放
        canScale: true,
        // 是否默认生成截图框
        autoCrop: true,
        // 默认生成截图框宽度
        autoCropWidth: 150,
        // 默认生成截图框高度
        autoCropHeight: 150,
        // 是否开启截图框宽高固定比例
        fixed: false,
        // 截图框的宽高比例 ,[ 宽度 , 高度 ]
        fixedNumber: [1, 1],
        // 固定截图框大小
        fixedBox: false,
        // 上传图片是否可以移动
        canMove: true,
        // 截图框能否拖动
        canMoveBox: true,
        // 上传图片按照原始比例渲染
        original: false,
        // 截图框是否被限制在图片里面
        centerBox: false,
        // 是否按照设备的dpr 输出等比例图片
        high: true,
        // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        infoTrue: true,
        // 限制图片最大宽度和高度
        maxImgSize: 2000,
        // 图片根据截图框输出比例倍数
        enlarge: 0.5,
        // 图片默认渲染方式
        mode: 'contain'
      },

      // 实时预览图片
      previews: []
    }
  },
  methods: {
    // @realTime 实时预览事件
    realTime (data) {
      var previews = data
      var h = 0.5
      var w = 0.2

      this.previewStyle1 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: h
      }

      this.previewStyle2 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: w
      }

      // 固定为 100 宽度
      this.previewStyle3 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: 100 / previews.w
      }

      // 固定为 100 高度
      this.previewStyle4 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: 100 / previews.h
      }
      this.previews = data
    },

    // 图片移动回调函数
    imgMoving (ele) {
      console.log('图片移动回调函数', ele)
    },

    // 截图框移动回调函数
    cropMoving (ele) {
      console.log('截图框移动回调函数', ele)
    },

    // 图片缩放
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },

    // 向右-顺时针旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },

    // 向左-逆时针旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },

    // 下载剪裁图
    downLoadCropImg () {
      this.getCropBlobData().then((res) => {
        console.log('获取截图的blob数据=====>', res)
        convertImageFormat(res)
      })
    },

    // 压缩图片
    compressImg () {
      console.log('压缩图片')
    },

    // 添加水印
    addWaterMask () {
      console.log('添加水印')
    },

    // 获取剪切框的内置属性和方法
    getCropAttrAndMethods () {
      if (this.$refs?.cropper) {
        const cropper = this.$refs?.cropper
        const obj = {
          cropW: cropper.cropW, // 截图框宽度
          cropH: cropper.cropH, // 截图框高度
          startCrop: cropper.startCrop, // 开始截图
          stopCrop: cropper.stopCrop, // 停止截图
          clearCrop: cropper.clearCrop, // 清除截图
          changeScale: cropper.changeScale, // 修改图片大小 正数为变大 负数变小
          getImgAxis: cropper.getImgAxis, // 获取图片基于容器的坐标点
          getCropAxis: cropper.getCropAxis, // 获取截图框基于容器的坐标点
          goAutoCrop: cropper.goAutoCrop, // 自动生成截图框函数
          rotateRight: cropper.rotateRight, // 向右边旋转90度
          rotateLeft: cropper.rotateLeft // 向左边旋转90度
        }
        console.log('obj', obj)
        return obj
      }
    },

    // 获取截图的 base64 数据
    getCropBase64Data () {
      const that = this
      return new Promise((resolve, reject) => {
        if (that.$refs.cropper) {
          that.$refs?.cropper?.getCropData((data) => {
            console.log('获取截图的 base64 数据=====>', data)
            resolve(data)
          })
        } else {
          reject(false)
        }
      })
    },

    // 获取截图的 blob 数据
    getCropBlobData () {
      const that = this
      return new Promise((resolve, reject) => {
        if (that.$refs.cropper) {
          that.$refs?.cropper?.getCropBlob((data) => {
            console.log('获取截图的 blob 数据=====>', data)
            resolve(data)
          })
        } else {
          reject(false)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.MyVueCropper {
  display: inline-block;
  &-clip {
    &-cropper {
      // width: 500px;
      // height: 500px;
    }
    &-preview {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      overflow: hidden;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 10px;
      .preview {
        overflow: hidden;
        border: 1px solid #fff;
        background: #cccccc;
      }
    }
  }
}
</style>
