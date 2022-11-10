<!--
 * @Author: Null
 * @Date: 2021-11-19 10:37:34
 * @Description:  前端代码规范
-->
# dekun_admin项目前端代码规范
## 前端原则
```
1、对用户操作的数据和接受后台的数据，保持怀疑且保持防御
2、注释，注释，注释，重要的事情说三篇
3、KISS原则（Keep it Simple and Stupid）【一切尽可能简单，简单，简单！！！ 简单就是美，能简单的绝不复杂】
4、DRY原则（Don’t Repeat Yourself）【顾名思义，任何一段代码如果需要复制第三次，需要进行抽象】
5、最少知道原则 【高内聚，低耦合，任何事物应该保持对外界的最少知道原则】
6、分治原则 【复杂的问题，负责的功能，应该拆分，由更小的部分组成】
```

## 文件命名
```
1、文件夹命名
  1.1 组件文件夹命名
      1）组件分为全局组件和局部组件，其文件放置于src根目录下的components文件夹中，全局组件文件夹一律大写，并且index.vue
         为全局组件的入口文件，
      2）局部组件分为全局组件的局部组件和页面局部组件，如果全局组件还需要单独写局部组件，可直接在内写组件名+后缀名.vue 
         的局部组件【特殊情况除外】；页面局部组件，如果当前模块存在共用，则放置于模块下的components文件夹中，命名规则
         与全局组件一致。如果只是单个页面的局部组件，需要在单个页面的文件夹下写入components ,局部组件写组件名+后
         缀名.vue 的局部组件

  1.2 静态资源文件夹（图片/字体/样式/动画）
      位于根目录src文件夹下的assets文件中
      1）图片放置于 /src/assets/images 中， 单张图片大小不得超过500k; 
      2）字体放置于 /src/assets/images 中
      3）动画模型放置于 /src/assets/lottie 中
      4）公共样式放置于 /src/assets/styles 中
      5）svg图片放置于 /src/assets/svg-icons 中
         
  1.3 页面模块命名
      1）页面文件夹命名一律采用小写且短横线连接，并文件夹以index.vue为该页面模块的入口文件

```
## 变量命名
```
1、环境变量命名
   1.1 .env文件 中的自定义变量的命名规则为 VUE_APP + 自定义变量 ，例如： VUE_APP_API
2、vuex的mutations的变量命名
   2.1 如果state的变量为 size , 那么mutations中的变量为 SET_SIZE ，即是 SET_ + state中的状态变量名大写
   2.2 actions变量设置，变量命名需要贴近其使用作用或场景的命名方式
3、页面内的变量命名需满足驼峰命名法，特殊场景可使用大驼峰（如类的编写）或者下划线的写法
4、保存指针，统一为 const that = this
5、给vue的prototype绑定自定义方法，需要加$ ，在加 自定义变量
6、不可命名变量太短，太笼统，未贴切描述当前场景的使用状态及作用
7、正则表达式变量命名 ， 以reg开头

```

## 公共方法命名
```
1、公共方法 位置于/src/common , 其文件夹中文件如下：
   1.1 公共方法的入口文件为index.js , 集成当前文件下的所有属性和方法
   1.2 系统功能的公共方法写于/src/common/dkCommFun.js 【重】
   1.3 业务的公共方法写于 /src/common/commFun.js 【重】

2、当前目录结构
  src
   └─common
        commAttr.js               公共属性
        commFun.js                系统公共方法
        dkCommFun.js              业务公共方法
        driver.js                 新手指导driver.js封装公共文件
        eChartOptions.js          eChart统计图配置项数据
        elementUICommon.js        存放elementUi组件公用的属性或方法
        exportExcel.js            导出excel方法
        filter.js                 过滤器
        index.js                  入口文件
        isCarLicense.js           车牌号验证
        math.js                   mathJs数学库
        parseExcel.js             解析excel文件
        performanceNavTiming.js   展示navigation对象信息
        rules.js                  用于el-form表单验证的规则以及常用的正则表达式验证
        timePoll.js               轮询定时器
        validate.js               用于数据的正则校验
        validateCode.js           前端验证码校验
        webSocket.js              webSocket方法封装

```

## 公共样式规范
```
1、公共样式的入口文件只有一个，不能单独另创建，当然创建的其它scss文件可集成在入口文件内
2、针对切换主题等功能，一般使用样式前缀
3、scss变量需要单独放置一个文件中，继承类scss文件,elementUI样式更改scss文件，动画类scss文件等都必须分隔开，集成
   在入口文件中

```

