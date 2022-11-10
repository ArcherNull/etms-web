<!--
 * @Author: Null
 * @Date: 2022-03-05 09:45:39
 * @Description: el-color-picker取色版二次封装
-->

<template>
  <div class="MyColorPicker" flex="cross:center">
    <div v-if="customizedAttrs.suggestColorList && customizedAttrs.suggestColorList.length" class="MyColorPicker-suggestColor" flex="cross:center">
      <div
        v-for="(item, index) in customizedAttrs.suggestColorList"
        :key="index"
        class="MyColorPicker-suggestColor__item dk-mr-10"
        @click="selectedSuggestColor(item)"
      >
        <MyToolTip :content="item.content || item.name">
          <div class="MyColorPicker-suggestColor__item-box" :style="{ 'background':item.color }" />
        </MyToolTip>
      </div>
    </div>

    <el-color-picker v-bind="customizedAttrs" v-on="$listeners" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyColorPicker',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    ...mapState('element/elColorPicker', ['suggestColorList', 'predefine', 'colorFormat', 'showAlpha']),
    customizedAttrs () {
      const obj = {
        predefine: this.predefine,
        disabled: this.disabled,
        colorFormat: this.colorFormat
      }
      obj.suggestColorList = this.$attrs.suggestColorList?.length ? this.$attrs.suggestColorList : this.suggestColorList
      // console.log('this.$attrs.suggestColorList', this.$attrs.suggestColorList)
      return Object.assign(obj, this.$attrs)
    }
  },
  methods: {
    // 选中默认颜色
    selectedSuggestColor (ele) {
      console.log('选中推荐颜色', ele)
      this.$emit('change', ele.color)
    }
  }
}
</script>

<style lang="scss" scoped>
.MyColorPicker {
  &-suggestColor {
    &__item {
      &-box {
        width: 16px;
        height: 16px;
        border: solid 1px $color-primary-3;
      }
    }
  }
}
</style>
