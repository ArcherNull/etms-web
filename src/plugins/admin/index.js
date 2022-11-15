/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 框架核心
 */
import store from '@/store'
// Element
import ElementUI from 'element-ui'
// 公共文件
import commJs from '@/common/index.js'
// 公共配置setting
import setting from '../../setting.js'
// 炫酷的粒子动效
import VueParticles from 'vue-particles'
// echarts图表
import * as echarts from 'echarts'
// 引入中国地图json文件
import china from '@/utils/ChinaJson/china.json'
// 统计图注册中国地图
echarts.registerMap('china', china)
// api接口
import api from '@/api/index'
// 国际化
import i18n from '@/i18n/index.js'
// 图片预览
import Viewer from '../vViewer/index'
// 图片剪裁工具
import VueCropper from 'vue-cropper'
// vue-clipboard2剪贴板
import VueClipboard from 'vue-clipboard2'

// 全局混入
import mixins from '@/mixins/index'
// 全局指令
import directives from '@/directives/index'
// dayjs
import dayjs from '@/plugins/dayjs/index'
// 地图
import BaiduMap from 'vue-baidu-map'

// 引入的elementUI样式
import 'element-ui/lib/theme-chalk/index.css'
// flex 布局库
import 'flex.css'
// 浏览器样式兼容
import 'normalize.css'
// 引入全局样式
import '@/assets/styles/globalCss.scss'
// 引入svg图标
import '@assets/svg-icons'
// svg 图标数组
import svgIconsMap from '@/assets/svg-icons/index'

// ag-grid 表格默认配置项
// import agGridOptions from '@/components/AgGrid/common/index'

// 功能插件--console.log打印用
import pluginLog from '@/plugins/log'
// 功能插件--打开新窗口
import pluginOpen from '@/plugins/open'

export default {
  async install (Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.VUE_APP_BASE_API
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
    // 图标库
    Vue.prototype.$svgIconsMap = svgIconsMap
    // Element
    Vue.use(ElementUI, {
      size: 'medium', // set element-ui default size
      zIndex: 3000,
      i18n: (key, value) => i18n.t(key, value) // 重点：为了实现element插件的多语言切换
    })
    // 公共文件夹
    Vue.prototype.$commJs = commJs
    // 公共设置
    Vue.prototype.$setting = setting
    // Vue.prototype.$languages = languages
    Vue.prototype.$api = api
    // 全局注册eChart
    Vue.prototype.$echarts = echarts
    // ag-grid表格默认配置项
    // Vue.prototype.$agGridOptions = agGridOptions
    // 挂在日期处理插件
    Vue.prototype.$dayjs = dayjs

    // 功能插件
    Vue.use(pluginLog)
    Vue.use(pluginOpen)
    // 粒子特效
    Vue.use(VueParticles)

    // 剪贴板
    Vue.use(VueClipboard)
    // 混入
    Vue.use(mixins)
    // 指令
    Vue.use(directives)
    // 百度地图
    Vue.use(BaiduMap, {
      // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
      ak: 'DjZL60GyDrVkIgOzm0Fjx2mXuAzdMHvw'
    })
    // 图片预览
    Vue.use(Viewer)
    // 图片剪裁工具
    Vue.use(VueCropper)

    // 全局错误捕获
    Vue.config.errorHandler = function (err, vm, info) {
      console.error('err  ===========>', err)
      console.log('vm   ===========>', vm)
      console.info('info ===========>', info)

      const type = err ? 'error' : 'info'

      store.dispatch('setting/log/pushErrorLog', {
        message: err,
        errorType: 'js',
        type,
        meta: {
          otherMessage: '补充信息'
        }
      })
    }
  }
}
