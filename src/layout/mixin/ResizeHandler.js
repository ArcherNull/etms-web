/*
 * @Author: Null
 * @Date: 2021-11-11 19:57:16
 * @Description:
 */

import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route (route) {
      if (this.device === 'mobile' && store.state.setting.layout.menubarIsFold) {
        console.log('当前设备是mobild , 需要关闭sidebar')
        store.dispatch('setting/layout/foldMenuBar', true)
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted () {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('user/userInfo/setDeviceInfo', 'mobile')
      store.dispatch('setting/layout/foldMenuBar', true)
    }
  },
  methods: {
    $_isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        const clientRect = body.getBoundingClientRect()
        const currentHeight = clientRect.height
        const currentWidth = clientRect.width
        console.log('调整的高/宽', currentHeight, currentWidth)
        store.dispatch('user/userInfo/setDeviceInfo', isMobile ? 'mobile' : 'desktop')
        store.dispatch('setting/layout/setSidebarHeight', currentHeight)
        // console.log('当前设备是mobild , 需要关闭sidebar')
        store.dispatch('setting/layout/foldMenuBar', true)
      }
    }
  }
}

