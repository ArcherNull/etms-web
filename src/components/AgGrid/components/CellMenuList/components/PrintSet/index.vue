<!--
 * @Author: Null
 * @Date: 2022-11-11 13:41:28
 * @Description: 字段设置
-->
<template>
  <div class="PrintSet">
    <FirstTitle title="打印">
      <div slot="content">
        <MyButton size="mini" type="primary" @click="webPagePrint">
          网页打印
        </MyButton>
        <MyButton size="mini" type="primary" @click="ruiLangPrint">
          锐浪报表打印
        </MyButton>
      </div>
    </FirstTitle>
  </div>
</template>

<script>
export default {
  name: 'PrintSet',
  components: {
    FirstTitle: () => import('../FirstTitle/index.vue'),
    MyButton: () => import('../MyButton/index.vue')

  },
  methods: {
    // 网页打印
    webPagePrint () {
      console.log('网页打印')
    },
    // 锐浪报表打印
    ruiLangPrint () {
      console.log('锐浪报表打印')
    }
  }
}
</script>
