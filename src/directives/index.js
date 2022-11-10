import hasPermission from './hasPermission'
import waves from './waves'
import elDragDialog from './elDragDialog'

export default {
  install (Vue) {
    // 自定义权限码指令
    Vue.directive('hasPermission', hasPermission)
    // 波浪样式
    Vue.directive('waves', waves)
    // 拖拽 el-dialog
    Vue.directive('elDragDialog', elDragDialog)
  }
}