## 自定义组件规范
```
1、基本组件由三部分template/script/style构成，最少两部分template/script；特殊jsx方式书写的组件除外；
2、必须声明name属性 , 且name的属性值必须跟文件名保持一致 ， 如Component.vue ,则name属性值则为Component，统一声明
   方式为PascalCase (首字母大写命名)，如果是全局组件，则name属性值则跟其文件夹名保持一致 ,最外层的classname命名也应与name属性保持一致，方便定位；
3、props 中声明传值，必须携带类型type, 当类型为Object时，传值不能为null ; 
4、$emit 不能传递数组给父组件；
5、组件间传值优先级【从高到低】 props/$emit => 回调函数 => $listener/$attr => provide/inject => $ref/$parent/$children => eventBus => 浏览器localSotrage/sessionStorage => vuex，
  请按照优先级顺序调用相应的传值属性，不可盲目使用$ref
6、凡是二次封装的ElementUI组件需要首字符加上My，例如<el-button>进行二次封装 ，组件名为MyButton；
7、组件放置于根目录下的components文件夹中的index.vue，都会被自动注册为全局组件,非全局组件的局部组件不能命名为index.vue；
8、组件尽量做到细分，独立，不互相关联，组件可分为全局组件，全局组件的局部组件，页面内业务全局组件，业务局部组件等，按道理来说，组件内不允许添加业务逻辑以及业务接口；特殊
   组件除外，例如上传组件，含有公共接口/公共业务逻辑的组件；
9、尽量使用v-show 而不是v-if, v-if 可作为控制渲染进程的手段，但是并不能频繁调用


```
## api接口文件规范
```
1、api分为私有api以及全局api,区分场景为公共api(上传类)的api和单独页面类的api
2、按照菜单页面，按模块进行集成，统一挂载到vue实例属性上
3、统一采用promise方法，可实现链式调用
```

## vuex文件规范
```
1、现在项目有两层modules, 每层modules下面通过index.js文件自动注册，也是通过文件名自动注册，所以开发时得保证文件名不重名，文件夹名和文件以驼峰法命名
2、vuex 五大属性内得命名规范 state(驼峰命名法)、mutations(全大写下划线写法，例如SET_PLAIN)、actions(驼峰命名法)、modules(自动注册)、getter(vuex集成唯一得文件)
3、getters.js 文件 ，可读缓存文件，一般存放layout布局组件相关数据/前端错误日志/权限类等
```
## 图标类文件规范
```
1、能使用css的，尽量使用css
2、小图过多，可以使用精灵图
3、大图每张大小控制在100k以内
```

## 页面模块编写规范
```
1、页面代码控制在2000行之内，合格标准为：优秀：0-300行 ； 高标准：300-600行； 中标准：600-1000行；及格线：1000-1500行；
   该情况识业务逻辑的复杂程度而定，并不是统一标准。要求为组件化/单一性/高复用/低耦合/逻辑严谨，以较少的代码量达成高效有意义的业务逻辑
2、页面内或组件内尽量减少定时器/watch监听/递归循环， onresize，watch监听等的使用
3、页面组件的使用采用异步调用，当然我们可以将异步组件封装成异步工程组件，以方便兼容弱网/无网的情况

```

## git代码提交规范
```
1、以package.json文件内的version属性为标准，发布前端版本号，版本号控制浏览器缓存，以及页面新功能引导页，方便git存储相关版本的记录
2、git commit 提交内容格式为：<type>(scope?): <subject>
2、新功能/新特性提交：feat(v2.3.2-用户管理/用户列表): 增加 xxx 功能【faker】
3、bugfix : fix(v2.3.2-用户管理/用户列表): 修复xxx的bug【faker】
4、版本提交：build(v2.3.2): 大版本迭代，增加xxx功能/模块【faker】
5、线上分支为；dev / master / pro , 分别为 测试/预发版/正式环境，dev测试用于测试人员验证新需求，bugfix的提交；master预发版用于紧急bugfix，以及版本回退最用，pro为正式上线环境
6、代码提交流程
![avatar](/assets/images/git.png)

```

## 打包规范
```
1、生产环境必须清除console , debugger , 注释
2、需要对源代码进行压缩，js/css/图片分区块压缩合并

```

## 敏感信息数据
```
1、账号名/密码等敏感信息不可存放于前端，更不能暴露后端数据库/服务器的账号和密码
2、非必要，不可存储密钥之类的数据，存放也需通过特定的加密规则进行加密
3、变量使用webpack别名打包
4、用户敏感信息需加密保存
5、请求传输数据需加密

```

## 网页安全
```
1、前端需做防xss攻击，防sql注入
2、打包将特定变量隐藏，用户隐私加密
3、防爆破，axios去重请求
4、IP定位（后台）
5、脚本攻击防御，相同接口连续出错超出限制，直接拉入黑名单
6、数据加密传输

```

## 设计模式
```
目前项目中使用到的设计模式
1、构造函数
2、工厂函数【自定义函数封闭复用，不拓展】
3、构造函数+原型 【通用】
4、发布者订阅者模式【Vue】
5、类封装【agGrid】

设计原则：单一性/黑盒封装/高复用/低耦合/模块化



```