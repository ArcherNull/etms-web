<!--
 * @Author: Null
 * @Date: 2021-12-30 20:55:07
 * @Description: 系统管理--模块展示
-->

<template>
  <div>
    <FirstTitle title="更换主题">
      <div slot="content">
        <MyButton @click="changeTheme('#ff0000')">更换红颜色</MyButton>
        <MyButton @click="changeTheme('#ffff00')">更换黄颜色</MyButton>
        <MyButton @click="changeTheme('#409EFF')">更换蓝颜色</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="单个SvgIcon的引人">
      <div slot="content">
        <span class="dk-mr-8">本地SVG:</span>
        <SvgIcon name="chart" />
      </div>
    </FirstTitle>

    <FirstTitle title="SvgIcon图标库">
      <div slot="content" class="svgBox flex-warp" flex>
        <div
          v-for="(item, index) in $svgIconsMap"
          :key="index"
          class="svgItem dk-b-gray-4"
          flex="dir:top main:center cross:center"
        >
          <SvgIcon :name="item" class-name="svgIconsMap-css" />
          <span class="dk-subContent dk-mt-8">{{ item }}</span>
        </div>
      </div>
    </FirstTitle>

    <FirstTitle title="提示信息弹窗">
      <div slot="content">
        <MyButton
          type="info"
          @click="$message.info('普通信息')"
        >普通信息</MyButton>
        <MyButton
          type="success"
          @click="$message.success('成功信息')"
        >成功信息</MyButton>
        <MyButton
          type="warning"
          @click="$message.warning('警告信息')"
        >警告信息</MyButton>
        <MyButton
          type="danger"
          @click="$message.error('错误信息')"
        >错误信息</MyButton>
        <MyButton
          type="danger"
          @click="showMessageBox('氪金使你变强', '自定义信息内容')"
        >自定义信息</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="通知信息弹窗">
      <div slot="content">
        <MyButton
          type="info"
          @click="$message.info('普通信息')"
        >普通信息</MyButton>
        <MyButton
          type="success"
          @click="$message.success('成功信息')"
        >成功信息</MyButton>
        <MyButton
          type="warning"
          @click="$message.warning('警告信息')"
        >警告信息</MyButton>
        <MyButton
          type="danger"
          @click="$message.error('错误信息')"
        >错误信息</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="确认信息弹窗">
      <div slot="content">
        <MyButton
          type="info"
          @click="confirmModel('info')"
        >普通信息确认弹窗</MyButton>
        <MyButton
          type="success"
          @click="confirmModel('success')"
        >成功信息确认弹窗</MyButton>
        <MyButton
          type="warning"
          @click="confirmModel('warning')"
        >警告信息确认弹窗</MyButton>
        <MyButton
          type="danger"
          @click="confirmModel('error')"
        >错误信息确认弹窗</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="Notification通知">
      <div slot="content">
        <MyButton type="info" @click="notification()">通知弹窗</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="MyDialog内容弹窗">
      <div slot="content">
        <MyButton type="info" @click="contentModel">内容弹窗</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="MyButton按钮组件">
      <div slot="left">
        <MyButton
          type="text"
          plain
          size="mini"
          style="padding: 0px"
          icon=""
          :disabled="false"
          @click="resetAllBtn"
        >重置</MyButton>
      </div>
      <div slot="content">
        <MyButton
          type="info"
          size="medium"
          @click="SET_SIZE('medium')"
        >medium尺寸</MyButton>
        <MyButton
          type="info"
          size="small "
          @click="SET_SIZE('small')"
        >small尺寸</MyButton>
        <MyButton
          type="info"
          size="mini"
          @click="SET_SIZE('mini')"
        >mini尺寸</MyButton>
        <MyButton type="info" plain @click="SET_PLAIN(true)">朴素按钮</MyButton>
        <MyButton
          type="danger"
          :disabled="false"
          icon=""
          @click="disableAllBtn(!disabled)"
        >{{ disabled ? '解禁' : '禁用' }}
        </MyButton>
        <MyButton
          type="info"
          icon="el-icon-edit"
          @click="SET_ICON('el-icon-delete')"
        >icon设置</MyButton>
        <MyButton
          type="info"
          @click="SET_TITLE('点击按钮前的提示')"
        >title提示</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="MyBtnList组件">
      <div slot="content">
        <MyBtnList :btn-list-config="btnListConfig" @clickFun="clickFun" />
      </div>
    </FirstTitle>

    <FirstTitle title="eChart图表">
      <div slot="content">
        <div class="eChart-container" flex="main:justify cross:center">
          <!-- 折线图 -->
          <div id="lineChart" v-loading="lineChartloading" />
          <!-- 饼图 -->
          <div id="pieChart" v-loading="pieChartloading" />
        </div>
        <div class="eChart-container-barChart dk-mt-10">
          <!-- 柱形图 -->
          <div id="barChart" v-loading="barChartloading" />
        </div>
      </div>
    </FirstTitle>

    <FirstTitle title="eChart图表--中国地图">
      <div slot="content" class="china-mapCart">
        <!-- 中国地图1 -->
        <div id="chinaMapAreaChart" v-loading="chinaMapAreaLoading" />

        <!-- 中国地图1 -->
        <div id="chinaMapRegionChart" v-loading="chinaMapRegionLoading" />
      </div>
    </FirstTitle>

    <FirstTitle title="全局过滤器">
      <div slot="content">
        <span class="dk-mr-8">数字格式化:</span>
        {{ 12345678899 | toThousandFilter }}
        <span class="dk-ml-16 dk-mr-8">英文首字母大写:</span>
        {{ 'archer' | uppercaseFirst }}
        <span class="dk-ml-16 dk-mr-8">手机号格式化:</span>
        {{ '15908256352' | formatPhoneNumber }}
        <span class="dk-ml-16 dk-mr-8">金额小数点格式化:</span>
        {{ '1000.2563' | formatMoney }}
        <span class="dk-ml-16 dk-mr-8">银行卡格式化:</span>
        {{ '6217002920103521' | formatBankNum }}
      </div>
    </FirstTitle>

    <FirstTitle title="MyForm表单示例">
      <div slot="content">
        <MyForm :register="formRegister" />
      </div>
    </FirstTitle>

    <FirstTitle title="MyEmpty暂无更多">
      <div slot="content">
        <MyEmpty />
      </div>
    </FirstTitle>

    <FirstTitle title="MySkeleton骨架屏">
      <div slot="content">
        <MySkeleton />
      </div>
    </FirstTitle>

    <FirstTitle title="MyTags标签">
      <div slot="content">
        <MyTags>默认标签</MyTags>
        <MyTags :closable="true">标签1</MyTags>
        <MyTags color="#f00">标签2</MyTags>
        <MyTags effect="plain">标签3</MyTags>
      </div>
    </FirstTitle>

    <FirstTitle title="MyDescriptions描述">
      <div slot="content">
        <MyDescriptions
          :border="true"
          title="自定义描述标题"
          :descriptions-list="descriptionsList"
        >
          <span slot="extra">
            <MyButton type="text">操作</MyButton>
          </span>
        </MyDescriptions>
      </div>
    </FirstTitle>

    <FirstTitle title="指令v-loading">
      <div slot="content">
        <MyButton
          v-loading.fullscreen.lock="fullscreenLoading"
          type="primary"
          @click="openFullScreen1"
        >
          全屏指令
        </MyButton>

        <MyButton type="primary" @click="openFullScreen2">
          全屏自定义指令
        </MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="MyColorPicker取色板组件">
      <MyColorPicker slot="content" />
    </FirstTitle>

    <FirstTitle title="地址搜索下拉框">
      <div slot="content" class="dk-grid-3">
        <span>
          <div class="dk-f3-title">带地图下拉选项的：</div>
          <MyCascaderAddress
            class="dk-mb-4"
            :default-value="baiduRegion"
            :get-checked-nodes="getBaiduCheckedNodes"
            @change="baiduMapSearch"
          />
          <MySearchAddress
            :location="baiduLocation"
            :keyword="baiduStreetDetail"
          />
        </span>
        <span>
          <div class="dk-f3-title">不带地图，只带下拉选项的：</div>
          <MyCascaderAddress
            class="dk-mb-4"
            :default-value="baiduRegion"
            :get-checked-nodes="getBaiduCheckedNodes"
            @change="baiduMapSearch"
          />
          <MySearchAddress
            type="search"
            :location="baiduLocation"
            :keyword="baiduStreetDetail"
          />
        </span>
        <span>
          <div class="dk-f3-title">只带地图，不带下拉选项的：</div>
          <MyCascaderAddress
            class="dk-mb-4"
            :default-value="baiduRegion"
            :get-checked-nodes="getBaiduCheckedNodes"
            @change="baiduMapSearch"
          />
          <MySearchAddress
            type="map"
            :location="baiduLocation"
            :keyword="baiduStreetDetail"
          />
        </span>
      </div>
    </FirstTitle>

    <FirstTitle title="地址库级联框">
      <div slot="content" class="dk-grid-4">
        <span>
          <span class="dk-mr-8">省市区级联框:</span>
          <MyCascaderAddress
            :default-value="pcaRegionValue"
            :get-checked-nodes="getCheckedNodes"
          />
        </span>
        <span>
          <span class="dk-ml-16 dk-mr-8">省市级联框:</span>
          <MyCascaderAddress :default-value="pcRegionValue" type="pc" />
        </span>
        <span>
          <span class="dk-ml-16 dk-mr-8">[腾]省级联框:</span>
          <MyCascaderAddress :default-value="pcRegionValue" type="p" />
        </span>
        <span>
          <span class="dk-ml-16 dk-mr-8">[腾]市级联框:</span>
          <MyCascaderAddress :default-value="pcRegionValue" type="c" />
        </span>
        <span>
          <span class="dk-ml-16 dk-mr-8">[腾]区级联框:</span>
          <MyCascaderAddress :default-value="pcRegionValue" type="a" />
        </span>
      </div>
    </FirstTitle>

    <FirstTitle title="vue-i18n国际化语言示例">
      <div slot="content">
        <MyForm :form-schemas="i18nForm" />
        {{ $t('page.demo.playground.locales.text') }}
      </div>
    </FirstTitle>

    <FirstTitle title="MyImage图片展示">
      <div slot="content">
        <MyImage :src="srcList[0]" :preview-src-list="srcList" />
      </div>
    </FirstTitle>

    <FirstTitle title="SafetyVerifyButton安全校验按钮">
      <div slot="content" flex>
        <SafetyVerifyButton
          safety-verify-type="loginForm"
          class="dk-mr-8"
          btn-text="登录表单安全校验"
        />

        <SafetyVerifyButton
          safety-verify-type="loginPhone"
          class="dk-mr-8"
          btn-text="手机号验证码安全校验"
        />

        <SafetyVerifyButton
          safety-verify-type="qrCodeLogin"
          class="dk-mr-8"
          btn-text="二维码安全校验"
        />
      </div>
    </FirstTitle>

    <FirstTitle title="MyLoading展示">
      <div slot="content" class="MyLoading-display">
        <MyLoading />
        <MyLoading loading-type="3D-Flip" />
        <MyLoading loading-type="Surround-Slice" />
        <MyLoading loading-type="Surround-Circle" />
        <MyLoading loading-type="default" />
      </div>
    </FirstTitle>

    <FirstTitle title="MyQrcode生成二维码">
      <div slot="content">
        <!-- 生成二维码 -->
        <MyQrcode />
      </div>
    </FirstTitle>

    <FirstTitle title="MyQrcodeDecode解析二维码">
      <div slot="content">
        <!-- 解析二维码 -->
        <MyQrcodeDecode />
      </div>
    </FirstTitle>

    <FirstTitle title="MyVueCountTo数字动画">
      <div slot="content">
        <MyVueCountTo />
      </div>
    </FirstTitle>

    <FirstTitle title="MyVueClipboard剪贴板">
      <MyVueClipboard slot="content" />
    </FirstTitle>

    <FirstTitle title="解析excel">
      <div slot="left">
        还是得把解析系统独立出来,以下只是个小小的示例，vxe-table已经实现了表格和解析/导出/打印excel一体化
      </div>
      <div slot="content">
        <ParsingExcel />
      </div>
    </FirstTitle>

    <FirstTitle title="excel导出">
      <div slot="content">
        <MyButton @click="exportExcel()">excel直接导出</MyButton>
        <MyButton @click="exportSpeExcel()">excel特殊导出</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="图形验证组件">
      <div slot="content">
        <ValidateCode @getValidateCode="validateCode = $event" />
      </div>
    </FirstTitle>

    <FirstTitle title="页面锚点定位">
      <div slot="content" flex>
        <MyButton
          @click="pageAnchor()"
        >当前页面锚点定位==>通知信息弹窗</MyButton>
        <MyButton
          @click="otherPageAnchor('顶部的内容')"
        >其它页面锚点定位==>用户管理/顶部的内容</MyButton>
        <MyButton
          @click="otherPageAnchor('中部的内容')"
        >其它页面锚点定位==>用户管理/中部的内容</MyButton>
        <MyButton
          @click="otherPageAnchor('底部的内容')"
        >其它页面锚点定位==>用户管理/底部的内容</MyButton>
      </div>
    </FirstTitle>

    <FirstTitle title="dayjs插件">
      <div slot="content" class="dk-grid-4">
        <DisplayText
          :display-text="{
            title: '当前时间',
            content: $dayjs().format('YYYY-MM-DD HH:mm:ss')
          }"
        />
        <DisplayText
          :display-text="{
            title: '解析Unix时间戳 (毫秒)',
            content: $dayjs(1318781876406)
          }"
        />
        <DisplayText
          :display-text="{
            title: '解析Unix时间戳 (秒)',
            content: $dayjs.unix(1318781876)
          }"
        />
        <DisplayText
          :display-text="{
            title: '本地化时间1',
            content: $dayjs('2018 三月 15', 'YYYY MMMM DD', 'zh-cn')
          }"
        />
        <DisplayText
          :display-text="{
            title: '本地化时间2',
            content: $dayjs(
              '05/02/69 1:02:03 PM -05:00',
              'MM/DD/YY H:mm:ss A Z'
            )
          }"
        />
        <DisplayText
          :display-text="{
            title: '本地化时间3',
            content: $dayjs('2018 Enero 15', 'YYYY MMMM DD', 'es')
          }"
        />
      </div>
    </FirstTitle>

    <FirstTitle title="百度地图组件">
      <div slot="content">
        <div class="dk-content dk-mb-8">
          中文教程：<a
            href="https://dafrok.github.io/vue-baidu-map/#/zh/index"
            target="_blank"
          >Vue Baidu Map</a>
        </div>
        <MyVueBaiduMap />
      </div>
    </FirstTitle>

    <MyDialog :visible="dialogVisible" @close="dialogVisible = false">
      <div slot="title">
        弹窗拖拽事件跟destroy-on-close属性，属性值设置为true冲突
      </div>
      <div slot="content" class="scroll-div-box1">
        需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的需要注意的是内容是默认不居中的123
      </div>
      <div slot="footer">
        <MyButton @click="dialogVisible = false">取 消</MyButton>
        <MyButton type="primary" @click="dialogVisible = false">确 定</MyButton>
      </div>
    </MyDialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { languages } from '@/i18n/index.js'
