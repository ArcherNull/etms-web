<!--
 * @Author: Null
 * @Date: 2022-11-11 13:41:28
 * @Description: 字段设置
-->
<template>
  <div class="FilesSet">
    <FirstTitle title="导入">
      <div slot="content">
        <el-button size="mini" type="primary" @click="importFun">
          前端导入解析
        </el-button>
        <el-button size="mini" type="primary" @click="importFun">
          后端导入解析
        </el-button>
      </div>
    </FirstTitle>
    <FirstTitle title="导出">
      <div slot="content">
        <el-button size="mini" type="primary" @click="importFun">
          前端导出
        </el-button>
        <el-button size="mini" type="primary" @click="importFun">
          后端导出
        </el-button>
      </div>
    </FirstTitle>

    <!-- 前端导入解析 -->

    <!-- 前端导入解析 -->

    <!-- 前端导出 -->

    <!-- 后端导出 -->

  </div>
</template>

<script>
export default {
  name: 'FilesSet',
  components: {
    FirstTitle: () => import('../FirstTitle/index.vue')
  },
  methods: {
    importFun () {
      console.log('导入')
    }
  }
}
</script>
