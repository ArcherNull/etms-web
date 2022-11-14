<!--
 * @Author: Null
 * @Date: 2022-05-27 13:41:11
 * @Description:
-->
<template>
  <span>
    <MyButton
      v-for="(item, index) in schemas"
      :key="index"
      v-waves
      v-bind="item"
      @click="emitFun(item, index, schemas)"
    >
      {{ item.btnText }}
    </MyButton>
  </span>
</template>

<script>
export default {
  name: 'MyBtnList',
  components: {
    MyButton: () => import('../MyButton/index.vue')
  },
  props: {
    btnListConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      config: {}, // 公共配置项
      schemas: [] // 按钮结构项
    }
  },
  watch: {
    btnListConfig: {
      handler (newVal) {
        if (newVal) {
          console.log('newVal======>', newVal)
          const { schemas, config } = newVal

          if (config) {
            if (typeof config === 'object') {
              this.config = {
                ...this.config,
                ...config
              }
            } else {
              console.error('组件MyBtnList的config必须是对象')
            }
          }

          if (schemas) {
            if (Array.isArray(schemas)) {
              this.schemas = this.initBtnList(schemas)
            } else {
              console.error('组件MyBtnList的schemas必须是数组')
            }
          } else {
            console.error('组件MyBtnList的schemas是必要条件')
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 对按钮的schemas,进行拼装
    initBtnList (btnSchemas = []) {
      return btnSchemas.map(ele => {
        return {
          loading: false,
          ...this.config,
          ...ele
        }
      })
    },
    // 按钮的同意事件处理函数，这里可以作为安妮的事件代理函数
    emitFun (item, index, schemas) {
      this.$emit('clickFun', {
        item, index, schemas
      })
    }
  }
}
</script>

  <style lang="scss" scoped></style>

