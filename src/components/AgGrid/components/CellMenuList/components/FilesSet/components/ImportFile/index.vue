<!--
 * @Author: Null
 * @Date: 2022-11-14 20:11:20
 * @Description: 导入文件
-->
<template>
  <div class="ImportFile">
    <ParsingExcel />
  </div>
</template>

<script>
export default {
  name: 'ImportFile',
  components: {
    ParsingExcel: () => import('../../../ParsingExcel/index.vue')
  }
}
</script>

