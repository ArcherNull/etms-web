<!--
 * @Author: Null
 * @Date: 2022-12-05 15:42:50
 * @Description:
-->
<template>
  <el-form-item :rules="formItem.rules" :prop="formItem.field">
    <!-- 自定义表单label -->
    <template slot="label">
      <span class="subText">
        {{ formItem.label }}
        <MyToolTip
          v-if="formItem.helpMessage"
          class="dk-ml-4 dk-mr-4"
          :content="formItem.helpMessage"
        >
          <SvgIcon name="issues-feedback" class-name="myForm-helpMessage-svgIcon" />
        </MyToolTip>
        <span>
          <span v-if="formItem.loading" class="s-pull-loading-icon s-pull-loading-rotate" />
          <!-- <span v-else class="s-pull-loading-icon s-pull-loading-rotate" /> -->
        </span>
      </span>
    </template>

    <span v-if="formItem.component">
      <el-input
        v-if="formItem.component.type === 'input'"
        :ref="formItem.field"
        v-model="formItem.component.defaultValue"
        :placeholder="formItem.component.placeholder || '请输入'"
        clearable
        @change="formItemChange($event, formItem)"
      />

      <el-select
        v-else-if="formItem.component.type === 'select'"
        :ref="formItem.field"
        v-model="formItem.component.defaultValue"
        :placeholder="formItem.component.placeholder || '请选择'"
        clearable
        @change="formItemChange($event, formItem)"
      >
        <span v-if="formItem.component.optionsList">
          <el-option
            v-for="(cItem,cIndex) in formItem.component.optionsList"
            :key="cIndex"
            v-bind="cItem"
          />
        </span>
      </el-select>

      <!-- 单选框-->
      <el-radio-group
        v-else-if="formItem.component.type === 'radio'"
        :ref="formItem.field"
        v-model="formItem.component.defaultValue"
        @change="formItemChange($event, formItem)"
      >
        <el-radio
          v-for="(childItem, childIndex) in formItem.component.radioList"
          :key="childIndex"
          :disabled="formItem.component.disabled || false"
          :label="childItem.value"
        >{{ childItem.label }}</el-radio>
      </el-radio-group>
    </span>

    <span v-else>缺失component属性</span>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    formItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    // 获取上一次的值
    getLastVal (formItem) {
      let lastVal = ''
      if (this.$refs) {
        lastVal = this.$refs[formItem.field].value
      }
      return lastVal
    },
    // change事件
    formItemChange (ele, formItem) {
      console.log('change事件', ele, formItem)
      const lastVal = this.getLastVal(formItem)
      console.log('lastVal=====>', lastVal)

      this.$emit('changeInput', {
        name: ele,
        formItem
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label{
  display: flex;
}
.subText {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* 旋转loading */
.s-pull-loading-icon {
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    border: 1px solid $color-primary;
    border-bottom-color: transparent;
    box-sizing: border-box;

    &:first-child {
        margin-right: 0px;
    }
}

/* 旋转动画 */
.s-pull-loading-rotate {
    animation: s-pull-loading-rotate 0.6s linear infinite;
}

@keyframes s-pull-loading-rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
