/*
 * @Author: Null
 * @Date: 2021-11-06 14:18:47
 * @Description: 打包配置文件
 */
'use strict'

// 引入nodeJs的path模块，方便解析文件路径
const path = require('path')
// 打包压缩插件compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 主题更换插件webpack-theme-color-replacer
const ThemeColorReplacer = require('webpack-theme-color-replacer')
// elementUI的主题更换模块
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

// const { keys } = require('lodash')
const adminName = require('./package.json').name
// 拼接绝对路径的方法
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const name = adminName || 'admin'
const externals = {}

// 添加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 拿取到baseurl
const baseUrl = process.env.VUE_APP_BASE_API

// 采用了nodeJs中的模块的写法，也就是CommonJs的语法

module.exports = {
  publicPath: '/', // 公共路径 默认为"/"，建议使用"./"相对路径；使用相对路径，不然后台找不到首页资源【这个也看后台那边怎么访问】
  outputDir: 'dist', // build打包输出目录
  assetsDir: 'static', // 静态文件输出目录，基于dist
  lintOnSave: process.env.NODE_ENV === 'development', // nodeJs中自带process模块，我们直接可以通过该变量来判断环境是否关闭语法校验
  productionSourceMap: false, // 关闭线上源码,可减少项目打包体积
  devServer: {
    open: true, // 默认浏览器自动打开
    // inline: true, // 开启热更新
    // host: '0.0.0.0', // 设置为0.0.0.0则所有的地址均能访问
    port: '5000', // 设置本地服务器的端口号
    // 需要gzip压缩的文件【谨慎使用】
    // before (app, server) {
    //   app.get(/.*.(js)$/, (req, res, next) => {
    //     req.url = req.url + '.gz'
    //     res.set('Content-Encoding', 'gzip')
    //     next()
    //   })
    // },
    proxy: {
      '/admin': {
        target: baseUrl, // 测试域名
        changOrigin: true
      },
      '/api': {
        target: baseUrl, // 测试域名
        changOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // additionalData: '@use "@/assets/style/public.scss" as *;'
        additionalData: `@import "@/assets/styles/element/element-variables.scss";` // scss公共变量文件
      }
      /*       less: {
        lessOptions: {
          modifyVars: {
            blue: '#2262AB'
          }
        }
      } */
    }
  },
  // webpack打包配置
  configureWebpack: (config) => {
    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.externals = externals || {}
      configNew.plugins = [
        // gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
    }

    // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
    // if (process.env.NODE_ENV !== 'production') return
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true // 生产环境去掉console.log
    }

    return {
      // 此处配置webpack.config.js的相关配置
      name: name,
      resolve: {
        alias: {
          '@': resolve('src'),
          '@components': resolve('src/components'),
          '@assets': resolve('src/assets'),
          '@views': resolve('src/views'),
          '@common': resolve('src/common'),
          '@store': resolve('src/store'),
          '@plugins': resolve('src/plugins'),
          '@api': resolve('src/api')
        }
      },
      ...configNew
    }
  },
  chainWebpack: (config) => {
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: `${name}-[name]`
      })
      .end()

    // 只有在打包的环境下才，压缩图片。如果是开发环境就会导致一个问题。src映入的图片路径找不到.
    // 主要原因是url-loader这个打包路径导致的，现在没有想到更好的办法解决
    if (process.env.NODE_ENV === 'production') {
      const imagesRule = config.module.rule('images')
      imagesRule.uses.clear()
      imagesRule
        .use('file-loader')
        .loader('url-loader')
        .options({
          limit: 10240, // 限制10M
          fallback: {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images'
            }
          }
        })
      // 压缩响应的app.json返回的代码压缩
      config.optimization.minimize(true)
    }

    // 主题更换配置，配置打包为不同的主题样式文件
    config.plugin('theme-color-replacer').use(ThemeColorReplacer, [
      {
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: [
          ...forElementUI.getElementUISeries(process.env.VUE_APP_ELEMENT_COLOR) // Element-ui主色系列
        ],
        externalCssFiles: [
          './node_modules/element-ui/lib/theme-chalk/index.css'
        ], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        changeSelector: forElementUI.changeSelector
      }
    ])

    // 代码分割
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000, // 字节 引入的文件大于30kb才进行分割
      // maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1, // 模块至少使用次数
      maxAsyncRequests: 5, // 同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      maxInitialRequests: 3, // 首页加载的时候引入的文件最多3个
      automaticNameDelimiter: '~', // 缓存组和生成文件名称之间的连接符
      name: true, // 缓存组里面的filename生效，覆盖默认命名
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        elementUI: {
          name: 'chunk-elementUI',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    })

    config.optimization.runtimeChunk('single')

    // webWorker
    // 初次进入的文档标题
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })
    // set worker-loader
    config.module.rule('worker').test(/\.worker\.js$/).use('worker-loader').loader('worker-loader').end()
    // 解决：worker 热更新问题
    config.module.rule('js').exclude.add(/\.worker\.js$/)
    // 解决：“window is undefined”报错，这个是因为worker线程中不存在window对象，因此不能直接使用，要用this代替
    config.output.globalObject('this')
  },
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'i18n/locales',
      enableInSFC: true
    }
  }
}
