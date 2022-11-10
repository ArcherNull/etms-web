<!--
 * @Author: Null
 * @Date: 2022-06-07 08:36:06
 * @Description:
-->
<template>
  <el-cascader
    v-bind="customizedAttrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'MyCascader',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  computed: {
    customizedAttrs () {
      return {
        size: 'medium', // 尺寸
        placeholder: '请选择信息', // 输入框占位文本
        disabled: false, // 是否禁用
        clearable: true, // 是否支持清空选项
        'show-all-levels': true, // 输入框中是否显示选中值的完整路径
        'collapse-tags': true, // 多选模式下是否折叠Tag
        separator: '/', // 选项分隔符
        filterable: true, // 是否可搜索选项

        // options: [], // 可选项数据源，键名可通过 Props 属性配置 array
        ...this.$attrs
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
