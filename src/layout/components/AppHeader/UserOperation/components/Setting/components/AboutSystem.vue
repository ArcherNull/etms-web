<template>
  <div class="aboutSystem">
    <MyDescriptions
      :column="2"
      :border="true"
      title="系统信息"
      :descriptions-list="systemInfoList"
    />

    <MyDescriptions
      class="dk-mt-16"
      :column="2"
      :border="true"
      title="浏览器信息"
      :descriptions-list="browserInfoList"
    />

    <MyDescriptions
      class="dk-mt-16"
      :column="2"
      :border="true"
      title="相关产品信息"
      :descriptions-list="relativeProject"
    />

    <MyDescriptions
      class="dk-mt-16"
      :column="2"
      :border="true"
      title="关于我们"
      :descriptions-list="aboutUs"
    />

    <MyDescriptions
      class="dk-mt-16"
      :column="2"
      :border="true"
      title="联系我们"
      :descriptions-list="connectUs"
    />
  </div>
</template>

<script>
import setting from '@/setting'
export default {
  name: 'AboutSystem',
  data () {
    return {}
  },
  computed: {
    systemInfoList () {
      return [
        {
          label: '系统名称',
          content: setting.name
        },
        {
          label: '系统简称',
          content: setting.abbreviateName
        },
        {
          label: '系统简介',
          content: setting.description
        },
        {
          label: '系统版本',
          tags: {
            content: setting.version
          }
        },
        {
          label: '系统编译时间',
          content: process.env.VUE_APP_BUILD_TIME
        },
        {
          label: '系统操作文档',
          html: `<a href="${setting.document}" target="_blank">操作文档</a>`
        },
        {
          label: '系统前端开发者文档',
          html: `<a href="${setting.document}" target="_blank">开发者文档</a>`
        },
        {
          label: '系统前端开发规范',
          html: `<a href="${setting.developerRules}" target="_blank">开发规范</a>`
        }
      ]
    },
    browserInfoList () {
      return [
        {
          label: '浏览器名称',
          content: setting.systemInfo.vue_browser_name
        },
        {
          label: '浏览器版本号',
          tags: {
            content: setting.systemInfo.vue_browser_version
          }
        },
        {
          label: '浏览器Web渲染引擎',
          content: setting.systemInfo.vue_browser_engine_name
        },
        {
          label: '操作系统',
          content: setting.systemInfo.vue_operation_cpu_name
        }
      ]
    },
    relativeProject () {
      return [
        {
          label: 'Wechat小程序管理后台1',
          html: `<a href="https://gitee.com/acher_Saber/lvzh_mobile" target="_blank">微信小程序原生开发</a>`
        },
        {
          label: 'Wechat小程序管理后台2',
          html: `<a href="https://gitee.com/acher_Saber/taroDemo" target="_blank">taro3+react开发</a>`
        },
        {
          label: 'Wechat共享广告',
          html: `<a href="https://gitee.com/acher_Saber/new-advert" target="_blank">uniapp开发</a>`
        }
      ]
    },
    aboutUs () {
      return [
        {
          label: '团队',
          content: '超能团队'
        },
        {
          label: '团队成员',
          content: '团队成员1,团队成员2'
        }
      ]
    },
    connectUs () {
      return [
        {
          label: '意见反馈',
          content: '010-28871099',
          contentAfterBtn: [
            {
              btnText: '联系我们',
              click: (ele) => {
                console.log('联系我们', ele)
              }
            }
          ]
        },
        {
          label: '快捷投诉',
          contentAfterBtn: [
            {
              btnText: '快捷投诉',
              content: '010-28871099',
              click: (ele) => {
                console.log('联系我们', ele)
              }
            }
          ]
        }
      ]
    }

  }
}
</script>

<style lang="scss" scoped>
.aboutSystem {
  height: inherit;
}
</style>
