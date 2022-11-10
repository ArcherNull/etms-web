<!--
 * @Author: Null
 * @Date: 2022-03-05 09:39:57
 * @Description: 设置--系统主题
-->

<template>
  <div>
    <FirstTitle :is-show-title-bg="false" title="系统主题">
      <div slot="content">
        <MyForm :register="systemformRegister" />
      </div>
    </FirstTitle>

    <FirstTitle :is-show-title-bg="false" title="推荐主题">
      <div slot="content">
        12412
      </div>
    </FirstTitle>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import setting from '@/setting'

export default {
  name: 'SystemTheme',

  data () {
    return {
      // 主题数据
      themeTableData: [
        {
          themeName: '经典',
          themeImage: '',
          operations: ''
        }, {
          themeName: '紫罗兰',
          themeImage: '',
          operations: ''
        }, {
          themeName: '简约线条',
          themeImage: '',
          operations: '操作'
        }
      ],
      // 系统主题
      systemformRegister: {
        formSchemas: [{
          label: '系统主题色',
          component: 'myColorPicker',
          defaultValue: '#409EFF',
          field: 'theme',
          change: (ele, item) => {
            item.defaultValue = ele
            this.changeTheme(ele)
          }
        }]
      }
    }
  },
  computed: {
    systemInfoList () {
      return [
        {
          label: '主题色',
          content: setting.name
        }
      ]
    }
  },
  methods: {
    ...mapActions('setting/theme', ['set']),
    setSystemTheme () {},
    // 更换颜色
    changeTheme (color) {
      console.log('color=====>', color)
      this.set(color)
    }
  }
}
</script>

<style lang="scss" scoped></style>
