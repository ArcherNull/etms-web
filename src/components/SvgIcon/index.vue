<!--
 * @Author: Null
 * @Date: 2021-09-23 15:47:00
 * @Description: svg图表
-->
<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@common/validate'

export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    // 添加额外的样式
    className: {
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    isExternal () {
      return isExternal(this.name)
    },
    iconName () {
      return ` #${this.$setting.name}-${this.name}`
    },
    svgClass () {
      if (this.className) {
        const type = typeof this.className
        if (type === 'string') {
          return 'svg-icon ' + this.className
        } else {
          return 'svg-icon ' + this.className.join(' ')
        }
      } else {
        return 'svg-icon className'
      }
    },
    // 这里只支持https链接的图片，不支持本地路径的图片
    styleExternalIcon () {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.name}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$svgIcon-width: 1.05rem;
.svg-icon {
  width: $svgIcon-width;
  height: $svgIcon-width;
  line-height: $svgIcon-width;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}

.className {
  color: $color-primary;
}
</style>
