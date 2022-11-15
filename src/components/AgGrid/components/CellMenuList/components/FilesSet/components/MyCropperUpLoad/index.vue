<template>
  <div class="MyCropperUpLoad">
    <!-- 多图片上传 -->
    <el-upload v-if="multiple" action="string" list-type="picture-card" :on-preview="handlePreview" :auto-upload="false" :on-remove="handleRemove" :http-request="upload" :on-change="consoleFL" :file-list="uploadList">
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 单图片上传 -->
    <el-upload v-else class="avatar-uploader" action="'string'" :auto-upload="false" :show-file-list="false" :on-change="handleCrop" :http-request="upload">
      <img v-if="imageUrl" ref="singleImg" :src="imageUrl" class="avatar" :style="{width:width+'px',height:height+'px'}" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <i v-else class="el-icon-plus avatar-uploader-icon" :style="{width:width+'px',height:height+'px','line-height':height+'px','font-size':height/6+'px'}" />
      <!-- 单图片上传状态显示 -->
      <!-- <div v-if="imageUrl" class="reupload" ref="reupload" @click.stop="handlePreviewSingle" @mouseenter="mouseEnter" @mouseleave="mouseLeave" :style="{width:reuploadWidth+'px',height:reuploadWidth+'px','line-height':reuploadWidth+'px','font-size':reuploadWidth/5+'px'}">重新上传</div> -->
      <div v-if="imageUrl" id="uploadIcon" ref="reupload" :style="{width:'100%'}" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <i class="el-icon-zoom-in" :style="{color:'#2E2E2E',fontSize:'25px',display:'inline-block',paddingRight:'15px'}" @click.stop="handlePreviewSingle" />
        <i class="el-icon-upload" :style="{color:'#2E2E2E',fontSize:'25px',display:'inline-block'}" />
      </div>
      <div ref="uploading" class="reupload" :style="{width:reuploadWidth+'px',height:reuploadWidth+'px','line-height':reuploadWidth+'px','font-size':reuploadWidth/5+'px'}">上传中..</div>
      <div ref="failUpload" class="reupload" :style="{width:reuploadWidth+'px',height:reuploadWidth+'px','line-height':reuploadWidth+'px','font-size':reuploadWidth/5+'px'}">上传失败</div>
    </el-upload>
    <!-- 多图片预览弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- 剪裁组件弹窗 -->
    <MyDialog :visible.sync="cropperModel" title="图片剪裁" width="850px" :before-close="beforeClose">
      <div slot="content">
        <MyVueCropper :img-url="imgTempUrl" />
      </div>
    </MyDialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'MyCropperUpLoad',
  components: {
    MyDialog: () => import('../../../MyDialog/index.vue'),
    MyVueCropper: () => import('./MyVueCropper/index.vue')
  },
  props: {
    targetUrl: {
      // 上传地址
      type: String,
      default: '/storage/upload'
    },
    multiple: {
      // 多图开关
      type: Boolean,
      default: false
    },
    initUrl: {
      type: String,
      // 初始图片链接
      default: ''
    },
    fixedNumber: {
      type: Array,
      // 剪裁框比例设置
      default: function () {
        return [3, 1]
      }
    },
    width: {
      // 单图剪裁框宽度
      type: Number,
      default: 178
    },
    height: {
      // 单图剪裁框高度
      type: Number,
      default: 178
    }
  },
  data () {
    return {
      file: '', // 当前被选择的图片文件
      imageUrl: '', // 单图情况框内图片链接
      dialogImageUrl: '', // 多图情况弹窗内图片链接
      uploadList: [], // 上传图片列表
      reupload: true, // 控制"重新上传"开关
      dialogVisible: false, // 展示弹窗开关
      cropperModel: false, // 剪裁组件弹窗开关
      reuploadWidth: this.height * 0.7, // 动态改变”重新上传“大小
      imgTempUrl: ''
    }
  },
  watch: {
    initUrl: function (val) {
      // 监听传入初始化图片
      console.info('watch')
      console.info(val)
      if (val) {
        if (typeof this.initUrl === 'string') {
          this.imageUrl = val
        } else {
          this.uploadList = this.formatImgArr(val)
        }
      }
    }
  },
  updated () {
    if (this.$refs.vueCropper) {
      this.$refs.vueCropper.Update()
    }
  },
  mounted () {
    if (typeof this.initUrl === 'string') {
      this.imageUrl = this.initUrl
    } else {
      this.uploadList = this.formatImgArr(this.initUrl)
    }
  },
  methods: {
    /** **************************** multiple多图情况 **************************************/
    handlePreview (file) {
      // 点击进行图片展示
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      // 删除图片后更新图片文件列表并通知父级变化
      this.uploadList = fileList
      this.$emit('imgupload', this.formatImgArr(this.uploadList))
    },
    consoleFL (file, fileList) {
      console.log('file=====>', file)
      console.log('fileList=====>', fileList)

      // 弹出剪裁框，将当前文件设置为文件
      this.cropperModel = true
      const imgTempUrl = this.getFileObjectURL(file)
      console.log('imgTempUrl=====>', imgTempUrl)

      this.file = file
      this.uploadList = fileList
    },
    /** **********************************************************************************/

    /** **************************** single单图情况 **************************************/
    handlePreviewSingle (file) { // 点击进行图片展示
      this.dialogImageUrl = this.file.url
      this.dialogVisible = true
    },
    // 鼠标进入
    mouseEnter () { // 鼠标划入显示“重新上传”
      this.$refs.reupload.style.display = 'block'
      if (this.$refs.failUpload.style.display === 'block') {
        this.$refs.failUpload.style.display = 'none'
      }
      this.$refs.singleImg.style.opacity = '0.6'
    },
    // 鼠标离开
    mouseLeave () {
      // 鼠标划出隐藏“重新上传”
      this.$refs.reupload.style.display = 'none'
      this.$refs.singleImg.style.opacity = '1'
    },
    handleCrop (file, files) {
      // 点击弹出剪裁框
      this.cropperModel = true
      this.file = file
      const imgTempUrl = this.getFileObjectURL(file)
      this.imgTempUrl = imgTempUrl

      // this.imageUrl = file.url
    },
    /** **********************************************************************************/
    // 上传
    upload (data) {
      // 自定义upload事件
      if (!this.multiple) {
        // 如果单图，则显示正在上传
        this.$refs.uploading.style.display = 'block'
      }
      const formData = new FormData()
      formData.append('attachment', data)
      axios.post(this.targetUrl, formData).then(res => {
        if (!this.multiple) {
          // 上传完成后隐藏正在上传
          this.$refs.uploading.style.display = 'none'
        }
        if (res.msg === 'success') {
          // 上传成功将照片传回父组件
          const currentPic = res.data.url
          if (this.multiple) {
            this.uploadList.push({
              url: currentPic,
              uid: '111'
            })
            this.uploadList.pop()
            this.$emit('imgupload', this.formatImgArr(this.uploadList))
          } else {
            this.$emit('imgupload', currentPic)
          }
        } else {
          // 上传失败则显示上传失败，如多图则从图片列表删除图片
          if (!this.multiple) {
            this.$refs.failUpload.style.display = 'block'
          } else {
            this.uploadList.pop()
          }
        }
      })
      this.cropperModel = false
    },
    // 格式化图片数组
    formatImgArr (arr) {
      const result = arr.map((item, index) => {
        if (typeof item === 'string') {
          return {
            url: item,
            uid: `index${index}`
          }
        } else {
          return item.url
        }
      })
      return result
    },
    // 关闭前操作
    beforeClose (done) {
      this.uploadList.pop()
      this.cropperModel = false
    },
    // 获取生成文件临时路径
    getFileObjectURL (file) {
      if (file?.raw) {
        const url = this.$commJs.getObjectURL(file.raw)
        console.log('url', url)
        return url
      } else {
        this.$message.error('获取文件信息，生成临时路径失败！')
      }
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    color: #8c939d;
    text-align: center;
  }
  .avatar {
    display: block;
  }
  .reupload {
    border-radius: 50%;
    position: absolute;
    color: #fff;
    background-color: #000000;
    opacity: 0.6;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
  #uploadIcon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
</style>
