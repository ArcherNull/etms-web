<!--
 * @Author: Null
 * @Date: 2022-02-15 11:41:16
 * @Description: 没有更多数据组件
-->
<template>
  <el-descriptions v-bind="customizedAttrs" v-on="$listeners">
    <template slot="title">
      <slot name="title"><span class="dk-f2-title">{{ $attrs.title }}</span></slot>
    </template>
    <template slot="extra">
      <slot name="extra" />
    </template>
    <el-descriptions-item
      v-for="(item, index) in descriptionsList"
      :key="index"
      :content-style="item.contentStyle || {}"
      :label-style="item.labelStyle || {}"
    >
      <span slot="label">
        <SvgIcon
          v-if="item.svgIcon && item.svgIcon.name"
          :style="item.svgIcon.style"
          :name="item.svgIcon.name"
        />
        {{ item.label }}

        <MyToolTip
          v-if="item.helpMessage"
          class="dk-ml-4"
          :content="item.helpMessage"
        >
          <SvgIcon name="issues-feedback" />
        </MyToolTip>
      </span>
      <div flex="cross:center">
        <MyTags v-if="item.tags && item.tags.content">
          {{ item.tags.content }}
        </MyTags>

        <div v-if="item.html" v-html="item.html" />

        {{ item.content }}

        <MyButton v-for="(citem,cindex) in item.contentAfterBtn" :key="cindex" :class="['MyDescriptions-btnList',citem.class]" :style="citem.style" :icon="citem.icon" :type="citem.type || 'text'" @click="citem.click(item)">{{ citem.btnText }}</MyButton>

      </div>
    </el-descriptions-item>
    <slot />
  </el-descriptions>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyDescriptions',
  props: {
    descriptionsList: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  // 不希望组件的根元素继承特性
  // inheritAttrs: false,
  computed: {
    ...mapState('element/elDescriptions', [
      'border',
      'colon',
      'size',
      'labelClassName',
      'contentClassName'
    ]),
    customizedAttrs () {
      return {
        // 自定义标题，显示在左上方
        // title: '',
        // 	是否带有边框  boolean
        border: this.border,
        // 是否显示冒号 boolean
        colon: this.colons,
        // 尺寸  string  medium / small / mini
        size: this.size,
        // 自定义标签类名  string
        labelClassName: this.labelClassName,
        // 自定义内容类名  string
        contentClassName: this.contentClassName,

        ...this.$attrs
      }
    }
  },
  watch: {
    '$attrs.descriptionsList': {
      handler (newVal) {
        console.log('$attrs.descriptionsList', newVal)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-descriptions {
  &__header {
    margin-bottom: 10px !important;
  }
}
.MyDescriptions-btnList{
  padding: 0px;
  margin: 0 4px;
}
</style>
