<template>
  <div class="Domain">
    <MyButton @click="login">登录</MyButton>
  </div>
</template>

<script>
// import { addHttp, delHttp, editHttp, queryHttp } from '@/api/system/domain'
export default {
  name: 'Domain',
  data () {
    return {

    }
  },
  methods: {
    login () {
      console.log('12312312')
    }
  }
}
</script>

<style lang="scss" scoped>
.Domain {}
</style>
