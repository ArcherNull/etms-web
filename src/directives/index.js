/*
 * @Author: Null
 * @Date: 2022-05-07 08:48:54
 * @Description: 全局指令注册
 */
import myLoading from './myLoading'
import hasPermission from './hasPermission'
import waves from './waves'
import elDragDialog from './elDragDialog'
import dialogDrag from './dialogDrag'

export default {
  install (Vue) {
    // 自定义loading指令
    Vue.directive('myLoading', myLoading)
    // 自定义权限码指令
    Vue.directive('hasPermission', hasPermission)
    // 波浪样式
    Vue.directive('waves', waves)
    // 拖拽 el-dialog
    Vue.directive('elDragDialog', elDragDialog)
    // 拖拽 el-dialog
    Vue.directive('dialogDrag', dialogDrag)
  }
}
