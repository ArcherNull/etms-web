<template>
  <div class="myLoading-container borderRed">
    <!-- 默认加载loading -->
    <div v-if="myLoadingType === 'default'" class="loader">
      <div class="my-loading" />
      <div class="my-loading-text">加载中...</div>
    </div>

    <!-- <MyLoading v-if="myLoadingType === 'default'" /> -->

    <!-- MyLottie 动画loading -->
    <MyLottie v-else-if="myLoadingType === 'lottie'" />
    <MyLottie v-else-if="myLoadingType === 'lottie0'" lottie-type="loading0" />
    <MyLottie v-else-if="myLoadingType === 'lottie1'" lottie-type="loading1" />
    <MyLottie v-else-if="myLoadingType === 'lottie2'" lottie-type="loading2" />
    <MyLottie v-else-if="myLoadingType === 'lottie3'" lottie-type="loading3" />
    <MyLottie v-else-if="myLoadingType === 'lottie4'" lottie-type="loading4" />
  </div>
</template>

<script>
export default {
  name: 'MyLoading'
}
</script>

<style lang ="scss"  scoped>
.myLoading-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
}

/* 默认加载动画 */
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
}

.loader .my-loading {
  position: relative;
  width: 100%;
  height: 10px;
  border: 1px solid $color-primary;
  border-radius: 10px;
  animation: turn 1s linear 0.42s infinite;
}

.loader .my-loading:before {
  content: "";
  display: block;
  position: absolute;
  width: 0%;
  height: 100%;
  background: $color-primary;
  box-shadow: 10px 0px 15px 0px $color-primary;
  animation: load .5s linear infinite;
}

.loader .my-loading-text {
  width: 100%;
  position: absolute;
  top: 10px;
  color: $color-primary;
  text-align: center;
  animation: bounce .5s linear infinite;
}

@keyframes load {
  0% {
    width: 0%;
  }

  87.5%,
  100% {
    width: 100%;
  }
}

@keyframes turn {
  0% {
    transform: rotateY(0deg);
  }

  6.25%,
  50% {
    transform: rotateY(180deg);
  }

  56.25%,
  100% {
    transform: rotateY(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    top: 10px;
  }

  12.5% {
    top: 30px;
  }
}
/* 默认加载动画 */

</style>
