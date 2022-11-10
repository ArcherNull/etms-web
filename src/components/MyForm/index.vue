<!--
 * @Author: Null
 * @Date: 2022-02-15 09:54:31
 * @Description: el-form表单二次封装
 * 采用可选的grid布局和flex布局，通过传递的props值来更改
-->
<template>
  <div
    :class="[
      showMyFormVContextmenu
        ? 'showMyFormVContextmenu'
        : 'noShowMyFormVContextmenu',
      'myForm-container'
    ]"
  >
    <el-form
      ref="myFormData"
      :model="myFormData"
      :inline="myFormConfig.labelProps.inline || false"
      :rules="myFormRules"
      :show-message="myFormConfig.showMessage || true"
      :size="myFormConfig.size || 'medium'"
      :disabled="myFormConfig.disabled || false"
      :validate-on-rule-change="myFormConfig.validateOnRuleChange || true"
      :label-position="myFormConfig.labelProps.position || 'right'"
      :label-width="myFormConfig.labelProps.width || '100px'"
      :label-suffix="myFormConfig.labelProps.suffix || ''"
      :hide-required-asterisk="myFormConfig.hideRequiredAsterisk || false"
      :class="['myForm-grid', `myForm-${myFormConfig.rowLayout || ''}`]"
    >
      <span
        v-for="(item, index) in myFormSchemas"
        :key="index"
        :class="[item.component === 'none' ? 'not-display-formItem' : '']"
      >
        <el-form-item
          :error="
            typeof item.error === 'string'
              ? item.error
              : item.error && item.error.html
                ? item.error.html
                : item.error && item.error.routerText
          "
          :prop="item.field"
          :rules="myFormRules[item.field] || []"
          :required="item.required"
          :label-width="item.labelWidth"
          :show-message="item.showMessage || true"
          :inline-message="item.inlineMessage || false"
          :size="item.size || 'medium'"
          :class="[`myForm-grid-${item.formItemState || 'info'}-bg`]"
        >
          <!-- 自定义表单label -->
          <template slot="label">
            <span>
              {{ item.label }}
              <MyToolTip
                v-if="item.helpMessage"
                class="dk-ml-4"
                :content="item.helpMessage"
              >
                <SvgIcon
                  name="issues-feedback"
                  class-name="myForm-helpMessage-svgIcon"
                />
              </MyToolTip>
              <span>
                <span
                  v-if="item.loading"
                  class="s-pull-loading-icon s-pull-loading-rotate"
                />
                <!-- <span v-else class="s-pull-loading-icon s-pull-loading-rotate" /> -->
              </span>
            </span>
          </template>

          <!-- 错误提示error -->
          <template v-if="item.error" slot="error">
            <div
              v-if="typeof item.error === 'string'"
              class="myForm-grid-errorText"
            >
              {{ item.error }}
            </div>
            <div v-else>
              <div
                v-if="item.error && item.error.html"
                class="myForm-grid-errorText"
                v-html="item.error.html"
              />
              <div v-else-if="item.error && item.error.routerPath">
                <router-link
                  class="myForm-grid-errorText"
                  :to="item.error.routerPath"
                >
                  {{ item.error.frontText || '前往'
                  }}{{ item.error.routerText }}
                  {{
                    item.error.backText ||
                      `,因为该数据来源于${item.error.routerText}`
                  }}
                </router-link>
              </div>
            </div>
          </template>

          <!-- 文本框 -->
          <div
            v-if="item.component === 'text'"
            class="myForm-grid-displayText text-ellipsis-1"
            :style="item.style || {}"
            :title="item.defaultValue"
          >
            {{ item.defaultValue }}
          </div>

          <!-- 输入框 -->
          <span v-if="item.component === 'input'">
            <el-input
              v-model="item.defaultValue"
              :disabled="item.disabled || false"
              :style="item.style || {}"
              :type="item.type || 'text'"
              :maxlength="item.maxlength || 110"
              :placeholder="item.placeholder || '请输入信息'"
              :clearable="item.clearable || true"
              :input-state="item.inputState || ''"
              @change="item.change($event, item)"
            >
              <template
                v-if="item.component === 'input' && item.prepend"
                slot="prepend"
              >
                {{ item.prepend }}
              </template>
            </el-input>
            <span v-if="item.component === 'input' && item.unit">{{
              item.unit
            }}</span>
          </span>

          <!-- 下拉框 -->
          <span v-else-if="item.component === 'select'">
            <el-select
              v-model="item.defaultValue"
              :disabled="item.disabled || false"
              :style="item.style || {}"
              :multiple="item.multiple || false"
              :collapse-tags="item.collapseTags || false"
              :placeholder="item.placeholder || '请选择信息'"
              :clearable="item.clearable || true"
              :input-state="item.inputState || ''"
              @change="item.change($event, item)"
            >
              <el-option
                v-for="(childItem, childIndex) in item.selectList"
                :key="childIndex"
                :label="childItem.label"
                :value="childItem.value"
              />
            </el-select>
            <span v-if="item.component === 2 && item.unit">
              {{ item.unit }}
            </span>
          </span>

          <!-- 文本框 -->
          <el-input
            v-else-if="item.component === 'textarea'"
            v-model="item.defaultValue"
            :disabled="item.disabled || false"
            :style="item.style || {}"
            type="textarea"
            :rows="item.rows || 2"
            :autosize="
              item.autosize ? item.autosize : { minRows: 2, maxRows: 2 }
            "
            :maxlength="item.maxlength || 250"
            :show-word-limit="item.showWordLimit || false"
            :placeholder="item.placeholder || '请输入信息'"
            :clearable="item.clearable || true"
            :input-state="item.inputState || ''"
            @change="item.change($event, item)"
          />

          <!-- 取色板 -->
          <el-color-picker
            v-else-if="item.component === 'colorPicker'"
            v-model="item.defaultValue"
            :style="item.style || {}"
            @change="item.change($event, item)"
          />

          <!-- 自定义取色板 , 必须要设置defaultValue -->
          <MyColorPicker
            v-else-if="item.component === 'myColorPicker'"
            v-model="item.defaultValue"
            :suggest-color-list="item.suggestColorList || []"
            :style="item.style || {}"
            @change="item.change($event, item)"
          />

          <!-- slider -->
          <el-slider
            v-else-if="item.component === 'slider'"
            v-model="item.defaultValue"
            :style="item.style || {}"
          />

          <!-- 计数器 -->
          <span v-else-if="item.component === 'inputNumber'">
            <el-input-number
              v-model="item.defaultValue"
              :controls="item.controls && true"
              :disabled="item.disabled || false"
              :style="item.style || {}"
              :precision="item.precision && 3"
              :step="item.step || 40"
              :min="item.min || -10000000000"
              :max="item.max || 10000000000"
            />
            <span v-if="item.component === 'inputNumber' && item.unit">{{
              item.unit
            }}</span>
          </span>

          <!-- switch开关 -->
          <span
            v-else-if="item.component === 'switch'"
            :style="item.style || {}"
          >
            <el-switch v-model="item.defaultValue" />
          </span>

          <!-- 日期选择插件 --开始结束时间 , datetimerange -->
          <el-date-picker
            v-else-if="item.component === 'datePicker'"
            v-model="item.defaultValue"
            :style="item.style || {}"
            :type="item.type || 'datetime'"
            :disabled="item.disabled || false"
            range-separator="至"
            :clearable="item.clearable || true"
            :placeholder="item.placeholder || '请选择日期'"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
          />

          <!-- 单选框-->
          <el-radio-group
            v-else-if="item.component === 'radio'"
            v-model="item.defaultValue"
            :style="item.style || {}"
          >
            <el-radio
              v-for="(childItem, childIndex) in item.radioList"
              :key="childIndex"
              :disabled="item.disabled || false"
              :label="childItem.value"
            >
              {{ childItem.label }}
            </el-radio>
          </el-radio-group>

          <!-- 省市区地址 -->
          <MyCascaderAddress
            v-else-if="item.component === 'pcaRegion'"
            :default-value="item.defaultValue"
            :style="item.style || {}"
            @change="
              (ele) => {
                item.defaultValue = ele
                typeof item.change === 'function' && item.change(ele)
              }
            "
          />
          <!-- 省市地址 -->
          <MyCascaderAddress
            v-else-if="item.component === 'pcRegion'"
            type="pc"
            :default-value="item.defaultValue"
            :style="item.style || {}"
            @change="
              (ele) => {
                item.defaultValue = ele
                typeof item.change === 'function' && item.change(ele)
              }
            "
          />

          <!-- 省市区输入 propsObj:{ multiple: true } / { checkStrictly: true } -->
          <!-- options 可选值 city / area -->

          <!-- 级联框 -->
          <el-cascader
            v-else-if="item.component === 'cascader'"
            v-model="item.defaultValue"
            :style="item.style || {}"
            :disabled="item.disabled || false"
            :props="item.propsObj ? item.propsObj : {}"
            :collapse-tags="item.collapseTags || false"
            :filterable="item.filterable || true"
            :clearable="item.clearable || true"
            :options="item.options || []"
          />

          <!-- 街道下拉框 :trigger-on-focus="false"-->
          <el-autocomplete
            v-else-if="item.component === 'street'"
            v-model="item.defaultValue"
            :style="item.style || {}"
            value-key="name"
            :disabled="item.disabled || false"
            :fetch-suggestions="querySearchAsync"
            :placeholder="item.placeholder || '请选择内容'"
            :clearable="item.clearable || true"
            :debounce="500"
          />

          <!-- 事业部选择器-- 单选 -->
          <span v-else-if="item.component === 'divisionCascader'">
            <el-cascader
              v-if="!item.propsObj"
              v-model="item.defaultValue"
              :style="item.style || {}"
              :disabled="item.disabled || false"
              :options="item.division ? divisionList : item.options"
              filterable
              :placeholder="item.placeholder || '请输入内容'"
              @change="changeCascader"
            />

            <!-- 多选  { multiple: true, checkStrictly: true } -->
            <el-cascader
              v-else
              v-model="item.defaultValue"
              :disabled="item.disabled || false"
              :style="item.style || {}"
              :options="item.division ? divisionList : item.options"
              collapse-tags
              :placeholder="item.placeholder || '请输入内容'"
              :props="
                typeof item.propsObj === 'object'
                  ? item.propsObj
                  : { multiple: true }
              "
              clearable
              @change="changeCascader"
            />
          </span>

          <!-- 建议输入框 -->
          <el-autocomplete
            v-else-if="item.component === 'autocomplete'"
            v-model="item.defaultValue"
            :style="item.style || {}"
            :fetch-suggestions="item.querySearch"
            :placeholder="item.placeholder"
            @select="item.handleSelect"
          />

          <!-- 表格项按钮 -->
          <span
            v-if="
              Array.isArray(item.formItemBtnList) &&
                item.formItemBtnList.length
            "
            class="dk-ml-10"
          >
            <MyButton
              v-for="(childItem, childIndex) in item.formItemBtnList"
              :key="childIndex"
              :style="childItem.style || {}"
              :type="childItem.type || 'primary'"
              :plain="childItem.plain || false"
              @click="childItem.click(item)"
            >
              {{ childItem.btnText }}
            </MyButton>
          </span>
        </el-form-item>
      </span>
    </el-form>
    <div
      v-show="showMenuType"
      class="myForm-container-showMenuType"
      flex="main:center cross:center"
      @click.stop="showMenuType = ''"
    >
      <div @click.stop="">
        <!-- 导出的数据展示 -->
        <MyFormShowFields
          v-if="showMenuType === 'myFormShowFields'"
          :current-form-data="currentFormData"
          :submit-form-data="submitFormData"
        />

        <!-- 导出数据二维码 -->
        <MyQrcode
          v-if="showMenuType === 'myFormToQrCode'"
          :qrcode-content="myFormToQrCodeData"
          qrcode-id="MyForm-showMenuType"
        />
        <!-- 导入的数据区域 -->
        <MyQrcodeDecode v-else-if="showMenuType === 'decodeQrCodeToMyForm'" />
      </div>
    </div>

    <!-- 表单相关功能按钮测试 -->
    <div
      class="myForm-container-btnList"
      :flex="`main:${myFormConfig.formBunListPosition}`"
    >
      <MyBtnList
        :btn-list-config="myFormConfig.formBunListConfig"
        @clickFun="clickFun"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyForm',
  components: {
    MyQrcode: () => import('@/components/MyQrcode/index.vue'),
    MyQrcodeDecode: () => import('@/components/MyQrcodeDecode/index.vue'),
    MyFormShowFields: () => import('./components/MyFormShowFields.vue'),
    MyBtnList: () => import('@/components/MyBtnList/index.vue'),
    MyCascaderAddress: () => import('@/components/MyCascaderAddress/index.vue')
  },
  props: {
    // 表单注册
    register: {
      type: Object,
      default: () => {}
    },
    // 表单结构
    formSchemas: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 表单对象
      myFormData: {},
      // 表单对象，文本标题+文本字段：输入值
      myFormAllData: {},
      // 表单规则
      myFormRules: [],
      // 表单布局对象
      myFormConfig: {
        labelProps: {
          position: 'right',
          width: '100px',
          inline: false
        },
        // 值有 grid-colums-2  / grid-colums-3
        rowLayout: 'grid-colums-2',
        showFormButton: false,
        formItemStyle: {
          width: '60%',
          minWidth: '250px'
        },
        formBunListPosition: 'right' // 左边left , 右边right
        // 表单相关功能按钮测试 MyBtnList配置项
        // formBunListConfig: {
        //   schemas: []
        // }
      },
      // 表单项
      myFormSchemas: [],
      // 展示二维码 myFormToQrCode 表单生成二维码； decodeQrCodeToMyForm 解析二维码生成表单数据
      showMenuType: '',

      // 表单右键快捷键是否处于展示
      showMyFormVContextmenu: false,
      // 生成二维码内容
      myFormToQrCodeData: '',

      // 提交表单数据
      submitFormData: {},
      // 当前输入表单数据
      currentFormData: {}
    }
  },

  computed: {
    ...mapState('user/userInfo', ['divisionList'])
  },
  watch: {
    formSchemas: {
      handler (newVal) {
        console.log('获取到更新的值', newVal)
        this.initMyForm(newVal)
      },
      immediate: true,
      deep: true
    },
    formConfig: {
      handler (newVal) {
        console.log('获取到更新的值', newVal)
      },
      immediate: true,
      deep: true
    },
    register: {
      handler (newVal) {
        console.log('获取到更新的register值', newVal)
        if (
          newVal &&
          Array.isArray(newVal.formSchemas) &&
          newVal.formSchemas.length
        ) {
          this.myFormConfig = Object.assign(
            this.myFormConfig,
            newVal.formConfig
          )
          this.initMyForm(newVal.formSchemas)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * @description: 初始化表单
     * @param {*} formSchemas 表单配置项
     * @return {*}
     */
    initMyForm (formSchemas = []) {
      this.myFormData = this.getProps(formSchemas)
      this.myFormRules = this.getProps(formSchemas, 'rules')
      this.myFormSchemas = this.getProps(formSchemas, 'schemas')
    },
    /**
     * @description: 获取当前输入值
     * @param {*} formSchemas 单配置项
     * @param {*} type 解构类型 props 表示传递的表单对象 ；
     * @return {*}
     */
    getProps (formSchemas = [], type = 'props') {
      console.log(`表单类型为${type}获取当前输入值====>`, formSchemas)
      const propsObj = {}
      const rulesObj = {}
      let extraFields = {}
      const myFormSchemas = formSchemas
      const myFormConfig = this.myFormConfig
      myFormSchemas.length &&
        myFormSchemas.forEach((ele, ind, arr) => {
          if (ele.component !== 'none') {
            // 设置默认值
            propsObj[ele.field] = ele.defaultValue ? ele.defaultValue : ''
            // 设置额外添加的字段
            if (ele.extraFields && Object.keys(ele.extraFields).length) {
              extraFields = Object.assign(extraFields, ele.extraFields)
            }

            // 设置自定义rules, 或者默认rules
            if (Array.isArray(ele.rules) && ele.rules.length) {
              rulesObj[ele.field] = ele.rules
            } else {
              const setFormItemRules = () => {
                const event = ['input', 'textarea', 'inputNumber'].includes(
                  ele.component
                )
                rulesObj[ele.field] = [
                  {
                    required: true,
                    message: ele.placeholder
                      ? ele.placeholder
                      : `请${event ? '输入' : '选择'}${ele.label || '信息'}`,
                    trigger: event ? 'blur' : 'change'
                  }
                ]
              }
              if (ele.required) {
                setFormItemRules()
              } else {
                if (myFormConfig.required) {
                  setFormItemRules()
                }
              }
            }

            // 设置表单项的统一样式
            if (!ele.style || !Object.keys(ele.style).length) {
              ele.style = myFormConfig.formItemStyle || {}
            }

            // 设置表单项的统一helpMessage
            if (!ele.helpMessage) {
              if (myFormConfig.helpMessage) {
                ele.helpMessage = myFormConfig.helpMessage
              }
            }

            // 设置表单项的change事件
            if (!ele.change) {
              ele.change = this.myFormChangeFun
            }
          }
        })
      if (type === 'props') {
        return Object.assign(propsObj, extraFields)
      } else if (type === 'rules') {
        return rulesObj
      } else if (type === 'schemas') {
        console.log('myFormSchemas======>', myFormSchemas)
        return myFormSchemas
      }
    },
    // myForm所有change事件统一处理
    myFormChangeFun (ele) {
      console.log('myForm所有change事件统一处理', ele)
    },

    /**
     * @description: 设置
     * @param { String } field 字段名
     * @param { Boolean } bool loading的开启或关闭
     * @return {*}
     */
    setFormItemLoading (field, bool) {
      const findInd = this.myFormSchemas.findIndex((ele) => ele.field === field)
      this.myFormSchemas[findInd].loading = bool
    },
    /**
     * @description: 获取表单对象值
     * @param {*}
     * @return {*}
     */
    getFormPropsValues () {
      console.log('获取表单对象值', this.myFormData)
    },
    /**
     * @description: 右键菜单栏的显示或隐藏事件
     * @param {*}
     * @return {*}
     */
    contextMenuShow (ele) {
      console.log('右键菜单栏的显示或隐藏事件', ele)
      this.showMyFormVContextmenu = ele
    },
    /**
     * @description: 获取表单项title : 表单值 ， 以及额外附属的表单值
     * @return {*}
     */
    getMyFormAllProps () {
      console.log('获取表单对象值', this.myFormData)
      const allPropsObj = {}
      this.myFormSchemas.forEach((ele) => {
        const objKey = `${ele.label}-${ele.field}`
        const extraObj = ele.extraFields
        const extraArr = extraObj ? Object.keys(extraObj) : []
        if (extraArr.length) {
          extraArr.forEach((childItem) => {
            allPropsObj[`${objKey}-${childItem}`] = extraObj[childItem]
          })
        }
        allPropsObj[objKey] = ele.defaultValue
      })
      console.log('装填好的表单值', allPropsObj)
      return allPropsObj
    },

    /**
     * @description: 获取表单项title : 表单值 ， 以及额外附属的表单值
     * @return {*}
     */
    getMyFormAllTitlesAndProps () {
      console.log('获取表单对象值', this.myFormData)
      // eslint-disable-next-line
      let allPropsObj = {}
      this.myFormSchemas.forEach((ele) => {
        allPropsObj[ele.label] = []
        allPropsObj[ele.label].push({ [`${ele.field}`]: ele.defaultValue })
        const extraObj = ele.extraFields
        const extraArr = extraObj ? Object.keys(extraObj) : []
        if (extraArr.length) {
          extraArr.forEach((childItem) => {
            allPropsObj[ele.label].push({
              [`${childItem}`]: extraObj[childItem]
            })
          })
        }
      })
      console.log('装填好的表单值', allPropsObj)
      return allPropsObj
    },

    // 回显数据过滤器
    echoDataFilter () {
      console.log('回显数据过滤器')
    },
    /**
     * @description: 表单相关功能按钮测试
     * @param {*} ele
     * @return {*}
     */
    clickFun (ele) {
      const { item } = ele
      item.loading = true
      switch (item.btnText) {
        case '提交':
          console.log('提交')
          this.$commJs
            .confirmModel('确认提交吗？', this)
            .then((res) => {
              console.log('res======>', res)
            })
            .finally(() => {
              item.loading = false
            })
          break
        case '重置':
          console.log('重置')
          this.$commJs
            .confirmModel('确认重置吗？', this)
            .then((res) => {
              console.log('res======>', res)
            })
            .finally(() => {
              item.loading = false
            })
          break
        case '检验':
          console.log('检验')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .myForm-grid {
  display: grid;
  box-sizing: border-box;
  padding-top: 10px;
  &-colums-2 {
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
  &-colums-3 {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
  }
  &-errorText {
    color: $color-danger;
    font-size: $font-text-12;
    position: relative;
    top: -8px;
  }
  // 表单项状态
  &-danger-bg {
    background-color: $color-danger-4;
    border: solid 1px $color-danger;
    box-sizing: border-box;
  }
  &-warning-bg {
    background-color: $color-warning-4;
    border: solid 1px $color-warning;
    box-sizing: border-box;
  }
  &-success-bg {
    background-color: $color-success-4;
    border: solid 1px $color-success;
    box-sizing: border-box;
  }
  &-displayText {
    cursor: pointer;
  }

  // 输入框状态--成功
  .el-input__inner[input-state='success'] {
    // background-color: $color-success-4 !important;
    font-weight: 600;
    color: $color-success !important;
  }
  .el-input-number[input-state='success'] {
    .el-input__inner {
      color: $color-danger !important;
    }
  }

  // 输入框状态--警告
  .el-input__inner[input-state='warning'] {
    // background-color: $color-warning-4 !important;
    font-weight: 600;
    color: $color-warning !important;
  }
  .el-input-number[input-state='warning'] {
    .el-input__inner {
      color: $color-warning !important;
    }
  }

  // 输入框状态--错误
  .el-input__inner[input-state='danger'] {
    // background-color: $color-danger-4 !important;
    font-weight: 600;
    color: $color-danger !important;
  }
  .el-input-number[input-state='danger'] {
    .el-input__inner {
      color: $color-danger !important;
    }
  }
}
.not-display-formItem {
  display: none;
}
.showMyFormVContextmenu {
  border: solid 1px $color-primary-3;
  background: $color-primary-4;
  box-sizing: border-box;
}
.noShowMyFormVContextmenu {
  border: solid 1px transparent;
  box-sizing: border-box;
}
.myForm-container {
  position: relative;
  &-showMenuType {
    @extend %gray-mask;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.myForm-helpMessage-svgIcon {
  width: 0.75em;
  height: 0.75em;
  color: $color-primary;
}
</style>
