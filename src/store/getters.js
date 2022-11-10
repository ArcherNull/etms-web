/*
 * @Author: Null
 * @Date: 2021-11-22 23:29:36
 * getter文件,相当于computed , 是多个数据处理后的结果，这里我把所有的模块的getters集成为一个
 * 目的是方便查找
 */

const dimensionUnit = 'px' // 尺寸 ， px 与rem

// 布局尺寸--相关计算值
const layoutSize = {
  // 菜单栏是否折叠
  menubarIsFold: (state) => state.setting.layout.menubarIsFold,

  /* **********************布局尺寸 **************************/
  // 布局尺寸--侧边栏--宽度
  sidebarWidth: (state) => state.setting.layout.sidebarWidth + dimensionUnit,
  // 布局尺寸--侧边栏--logo高度
  logoHeight: (state) =>
    state.setting.layout.sidebarHeight.logoHeight + dimensionUnit,
  // 布局尺寸--侧边栏--菜单搜索栏高度
  menuSearchHeight: (state) =>
    state.setting.layout.sidebarHeight.menuHeight.menuSearchHeight +
    dimensionUnit,
  // 布局尺寸--侧边栏--存在子菜单，点击不可跳转的菜单项【不可用】
  menuParentLevelHeight: (state) =>
    state.setting.layout.sidebarHeight.menuHeight.menuParentLevelHeight +
    dimensionUnit,
  // 布局尺寸--侧边栏--无子级点击可跳转的菜单项
  menuChildrenLevelHeight: (state) =>
    state.setting.layout.sidebarHeight.menuHeight.menuChildrenLevelHeight +
    dimensionUnit,
  // 布局尺寸--侧边栏--菜单栏总高度
  menuTotalHeight: (state) =>
    state.setting.layout.sidebarHeight.menuHeight.menuTotalHeight -
    state.setting.layout.sidebarHeight.logoHeight -
    state.setting.layout.sidebarHeight.settingHeight +
    dimensionUnit,
  // 布局尺寸--侧边栏--底部设置高度

  settingHeight: (state) =>
    state.setting.layout.sidebarHeight.settingHeight + dimensionUnit,
  // 布局尺寸--头部--总高度
  headerHeight: (state) =>
    state.setting.layout.headerStyle.navBoxHeight +
    state.setting.layout.headerStyle.tagsViewsHeight +
    dimensionUnit,
  // 布局尺寸--头部--面包屑导航栏高度
  navBoxHeight: (state) =>
    state.setting.layout.headerStyle.navBoxHeight + dimensionUnit,
  // 布局尺寸--头部--标签导航导航栏高度
  tagsViewsHeight: (state) =>
    state.setting.layout.headerStyle.tagsViewsHeight + dimensionUnit
}

// 布局颜色
const layoutColor = {
  // 布局尺寸--侧边栏--菜单栏背景颜色
  menuBgColor: (state) => state.setting.layout.menuColor.menuBgColor,
  // 布局尺寸--侧边栏--菜单栏文本
  menuTextColor: (state) => state.setting.layout.menuColor.menuTextColor,
  // 布局尺寸--侧边栏--被选中的文本颜色
  menuActiveTextColor: (state) =>
    state.setting.layout.menuColor.menuActiveTextColor
}

// 前端日志打印相关
const logs = {
  // 返回现存 log (all) 的条数
  logsLength: (state) => state.setting.log.length,
  // 返回现存 log (error) 的条数
  logsLengthOfError: (state) => state.setting.log.filter((log) => log.type === 'danger').length
}

// 当前登录用户的权限
const permissions = {
  btnPermissions: (state) => state.setting.log.length
}

const getters = {
  getters_count: (state) => state.user.login.count + 10,

  // 布局尺寸--相关计算值
  ...layoutSize,
  // 布局颜色
  ...layoutColor,
  // 前端日志打印相关
  ...logs,
  // 当前登录用户的权限
  ...permissions
}

export default getters
