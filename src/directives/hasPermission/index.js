/*
 * @Author: Null
 * @Date: 2021-11-11 19:58:14
 * @Description: 按钮权限指令
 */

import store from '@/store'

function checkPermission (el, binding) {
  const { value } = binding
  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted (el, binding) {
    checkPermission(el, binding)
  },
  update (el, binding) {
    checkPermission(el, binding)
  }
}

// directives: {
//   clickoutside: {
//     // 初始化指令
//     bind (el, binding, vnode) {
//       function documentHandler (e) {
//         // 这里判断点击的元素是否是本身，是本身，则返回
//         if (el.contains(e.target)) {
//           return false
//         }
//         // 判断指令中是否绑定了函数
//         if (binding.expression) {
//           // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
//           binding.value(e)
//         }
//       }
//       // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
//       el.__vueClickOutside__ = documentHandler
//       document.addEventListener('click', documentHandler)
//     },
//     update () {},
//     unbind (el, binding) {
//       // 解除事件监听
//       document.removeEventListener('click', el.__vueClickOutside__)
//       delete el.__vueClickOutside__
//     }
//   }
// },
