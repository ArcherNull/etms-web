<!--
 * @Author: Null
 * @Date: 2022-01-26 21:16:57
 * @Description: 一级标题组件
-->

<template>
  <div :id="domId" class="firstTitle-box firstTitle-box-anchor dk-mb-10">
    <div :class="['firstTitle',isShowTitleBg ?'dk-pt-8 dk-pb-8':'dk-mb-10']" flex="main:justify cross:center">
      <div class="firstTitle-left" flex="main:left cross:center">
        <div class="firstTitle-left__box" flex="main:left cross:center">
          <div
            v-if="isShowTitleBg"
            :style="{ background: statusBarbg }"
            class="firstTitle-left__box_bg dk-mr-8"
          />
          <div class="firstTitle-left__box_title dk-f2-title">
            {{ title }}
          </div>
        </div>
        <div class="firstTitle-left__subBox dk-ml-10 dk-subContent">
          <slot name="left" />
        </div>
      </div>
      <div class="firstTitle-right">
        <slot name="right" />
      </div>
    </div>
    <!-- 内容 -->
    <div :class="['dk-content',isShowTitleBg?'dk-p-8':'']">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { titleBgColor } from '@/common/elementUICommon.js'
export default {
  name: 'FirstTitle',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    // 标题旁的色块颜色，状态标识 ， info普通信息  success成功状态 ， warning 警告状态 ， danger 危险状态
    titleBgStatus: {
      type: String,
      default: ''
    },
    // 色块自定义颜色
    customTitleBg: {
      type: String,
      default: ''
    },
    // 是否展示色块
    isShowTitleBg: {
      type: Boolean,
      default: true
    },
    // 模块定位id
    cDomId: {
      type: String,
      default: ''
    }
  },
  computed: {
    statusBarbg () {
      if (this.isShowTitleBg) {
        if (this.customTitleBg) {
          return this.customTitleBg
        } else {
          return titleBgColor[this.titleBgStatus]
        }
      } else {
        return {}
      }
    },
    // 拼装domId
    domId () {
      const currentPath = this.$router.history.current.path
      if (this.cDomId) {
        return `${currentPath}-${this.cDomId}`
      } else {
        const domId = `${currentPath}:${this.title}`
        // console.log('domId===========>', domId)
        return domId
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.firstTitle-box{
  position: relative;
}
.firstTitle {
  width: 100%;
  position: sticky;
  background: #fff;
  top: 0;
  z-index: 10;
  border-bottom: solid 1px rgba(0, 0, 0, 0.10);

  &-left {
    &__box {
      &_bg {
        background-color: $color-primary;
        width: 6px;
        height: 18px;
        border-radius: 2px;
      }
    }
  }
}
</style>
