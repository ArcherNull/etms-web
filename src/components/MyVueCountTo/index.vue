<template>
  <div>
    <count-to
      ref="countTo"
      :start-val="options.startVal"
      :end-val="options.endVal"
      :duration="options.duration"
      :decimals="options.decimals"
      :separator="options.separator"
      :prefix="options.prefix"
      :suffix="options.suffix"
      :autoplay="options.autoplay"
      :mounted-callback="mountedCallback"
    />
    <el-button @click="start">开始</el-button>
    <el-button @click="pause">暂停</el-button>

    <el-button @click="reset">重置</el-button>

    <el-button @click="mountedCallback">渲染回调</el-button>

  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'MyVueCountTo',
  components: {
    countTo
  },
  data () {
    return {
      options: {
        startVal: 0, // 起始值
        endVal: 2017.325, // 终止值
        duration: 4000, // 动画时间
        decimals: 3, // 保留3位小数
        separator: ',', // 分割符
        prefix: '¥ ', // 前缀
        suffix: ' rmb', // 后缀
        autoplay: false // 是否自动播放
      }
    }
  },
  methods: {
    start () {
      this.$refs.countTo.start()
    },
    pause () {
      this.$refs.countTo.pause()
    },
    reset () {
      this.$refs.countTo.reset()
    },
    mountedCallback () {
      console.log('this.$refs.countTo.mountedCallback0', this.$refs.countTo.mountedCallback)
    }
  }
}
</script>

<style lang="scss" scoped></style>