import { showNavigationDetails } from '@/common/performanceNavTiming'
import exportExcelDataJson from '@/assets/excel/exportExcelDataJson/test.json'

export default {
  name: 'ModuleDisplay',
  components: {},
  data () {
    return {
      // 弹窗的显示和隐藏
      dialogVisible: false,

      // 饼图相关树形
      pieChartloading: false,
      pieChart: null,

      // 折线图相关树形
      lineChartloading: false,
      lineChart: null,

      // 柱形图相关属性
      barChartloading: false,
      barChart: null,

      // 绘制中国地图1
      chinaMapAreaLoading: false,
      chinaMapAreaChart: null,

      // 绘制中国地图2
      chinaMapRegionLoading: false,
      chinaMapRegionChart: null,

      formRegister: {
        formConfig: {
          labelProps: {
            position: 'right',
            width: '120px',
            inline: false,
            suffix: '单位'
          },

          // 值有 grid-colums-2  / grid-colums-3
          rowLayout: 'grid-colums-2',
          showFormButton: false,
          helpMessage: '让我们一起嗨起来，好吗？',
          // required: true,
          // formBunListPosition: 'left',
          formBunListConfig: {
            schemas: [
              {
                btnText: '提交',
                type: 'primary',
                loading: false
              },
              {
                btnText: '重置',
                plain: true
              },
              {
                btnText: '检验',
                plain: true,
                type: 'danger'
              }
            ]
          }
        },
        formSchemas: [
          {
            label: '文本框',
            helpMessage: '帮助',
            extraFields: {
              extraField1: '',
              extraField2: ''
            },
            style: {
              width: '60%'
            },
            inputState: 'success',
            formItemState: 'success',
            defaultValue: '123',
            component: 'input',
            field: 'field1',
            placeholder: '1234',
            rules: [
              {
                required: true,
                pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                message: '请输入正确的手机号',
                trigger: 'blur'
              }
            ],
            formItemBtnList: [
              {
                btnText: '点击1',
                type: 'info',
                plain: true,
                click: (ele) => {
                  console.log('点击1', ele)
                  this.getCurrent()
                }
              },
              {
                btnText: '点击2',
                click: (ele) => {
                  console.log('点击2')
                }
              }
            ],
            change: (ele) => {
              console.log('ele--------', ele)
            }
          },
          {
            label: '文本框11',
            helpMessage: '文本框帮助',
            defaultValue: '',
            error: {
              html: "<a target='_blank' href='http://www.baidu.com'> fish is you</a> "
            },
            component: 'input',
            field: 'field21',
            placeholder: '1234',
            inputState: 'warning', // 输入框状态
            labelWidth: '200px',
            required: true
          },
          {
            label: '展示文本',
            component: 'text',
            defaultValue:
              '展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本展示文本',
            error: {
              html: "<a target='_blank' href='http://www.baidu.com'> 123123fish is you</a> "
            },
            field: 'field2',
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: '下拉框',
            component: 'select',
            required: true,
            loading: true,
            field: 'field3',
            error: {
              routerText: '首页',
              routerPath: '/index'
            },
            selectList: [
              {
                label: '选项一',
                value: 1
              },
              {
                label: '选项二',
                value: 2
              },
              {
                label: '选项三',
                value: 3
              }
            ],
            change: (ele) => {
              console.log('下拉框', ele)
            }
          },
          {
            label: '文本域',
            component: 'textarea',
            field: 'field4',
            error: 'fish is you ',
            selectList: [
              {
                label: '选项一',
                value: 1
              },
              {
                label: '选项二',
                value: 1
              },
              {
                label: '选项三',
                value: 1
              }
            ],
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: '取色板',
            component: 'colorPicker',
            field: 'field5',
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: 'myColorPicker取色板',
            component: 'myColorPicker',
            field: 'field11',
            labelWidth: '200px',
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: '滑块',
            component: 'slider',
            defaultValue: 10,
            field: 'field6',
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: '计数器',
            component: 'inputNumber',
            field: 'field7',
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: 'switch开关',
            component: 'switch',
            field: 'field8',
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: '日期选择器',
            component: 'datePicker',
            field: 'field9',
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: 'radio单选框',
            component: 'radio',
            field: 'field10',
            radioList: [
              {
                label: '选项一',
                value: 1
              },
              {
                label: '选项二',
                value: 2
              },
              {
                label: '选项三',
                value: 3
              }
            ],
            change: (ele) => {
              console.log('ele', ele)
            }
          },
          {
            label: '省市区地址',
            component: 'pcaRegion',
            defaultValue: ['140000', '140200', '140212'],
            field: 'pcaRegion'
          },
          {
            label: '省市地址',
            component: 'pcRegion',
            defaultValue: ['120000', '120101'],
            field: 'pcRegion'
          },
          {
            label: '单选级联框',
            component: 'cascader',
            field: 'singleCascader',
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                      {
                        value: 'yizhi',
                        label: '一致'
                      },
                      {
                        value: 'fankui',
                        label: '反馈'
                      },
                      {
                        value: 'xiaolv',
                        label: '效率'
                      },
                      {
                        value: 'kekong',
                        label: '可控'
                      }
                    ]
                  },
                  {
                    value: 'daohang',
                    label: '导航',
                    children: [
                      {
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                      },
                      {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: '多选级联框',
            component: 'cascader',
            field: 'multiCascader',
            propsObj: { multiple: true },
            collapseTags: true,
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                      {
                        value: 'yizhi',
                        label: '一致'
                      },
                      {
                        value: 'fankui',
                        label: '反馈'
                      },
                      {
                        value: 'xiaolv',
                        label: '效率'
                      },
                      {
                        value: 'kekong',
                        label: '可控'
                      }
                    ]
                  },
                  {
                    value: 'daohang',
                    label: '导航',
                    children: [
                      {
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                      },
                      {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      formSchemas: [
        {
          label: '文本框',
          helpMessage: '帮助',
          defaultValue: '123',
          style: {
            width: '70%'
          },
          component: 'input',
          field: 'field1',
          placeholder: '1234',
          rules: [
            {
              required: true,
              pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
              message: '请输入正确的手机号',
              trigger: 'blur'
            }
          ],
          formItemBtnList: [
            {
              btnText: '点击1',
              type: 'info',
              plain: true,
              click: (ele) => {
                console.log('点击1', ele)
                this.getCurrent()
              }
            },
            {
              btnText: '点击2',
              click: (ele) => {
                console.log('点击2')
              }
            }
          ],
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '展示文本',
          component: 'text',
          defaultValue: '展示文本',
          field: 'field2',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '下拉框',
          component: 'select',
          required: true,
          field: 'field3',
          selectList: [
            {
              label: '选项一',
              value: 1
            },
            {
              label: '选项二',
              value: 2
            },
            {
              label: '选项三',
              value: 3
            }
          ],
          change: (ele) => {
            console.log('下拉框', ele)
          }
        },
        {
          label: '文本框',
          component: 'textarea',
          field: 'field4',
          selectList: [
            {
              label: '选项一',
              value: 1
            },
            {
              label: '选项二',
              value: 1
            },
            {
              label: '选项三',
              value: 1
            }
          ],
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '取色板',
          component: 'colorPicker',
          field: 'field5',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: 'myColorPicker取色板',
          component: 'myColorPicker',
          field: 'field11',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '滑块',
          component: 'slider',
          defaultValue: 10,
          field: 'field6',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '计数器',
          component: 'inputNumber',
          field: 'field7',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: 'switch开关',
          component: 'switch',
          field: 'field8',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '日期选择器',
          component: 'datePicker',
          field: 'field9',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: 'radio单选框',
          component: 'radio',
          field: 'field10',
          radioList: [
            {
              label: '选项一',
              value: 1
            },
            {
              label: '选项二',
              value: 2
            },
            {
              label: '选项三',
              value: 3
            }
          ],
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '省市区地址',
          component: 'pcaRegion',
          field: 'pcaRegion',
          change: (ele) => {
            console.log('ele', ele)
          }
        },
        {
          label: '省市地址',
          component: 'pcRegion',
          field: 'pcRegion',
          change: (ele) => {
            console.log('ele', ele)
          }
        }
      ],

      descriptionsList: [
        {
          label: '用户名',
          svgIcon: {
            name: 'chart'
          },
          content:
            '文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本本文本文本文本文本文本文本文本文本'
        },
        {
          label: '用户名1',
          content: '文本',
          labelStyle: {
            background: '#f00',
            'text-align': 'right'
          },
          contentStyle: {
            color: '#f00',
            'text-align': 'right',
            background: '#ff0'
          },
          helpMessage: `累计点击152次`,
          contentAfterBtn: [
            {
              icon: 'el-icon-edit',
              click: () => {
                console.log('点击')
              }
            },
            {
              icon: 'el-icon-edit',
              click: () => {
                console.log('点击')
              }
            }
          ]
        },
        {
          label: '用户名2',
          content: '文本',
          tags: {
            content: '标签'
          },
          contentAfterBtn: [
            {
              icon: 'el-icon-edit',
              btnText: '修改',
              click: () => {
                console.log('修改')
              }
            }
          ]
        },
        {
          label: '用户名3',
          content: '文本',
          html: `<a style="margin-right:5px;" href="https://wwww.baidu.com" target="_blank">baidu</a>`
        }
      ],

      fullscreenLoading: false,

      i18nForm: [
        {
          label: '语言切换',
          component: 'select',
          required: true,
          field: 'field3',
          selectList: languages,
          change: (ele) => {
            console.log('下拉框', ele)
            this.$i18n.locale = ele
          }
        }
      ],
      imageUrl:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      // 用户引导模块
      driver: null,
      // MyBtnList 配置项
      btnListConfig: {
        schemas: [
          {
            btnText: '新增',
            type: 'primary',
            loading: false
          },
          {
            btnText: '审批',
            type: 'success'
          },
          {
            btnText: '删除',
            plain: true,
            type: 'danger'
          }
        ]
      },

      // 省市区级联框默认值
      pcaRegionValue: ['140000', '140200', '140212'],
      // 省市级联框默认值
      pcRegionValue: ['120000', '120101'],

      // 百度地图location
      baiduLocation: '',
      baiduStreetDetail: '平湖街道乾龙物流园',
      baiduRegion: ['440000', '440300', '440307']
    }
  },
  computed: {
    ...mapState('element/elButton', ['disabled', 'plain'])
  },
  mounted () {
    this.canvasCharts()
  },
  methods: {
    ...mapActions('setting/theme', ['set']),
    ...mapActions('element/elButton', ['disableAllBtn', 'resetAllBtn']),
    ...mapMutations('setting/tagViews', ['SET_CURRENT_ANCHOR_LIST']),
    ...mapMutations('element/elButton', [
      'SET_PLAIN',
      'SET_SIZE',
      'SET_DISABLED',
      'SET_ICON',
      'SET_TYPE',
      'SET_TITLE'
    ]),
    // 更换颜色
    changeTheme (color) {
      this.set(color)
    },
    // 确认信息弹窗事件
    confirmModel (status) {
      this.$confirm(`${status}文本`, `${status}标题`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: status
      }).then((res) => {
        console.log('用户点击确认弹窗', res)
      })
    },
    // 通知弹窗
    notification () {
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      })
    },
    // 内容弹窗
    contentModel () {
      console.log('内容弹窗')
      this.dialogVisible = true
    },
    // 绘制统计图
    canvasCharts () {
      this.canvasLine()
      this.canvasPie()
      this.canvasBar()

      // 绘制地图统计表
      this.canvasMapArea()
      this.canvasMapRegion()
    },
    // 绘制折线图图
    canvasLine () {
      const that = this
      that.lineChartloading = true
      that.lineChart = that.$echarts.init(document.getElementById('lineChart'))
      that.lineChart.clear()
      that.lineChart.setOption(that.$commJs.lineOption())
      that.lineChartloading = false
    },
    // 绘制饼图
    canvasPie () {
      const that = this
      that.pieChartloading = true
      that.pieChart = that.$echarts.init(document.getElementById('pieChart'))
      that.pieChart.clear()
      that.pieChart.setOption(that.$commJs.multiPieOption(that.pieChart))
      that.pieChartloading = false
    },
    // 绘制柱形图
    canvasBar () {
      const that = this
      that.barChartloading = true
      that.barChart = that.$echarts.init(document.getElementById('barChart'))
      that.barChart.clear()
      that.barChart.setOption(that.$commJs.barOption())
      that.barChartloading = false
    },

    // 绘制中国地图1
    canvasMapArea () {
      const that = this
      that.chinaMapAreaLoading = true
      that.chinaMapAreaChart = that.$echarts.init(
        document.getElementById('chinaMapAreaChart')
      )
      that.chinaMapAreaChart.clear()
      that.chinaMapAreaChart.setOption(that.$commJs.chinaMapAreaOption())
      that.chinaMapAreaLoading = false
    },

    // 绘制中国地图2
    canvasMapRegion () {
      const that = this
      that.chinaMapRegionLoading = true
      that.chinaMapRegionChart = that.$echarts.init(
        document.getElementById('chinaMapRegionChart')
      )
      that.chinaMapRegionChart.clear()
      that.chinaMapRegionChart.setOption(that.$commJs.chinaMapRegionOption())
      that.chinaMapRegionLoading = false
    },
    // 获取当前方法
    getCurrent () {
      console.log('获取当前methods中的方法')
    },
    // 全局loading
    openFullScreen1 () {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
    },
    openFullScreen2 () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    },

    // 当前页面锚点
    pageAnchor () {
      console.log('页面锚点============>通知信息弹窗')
      this.$commJs.jumpPageAnchor(this, '通知信息弹窗')
    },

    // 其它页面锚点
    otherPageAnchor (anchor) {
      console.log('其它页面锚点')
      this.$router.push({
        path: '/risk/reviewProcess',
        name: 'user',
        params: {
          anchor
        }
      })
    },

    // 获取PerformanceNavigationTiming接口
    showNavigationDetails () {
      showNavigationDetails()
    },

    /**
     * @description: MyBtnList组件的事件统一处理
     * @param {*} ele
     * @return {*}
     */
    clickFun (ele) {
      const { item } = ele
      item.loading = true
      switch (item.btnText) {
        case '新增':
          console.log('新增')
          this.$commJs
            .confirmModel('确认新增吗？', this)
            .then((res) => {
              console.log('res======>', res)
            })
            .finally(() => {
              item.loading = false
            })
          break
        case '审批':
          console.log('审批')
          this.$commJs
            .confirmModel('确认审批吗？', this)
            .then((res) => {
              console.log('res======>', res)
            })
            .finally(() => {
              item.loading = false
            })
          break
        case '删除':
          console.log('删除')
          break
      }
    },

    /**
     * @description: 获取省市区节点数据
     * @param { Function } callback 回调函数
     * @return {*}
     */
    getCheckedNodes (callback) {
      console.log('父组件==>获取省市区节点数据======>', callback())
    },

    /**
     * @description: 百度地图省市区选择
     * @param {*} ele
     * @return {*}
     */
    baiduMapSearch (ele) {
      console.log('百度地图省市区选择', ele)
    },

    /**
     * @description: 获取百度地图省市区节点数据
     * @param { Function } callback 回调函数
     * @return {*}
     */
    getBaiduCheckedNodes (callback) {
      const regionData = callback()?.[0]
      console.log('父组件==>获取省市区节点数据======>', regionData)
      const regionStr = regionData?.pathLabels?.join('')
      console.log('regionStr', regionStr)
      // const { lat, lng } = regionData.data.location
      this.baiduLocation = regionData?.pathLabels?.[1]
      // this.baiduLocation = [lat, lng]
      // this.baiduLocation = { lat, lng }
    },

    /**
     * @description: 导出excel
     * @return {*}
     */
    exportExcel () {
      console.log('导出excel', exportExcelDataJson)
      const parseJsonData = exportExcelDataJson
      this.$commJs.exportExcelFun(parseJsonData)
    },

    /**
     * @description: 导出excel
     * @return {*}
     */
    exportSpeExcel () {
      console.log('导出excel')
      const parseJsonData = exportExcelDataJson
      this.$commJs.exportExcelFun(parseJsonData)
    },

    /**
     * @description:
     * @return {*}
     */
    showMessageBox (title = '', content = '') {
      const h = this.$createElement
      const createEle = h(
        'p',
        {
          style: {
            color: 'green'
          }
        },
        [
          h(
            'span',
            {
              style: {
                color: 'red',
                fontSize: '18px'
              }
            },
            content
          ),
          h(
            'div',
            {
              style: {
                backgroundImage:
                  'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/a8ec8a13632762d01fd3ada8a8ec08fa513dc63c.jpg',
                width: '50px',
                height: '50px'
              }
            },
            ''
          ),
          h('p', null, 'fish is you')
        ]
      )
      this.$msgbox({
        title: title,
        message: createEle,
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        beforeClose: (action, instance, done) => {
          done()
        }
      })
        .then((res) => {
          console.log('action=====>', res)
          if (res === 'confirm') {
            console.log('点击了确定')
          }
        })
        .catch((action) => {
          console.log('action=====>', action)
          if (action === 'cancel') {
            console.log('点击了否')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.svgItem {
  width: 7.5rem;
  height: 7.5rem;
}

.svgIconsMap-css {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
  color: $color-primary;
}

.svgItem-text {
  margin-top: 4px;
}

.eChart-container {
  width: 100%;

  #lineChart {
    width: calc(100% - 410px);
    height: 500px;
  }

  #pieChart {
    margin-left: 10px;
    width: 400px;
    height: 500px;
  }
  &-barChart {
    #barChart {
      height: 500px;
      width: 100%;
    }
  }
}

#lineChart,
#pieChart,
#barChart,
#chinaMapAreaChart,
#chinaMapRegionChart {
  overflow: hidden;
  @extend %card;
}

.china-mapCart {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  height: 500px;
  #chinaMapAreaChart,
  #chinaMapRegionChart {
    width: 100%;
    height: 100%;
  }
}

.scroll-div {
  height: 150px;
  width: 100%;
  &-box {
    height: 500px;
    word-break: keep-all;
    background: rgba(0, 0, 0, 0.4);
  }
}
.scroll-div-box1 {
  height: 80vh;
  word-break: keep-all;
  background: rgba(0, 0, 0, 0.4);
}
.svgBox {
  @extend %flex-warp;
}

.MyLoading-display {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
}

.parentNode {
  position: relative;
}

.testNode {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100px;
}
</style>
