<template>
  <div class="MyFormShowFields">
    <el-tabs v-model="showFieldsType">
      <el-tab-pane
        class="MyFormShowFields-container"
        label="当前表单"
        name="currentFormData"
      >
        <FirstTitle title="当前输入表单数据">
          <div
            v-for="(item, index) in Object.keys(currentFormData)"
            slot="content"
            :key="index"
            class="labelItem dk-mt-10"
          >
            <div class="labelItem-title dk-subContent">{{ item }} :</div>
            <div class="labelItem-content dk-content">
              <div
                v-for="(citem, cindex) in currentFormData[item]"
                :key="cindex"
                class="labelItem-content-1 dk-content"
              >
                <span class="labelItem-content-1__1">{{ Object.keys(citem)[0] }}:</span>
                <span class="labelItem-content-1__2 MyFormShowFields-success" @dblclick="copyContent(Object.values(citem)[0])">{{ Object.values(citem)[0] }}</span>
              </div>
            </div>
          </div>
        </FirstTitle>

        <FirstTitle title="提交表单数据">
          <div slot="left">
            <MyButton
              type="text"
              plain
              size="mini"
              style="padding: 0px"
              icon=""
              :disabled="false"
              @click="copyContent(JSON.stringify(submitFormData))"
            >一键复制</MyButton>
          </div>
          <div slot="content">
            <div
              v-for="(item, index) in Object.keys(submitFormData)"
              :key="index"
              class="labelItem dk-mt-10"
              flex
            >
              <span class="labelItem-title dk-subContent" flex-box="0">{{ item }} :</span>
              <span
                class="labelItem-content MyFormShowFields-success dk-content"
                flex-box="1"
                @dblclick="copyContent(submitFormData[item])"
              >{{ submitFormData[item] }}</span>
            </div>
          </div>
        </FirstTitle>
      </el-tab-pane>

      <el-tab-pane
        class="MyFormShowFields-container"
        label="回显表单"
        name="echoFormData"
      >
        <FirstTitle title="回显表单原数据">
          <div slot="content">回显表单数据数据源头</div>
        </FirstTitle>

        <FirstTitle title="回显表单数据与当前输入表单数据对比">
          <div slot="content">回显表单数据跟当前输入表单数据对比</div>
        </FirstTitle>
      </el-tab-pane>
    </el-tabs>
    <!-- 下载区域 -->
  </div>
</template>

<script>
export default {
  name: 'MyFormShowFields', // 表单展示字段
  components: {
    FirstTitle: () => import('@/components/FirstTitle/index.vue')
  },
  props: {
    // 当前输入表单数据
    currentFormData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 提交表单数据
    submitFormData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      // 表单显示类型 ,当前输入表单数据 : currentFormData ; 提交表单数据 : submitFormData ; 回显表单数据 echoFormData
      showFieldsType: 'currentFormData'
    }
  },
  watch: {
    submitFormData: {
      handler (newVal) {
        console.log('获取到新值=======>', newVal)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.MyFormShowFields {
  width: 35vw;
  @extend %card;
  padding: 10px 20px;
  &-container {
    width: 100%;
    height: 200px;
    overflow: auto;
    @extend %scroll-bar-style;
  }
  .labelItem {
    display: grid;
    grid-template-columns: 100px 1fr;
    column-gap: 10px;
    &-title {
      text-align: right;
      max-height: 140px;
    }
    &-content {
      display: block;
      &-1{
        margin-bottom: 4px;
        &__1{
          text-align: right;
          word-break: keep-all;
          margin-right: 4px;
        }
      }
    }

  }
  &-success{
    color: $color-success;
  }
}
</style>
