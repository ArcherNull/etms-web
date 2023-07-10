<!--
 * @Author: Null
 * @Date: 2022-02-09 16:45:51
 * @Description: el-button 透传组件
-->
<template>
  <el-button v-waves v-bind="customizedAttrs" v-on="$listeners">
    <slot />
  </el-button>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyButton',
  // 不希望组件的根元素继承特性
  inheritAttrs: false,
  // mixins:[],
  computed: {
    ...mapState('element/elButton', [
      'size',
      'plain',
      'disabled',
      'icon',
      'type',
      'title'
    ]),
    customizedAttrs () {
      const obj = {
        size: this.size,
        title: this.title,
        plain: this.plain,
        disabled: this.disabled,
        icon: this.icon
      }
      if (this.type) {
        obj.type = this.type
      }
      return Object.assign(obj, this.$attrs)
    }
  },
  mounted () {
    // this.delegateBehavior(this)
  },
  methods: {
    // delegateBehavior (context) {
    //   console.log('context=====>', context)
    //   if (context.$el) {
    //     // vueautoreport-uid
    //     context.$el.setAttribute('vueautoreport-uid', context._uid)
    //   }
    //   // 在root上做标记，不以次数订，可能页面存在多个vue实例
    //   if (context.$root.$el && !context.$root.$el._isBindDelegate) {
    //     eventTypes.forEach((eventType) => {
    //       // root组件绑定捕获事件，处理冒泡阻止的情况
    //       context.$root.$el.addEventListener(
    //         eventType,
    //         (e) => {
    //           this.captureEvent(e, this.captureContexts, eventType)
    //         },
    //         true
    //       )
    //     })
    //     context.$root.$el._isBindDelegate = true
    //   }
    // },
    // captureEvent (e, contexts, eventType, ext) {
    //   const els = contexts.map((context) => context.$el)
    //   let currentEl = e.target
    //   while (currentEl) {
    //     const index = els.indexOf(currentEl)
    //     if (index > -1) {
    //       console.log('记录')
    //       break
    //     }
    //     currentEl = currentEl.parentNode
    //   }
    // }
  }
}
</script>
