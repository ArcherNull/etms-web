<!--
 * @Author: Null
 * @Date: 2022-05-13 10:28:57
 * @Description:
-->
<template>
  <div class="MessageBox">
    <!-- 顶部搜索框 -->
    <HeaderContainer class-name="MessageBox-header dk-header-search-container">
      <!--  -->
      <MySearchBox slot="left" />

      <MyBtnList
        slot="right"
        :btn-list-config="btnListConfig"
        @clickFun="clickFun"
      />
    </HeaderContainer>

    <!-- 侧边菜单栏 -->
    <!-- <div class="MessageBox-aside">侧边菜单栏</div> -->

    <!-- 主要内容区域 -->
    <div class="MessageBox-main dk-mt-10">
      <!-- 分为： 公告通知/操作消息/系统消息 <br>
      公告通知，分为 通知/公告/单证中心/审批等<br>
      操作消息，分为 操作历史记录，运单/订单/审批单号/账单等操作记录等<br>
      系统消息， 分为系统版本信息，引导页等 -->

      <el-tabs :tab-position="tabPosition" style="height: 200px">
        <el-tab-pane label="公告通知">公告通知</el-tab-pane>
        <el-tab-pane label="操作消息">操作消息</el-tab-pane>
        <el-tab-pane label="系统消息">系统消息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox', // 消息收纳盒，用于收集会话过程中的所有操作消息
  data () {
    return {
      btnListConfig: {
        schemas: [
          {
            btnText: '新增',
            type: 'primary',
            loading: false
          },
          {
            btnText: '审批',
            type: 'success'
          },
          {
            btnText: '删除',
            plain: true,
            type: 'danger'
          }
        ]
      },
      tabPosition: 'left'
    }
  },
  methods: {
    /**
     * @description: MyBtnList组件的事件统一处理
     * @param {*} ele
     * @return {*}
     */
    clickFun (ele) {
      const { item } = ele
      item.loading = true
      switch (item.btnText) {
        case '新增':
          console.log('新增')
          this.$commJs.confirmModel('确认新增吗？', this).then((res) => {
            console.log('res======>', res)
          }).finally(() => {
            item.loading = false
          })
          break
        case '审批':
          console.log('审批')
          this.$commJs.confirmModel('确认审批吗？').then((res) => {
            console.log('res======>', res)
          }).finally(() => {
            item.loading = false
          })
          break
        case '删除':
          console.log('删除')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.MessageBox {
  &-header {
    @extend %card;
  }
  &-aside {
  }
  &-main {
  }
}
</style>
