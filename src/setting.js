
/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 项目设置setting
 */
const admin = require('../package.json')
const parser = require('ua-parser-js')
import cookies from '@/libs/util.cookies'

// 系统版本信息识别
const systemInfo = parser(navigator.userAgent)
// console.log('systemInfo', systemInfo)

// 浏览器名称
const vue_browser_name = systemInfo.browser.name
// 浏览器版本号
const vue_browser_version = systemInfo.browser.version
// 浏览器内核
const vue_browser_engine_name = systemInfo.engine.name
// 操作系统cpu
const vue_operation_cpu_name = systemInfo.cpu.architecture
// 系统版本
const version = admin.version
// 特殊变量前缀名
const prefixName = `${admin.name}-${version}`

const defaultLanguage = cookies?.get('lang', prefixName) || process.env.VUE_APP_I18N_LOCALE

export default {
  // 项目名
  name: admin.name,
  // 项目名简称
  abbreviateName: 'fk',
  // 项目版本
  version,
  // 前缀名
  prefixName,
  // 系统描述
  description: 'dekun_admin是一款后台前端解决方案，它使用了vue2+elementUi前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。',
  // 文档地址
  document: 'https://gitee.com/acher_Saber/dekun_admin#/acher_Saber/dekun_admin/blob/master/README_rules.md',
  // 前端代码规范
  developerRules: 'https://gitee.com/acher_Saber/dekun_admin/blob/master/README_rules.md',
  // 当前页面窗口的宽度
  windowWidth: () => {
    return window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width
  },
  // 当前页面窗口的高度
  windowHeight: () => {
    return window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height
  },
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认配置
  menu: {
    asideCollapse: false,
    asideTransition: true
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: false
        }
      }
    ]
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 布局组件引用暂存
  layoutComponent: null,
  // 注册的主题
  theme: {
    showCurrentTheme: {
      isOnline: false, // 是否是线上主题设置，false表示为本地主题设置，true表示为线上主体设置
      themeIndex: 1 // 选择的主体是第几张
    },
    // 本地主体设置,【注意】通过js绑定的style,不能使用本地路径，而是使用样式
    localThemeList: [
      {
        title: '简约',
        name: '简约',
        preview: '/assets/images/theme/simple.jpg',
        themeStyle: {}
      },
      {
        title: '流星',
        name: '流星',
        preview: '/assets/images/theme/star.jpg'
      },
      {
        title: '紫罗兰',
        name: '紫罗兰',
        preview: '../assets/images/theme/star.jpg',
        themeStyle: {
          background: 'linear-gradient(120deg, #bc00e3 0%, #4EFFFB 100%)'
        }
      }
    ],
    // 线上主题设置
    onlineThemeList: [
      {
        title: '经典',
        name: '经典',
        preview: '/file/2022-01-18/b0b35c02-d09c-4dd4-af5b-ebbff8a36435.jpg'
      }
    ]
  },
  // 默认展示的语言
  defaultLanguage,
  // 可设置的国际化的语言
  languages: [
    {
      label: '中文',
      value: 'zh-CN'
    },
    {
      label: '英文',
      value: 'en'
    }
  ],
  // 登录页的名言设置
  wellKonwSayingList: [
    {
      'zh-CN': '时间是一切财富中最宝贵的财富',
      en: 'Time is the most precious of all wealth'
    },
    {
      'zh-CN': '当你足够强大的时候，你的存在才不容忽视',
      en: 'When you are strong enough, your existence can not be ignored'
    },
    {
      'zh-CN': '逆境造就能人',
      en: 'Bad times make a good man'
    },
    {
      'zh-CN': '求知无坦途',
      en: 'There is no royal road to learning'
    },
    {
      'zh-CN': '怀疑是知识的钥匙',
      en: 'Doubt is the key to knowledge'
    },
    {
      'zh-CN': '生活若无波折险阻，就会过于平淡无奇',
      en: 'Life would be too smooth if it had no rubs in it'
    },
    {
      'zh-CN': '人生像一匹马，你不驾驭它,它便驾驭你',
      en: 'Life is a horse, and either you ride it or it rides you'
    },
    {
      'zh-CN': '心灵最高尚的人，也总是最勇敢的人',
      en: 'The best hearts are always the bravest'
    },
    {
      'zh-CN': '就像海明威说的那样，比自己同伴优秀没有什么高尚的，真正的高尚是比曾经的自己更优秀',
      en: 'As Hemingway said, there is nothing noble about being better than your peers. The real nobility is being better than yourself'
    }
  ],
  // 是否默认开启页面切换动画
  transition: {
    active: true
  },
  // 系统信息
  systemInfo: {
    vue_browser_name,
    vue_browser_version,
    vue_browser_engine_name,
    vue_operation_cpu_name
  }
}
