<!--
 * @Author: Null
 * @Date: 2022-04-12 11:03:06
 * @Description:
-->
<template>
  <div class="container" flex="cross:center">
    <div class="container-1">
      <div class="dk-content">
        示例:借助v-clipboard:copy, v-clipboard:success , v-clipboard:error
      </div>
      <div class="dk-mt-4" flex>
        <el-input v-model="message" class="dk-mr-10" type="text" />
        <el-button
          v-clipboard:copy="
            '地址：' +
              detail.address +
              '\n姓名：' +
              detail.name +
              '\n电话：' +
              detail.phone +
              '\n信息：' +
              message
          "
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制
        </el-button>
      </div>
    </div>

    <div class="container-2 dk-ml-16">
      <el-button class="fs12" @click="copyCode">复制</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyVueClipboard',
  data () {
    return {
      message: '',
      detail: {
        address: '地址',
        name: '名字',
        phone: '1234567'
      }
    }
  },
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      console.log(e)
      alert('Failed to copy texts')
    },
    copyCode () {
      this.$copyText(
        `地址：${this.detail.address}\n收件人： ${this.detail.name}\n电话：${this.detail.phone}`
      ).then(
        (res) => {
          this.$message.success('已成功复制，可直接去粘贴', res)
        },
        (res) => {
          console.log('复制失败！', res)
        }
      )
    }
  }
}
</script>
