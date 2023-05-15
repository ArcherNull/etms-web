<!--
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 首页界面
-->
<template>
  <div>
    <div class="index">
      <div @click="openConfirm">默认展示首页界面==================</div>
      <div @click="openDialog">打开弹窗</div>
      <div @click="alert">警告</div>

      <router-link to="/system/user">跳转</router-link>

    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',

  data () {
    return {
      dialogVisible: false,
      title: '标题'
    }
  },
  created () {
    console.log(1234)
  },
  methods: {
    openConfirm () {
      this.$confirm('警告文本', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        console.log('用户点击确认弹窗', res)
      })
    },
    openDialog () {
      this.dialogVisible = true
    },
    alert () {
      this.$message.warning('警告')
      // this.$message.success('成功')
      // this.$message.error('危险')
      // this.$message.info('普通文本')
    }
  }
}
</script>
<style scoped>
.index {
  height: 400vh;
}
</style>
