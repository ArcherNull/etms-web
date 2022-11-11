# ETMS
## 简介
ETMS是一款后台前端解决方案，它使用了vue2+elementUi前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。
## 附属系统
在线文件预览系统【包含同类型文件格式转换】/ 地址库系统 / 打印系统 / excel模板系统 / 合同系统 /视频插件

【补充】以上均采用拔插式设计
在线文件预览系统 ： 在本地网页预览超出浏览器预览之外的文件
地址库系统 ： 可以实时刷新地址库，可以做成 npm 插件，此系统可以跟excel模板系统相关联
打印系统 ： 除了系统网页打印之外，特殊打印，现在主要包含锐浪报表打印
excel模板系统 ： 这是根据我们自己后台的个性化设置，解析导出模板

## 前序准备
### 必备知识点
本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，提前了解和学习这些知识会对使用本项目有很大的帮助。

### 启动环境
你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。

### 前端代码规范
参考字节前端代码规范而编写的[dekun_admin项目前端代码规范](./README_rules.md)

### 参考框架
 **2）vue2产品框架**  
 **d2-admin**   [✨ demo](https://d2-admin.netlify.app/#/index) | [📦 doc_zh](https://d2.pub/zh/doc/d2-admin/)是一个完全 开源免费 的企业中后台产品前端集成方案，使用最新的前端技术栈，小于 60kb 的本地首屏 js 加载        
 **vue-element-admin**   [✨ demo](https://panjiachen.github.io/vue-element-admin/#/dashboard) | [📦 doc_zh](https://panjiachen.gitee.io/vue-element-admin-site/zh/)是一个后台前端解决方案，它基于 vue 和 element-ui实现。    

 **2）vue3产品框架**  
 **vue-vben-admin** 【推荐】  [✨ demo](https://vvbin.cn/next/#/dashboard/analysis) | [📦 doc_zh](https://vvbin.cn/doc-next/guide/introduction.html) | [👋 github](https://github.com/vbenjs/vue-vben-admin)  是一个基于 Vue3.0、Vite、 Ant-Design-Vue、TypeScript 的后台解决方案，目标是为开发中大型项目提供开箱即用的解决方案。包括二次封装组件、utils、hooks、动态菜单、权限校验、按钮级别权限控制等功能。项目会使用前端较新的技术栈，可以作为项目的启动模版，以帮助你快速搭建企业级中后台产品原型。也可以作为一个示例，用于学习 vue3、vite、ts 等主流技术。该项目会持续跟进最新技术，并将其应用在项目中。

 **3）css框架**  
**flex.css** [📦 doc_zh](https://github.com/lzxb/flex.css/blob/master/docs/zh-ch.md) | [👋 github](https://github.com/lzxb/flex.css) 简洁的api，熟悉的属性值，入门毫无压力。在html中采用属性的方式布，将布局和css进行分离，清晰的布局结构让你更容易维护，可以在不更改css的情况下更改布局。

 **4）动画库框架1**  
**Hover.CSS** [📦 doc_zh](https://ianlunn.github.io/Hover/) | [👋 github](https://github.com/lzxb/flex.css) Hover.css可以通过多种方式使用。可以从hover.css复制并粘贴所需的效果，也可以参考样式表。对要应用的元素使用效果的类名。你还可以使用npm进行安装：*npm install hover.css --save*。如果你计划要用到许多Hover.css效果，也可以考虑引用整个Hover.css样式表：【暂时未采用】

## 功能

```
- 登录 / 注销

- 权限验证
  - 动态路由权限
  - 页面按钮权限

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套，路由懒加载）
  - 动态面包屑
  - 快捷导航(标签页)
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本

- Excel
  - 导出excel
  - 解析excel
  - 格式转换工具

- 表格
  - vex-table大数据表格
  - ag-grid大表格数据

- 错误页面
  - 404

- 組件
  - svg-icons图标库
  - font-awasome图标库

- 综合实例

- lottie动画

- 全局搜索引擎
 - 系统内模块搜索
 - 业务场景搜索
 - 外部搜索【难点】

- 安全校验
 - 真人高校验：短信验证码/邮箱/二维码/登录表单手机号
 - 弱校验： 图形验证码/滑块验证码

- 表单
  - 动态配置表单
  - 二维码识别注入数据
  - 生成二维码
  - 数据持久化
  - txt/json注入数据
  

- 错误日志
 - 操作日志（会话）
 - 错误日志

- Dashboard
 - 工作台
 - 数据分析平台

- 引导页
 - 特定版本新手引导

- ECharts 图表
 - 中国地图
```

## 架构说明

模块化/组件化开发
```
src
├─api          api束口
├─assets       静态资源文件
├─common       公共方法文件
├─components   公共组件
├─directive    自定义指令文件
├─layout       布局组件
├─libs         公共工具文件
├─plugins      公共插件
├─router       路由
├─serve        请求模块
├─store        vuex状态管理
├─utils        外部引入库文件
├─views        页面
├─App.vue      根组件
├─main.js      根组件入口文件
└─setting.js   项目配置文件
```

## 开发

```bash
# 克隆项目
git clone git地址

# 进入项目目录
cd dekun_admin

# 安装依赖
yarn install

# 启动服务
yarn serve
```

浏览器访问 http://localhost:8000

## 发布

```bash
# 构建生产环境
yarn build
```
## 技术支持
[👤 Author] [@Null](https://www.baidu.com)

## Show your support
Give a ⭐️ if this project helped you!
如果觉得项目还不错, 就点个star吧~

## 🤝 Contributing
欢迎提供问题和功能需求, 如果大家有好的点子和优化建议, 也欢迎提出参与我们的共建.
