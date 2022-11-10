<!--
 * @Author: Null
 * @Date: 2022-01-19 10:14:59
 * @Description: 预览打印失败*-提示弹窗
-->
<template>
  <el-dialog
    title="预览打印失败"
    :visible="$store.state.form.ruilangAlert"
    width="45%"
    modal-append-to-body="false"
    :before-close="operation"
  >
    <h3>请尝试以下两种方法:</h3>
    <ol class="ruilang-startup">
      <li>
        如果电脑端已经安装了锐浪报表Web客户端，则<span
          class="rulang-text"
          @click="startUp"
        >尝试启动WEB报表客户端程序</span>，打开成功之后，关闭该弹窗，重新尝试打印预览
      </li>
      <li>
        未安装锐浪报表Web客户端<span
          class="rulang-text"
          @click="downloadExe"
        >点击下载WEB报表客户端程序</span>，下载后双击下载的文件进行安装，安装完成后重新打开当前网页。
      </li>
    </ol>
    <span slot="footer" class="dialog-footer">
      <el-button @click="operation">取 消</el-button>
      <el-button type="primary" @click="operation">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { webapp_urlprotocol_startup } from '@/utils/ruilang/grwebapp'
export default {
  name: 'RuilangDialog',
  methods: {
    operation () {
      this.$store.commit('form/SET_RUILANG_ALERT', false)
    },
    // 下载啊客户端exe文件
    downloadExe () {
      window.location.href =
        'http://www.rubylong.cn/download/gridreport6-webapp.exe'
    },
    // 重新启动程序
    startUp () {
      webapp_urlprotocol_startup()
    }
  }
}
</script>
