<!--
 * @Author: Null
 * @Date: 2022-03-05 09:39:57
 * @Description: 设置--系统主题
-->

<template>
  <div>
    <FirstTitle :is-show-title-bg="false" title="系统主题">
      <div slot="content">
        <MyForm :register="systemFormRegister" />
      </div>
    </FirstTitle>

    <FirstTitle :is-show-title-bg="false" title="推荐主题">
      <div slot="content">
        <MyForm :register="themeFormRegister" />
      </div>
    </FirstTitle>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapActions, mapMutations } from 'vuex'

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
      systemFormRegister: {
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
      },
      // 推荐主题
      themeFormRegister: {
        formSchemas: [{
          label: '主题',
          component: 'select',
          selectList: store.state.setting.theme.themeList,
          defaultValue: store.state.setting.theme.theme,
          field: 'theme',
          change: (ele, item) => {
            item.defaultValue = ele
            this.SET_THEME_LIST(ele)
          }
        }]
      }
    }
  },
  methods: {
    ...mapActions('setting/theme', ['set']),
    ...mapMutations('setting/theme', ['SET_THEME_LIST']),

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
