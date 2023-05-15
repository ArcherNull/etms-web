<!--
 * @Author: Null
 * @Date: 2021-12-02 00:06:47
-->
<template>
  <div class="appHeader-tagViews dk-bb-gray-5" :style="{ height: height }" flex>
    <!-- tabs -->
    <div class="appHeader-tagViews-tabs" flex-box="1">
      <div class="appHeader-tagViews-tabs__inner">
        <Contextmenu
          :visible.sync="contextmenuFlag"
          :x="contentmenuX"
          :y="contentmenuY"
        >
          <ContextmenuList
            :menulist="
              tagName === '/index' ? contextmenuListIndex : contextmenuList
            "
            @rowClick="contextmenuClick"
          />
        </Contextmenu>
        <el-tabs
          class="appHeader-tagViews-tabs__inner_tabs"
          :value="current"
          type="card"
          @tab-click="handleClick"
          @tab-remove="handleTabRemove"
          @contextmenu.native="handleContextmenu"
        >
          <el-tab-pane
            v-for="page in opened"
            :key="page.fullPath"
            :label="$t(`layout.sidebar.menu.${page.path || '/index'}`)"
            :name="page.fullPath"
            :closable="isTabClosable(page)"
          />
        </el-tabs>
      </div>
    </div>

    <!-- 最终的tabs操作 -->
    <div class="appHeader-tagViews-operation dk-b-gray-5" flex-box="0" flex>
      <!-- <MyToolTip :content="isCollectedPage?'取消收藏':'收藏'">
        <span class="tagViews-operation-btn dk-icon-btn dk-br-gray-5" @click="collectedPage">
          <SvgIcon :name="isCollectedPage?'star':'star-o'" />
        </span>
      </MyToolTip> -->

      <!-- <MyToolTip content="分享">
        <span class="tagViews-operation-btn dk-icon-btn dk-br-gray-5" @click="sharePage">
          <SvgIcon name="link" />
        </span>
      </MyToolTip> -->

      <!-- <MyToolTip :content="isLocakPage?'解锁':'锁定'">
        <span class="tagViews-operation-btn dk-icon-btn dk-br-gray-5" @click="lockPage">
          <SvgIcon :name="isLocakPage?'lock':'unlock'" />
        </span>
      </MyToolTip> -->

      <!-- <MyToolTip :content="isZoomInScreen?'缩小窗口':'放大窗口'">
        <span class="tagViews-operation-btn dk-icon-btn " @click="zoomInScreen">
          <SvgIcon :name="isZoomInScreen?'zoom-out-screen':'zoom-in-screen'" />
        </span>
      </MyToolTip> -->

      <MyToolTip content="刷新">
        <span
          class="tagViews-operation-btn dk-icon-btn dk-br-gray-5"
          @click="refreshPage"
        >
          <SvgIcon name="refresh" />
        </span>
      </MyToolTip>
      <MyToolTip content="关闭所有">
        <span
          class="tagViews-operation-btn dk-icon-btn dk-br-gray-5"
          @click="closeAllTags"
        >
          <SvgIcon name="closeAll" />
        </span>
      </MyToolTip>

      <!-- 页面快捷导航 -->
      <el-dropdown
        v-if="currentAnchorList && currentAnchorList.length"
        trigger="click"
        @click="closeAllTags"
        @command="(command) => handleCurrentPageAnchor(command)"
      >
        <MyToolTip content="快捷导航">
          <span
            class="tagViews-operation-btn dk-icon-btn dk-br-gray-5"
            @click="checkPageInfoList"
          >
            <SvgIcon name="tree-table" />
          </span>
        </MyToolTip>
        <el-dropdown-menu slot="dropdown" class="tagViews-operation-anchorMenu">
          <el-dropdown-item
            v-for="(item, index) in currentAnchorList"
            :key="index"
            class="tagViews-operation-anchorMenu__item"
            :command="item.id"
          >
            <el-badge :hidden="!item.tipsNum" :value="item.tipsNum" :max="99">
              {{ item.title }}
            </el-badge>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown
        trigger="click"
        @click="closeAllTags"
        @command="(command) => handleControlItemClick(command)"
      >
        <MyToolTip content="更多">
          <span class="tagViews-operation-btn dk-icon-btn dk-br-gray-5">
            <SvgIcon name="chevron-down" />
          </span>
        </MyToolTip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="left">
            <SvgIcon name="arrow-left" />
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item command="right">
            <SvgIcon name="arrow-right" />
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="other">
            <SvgIcon name="close" />
            关闭其它
          </el-dropdown-item>
          <el-dropdown-item command="all">
            <SvgIcon name="closeAll" />
            全部关闭
          </el-dropdown-item>
          <el-dropdown-item command="collectedPage">
            <SvgIcon :name="isCollectedPage ? 'star' : 'star-o'" />
            {{ isCollectedPage ? '取消收藏' : '收藏页面' }}
          </el-dropdown-item>
          <el-dropdown-item command="sharePage">
            <SvgIcon name="link" />
            分享页面
          </el-dropdown-item>
          <!-- <el-dropdown-item command="history">
            <SvgIcon name="history" />
            历史记录
          </el-dropdown-item> -->
          <el-dropdown-item command="message">
            <SvgIcon name="message" />
            消息盒子
          </el-dropdown-item>
          <el-dropdown-item command="lockPage">
            <SvgIcon :name="isLocakPage ? 'lock' : 'unlock'" />
            {{ isLocakPage ? '解锁页面' : '锁定页面' }}
          </el-dropdown-item>
          <el-dropdown-item command="zoomInScreen">
            <SvgIcon
              :name="isZoomInScreen ? 'zoom-out-screen' : 'zoom-in-screen'"
            />
            {{ isZoomInScreen ? '缩小窗口' : '放大窗口' }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import util from '@/libs/util'

export default {
  name: 'TagsView',
  components: {
    Contextmenu: () => import('../components/contextmenu/index.vue'),
    ContextmenuList: () =>
      import('../components/contextmenu/contentmenuList/index.vue')
  },
  props: {
    height: {
      type: String,
      default: '36px'
    }
  },
  data () {
    return {
      // 右键菜单面板显示和隐藏
      contextmenuFlag: false,
      // 右键菜单显示的X位置
      contentmenuX: 0,
      // 右键菜单显示的Y位置
      contentmenuY: 0,
      // 目标页面是首页显示的右键菜单栏
      contextmenuListIndex: [
        { icon: 'closeAll', title: '关闭全部', value: 'all' }
      ],
      // 目标页面是非首页显示的右键菜单栏
      contextmenuList: [
        { icon: 'refresh', title: '刷新', value: 'refresh' },
        { icon: 'cache', title: '缓存', value: 'keep-alive' },
        { icon: 'arrow-left', title: '关闭左侧', value: 'left' },
        { icon: 'arrow-right', title: '关闭右侧', value: 'right' },
        { icon: 'close', title: '关闭其它', value: 'other' },
        { icon: 'closeAll', title: '关闭全部', value: 'all' }
      ],
      tagName: '/index',
      // isZoomInScreen: false, // 是否放大窗口
      isCollectedPage: false, // 是否收藏当前页面
      isLocakPage: false // 是否锁定该窗口
    }
  },
  computed: {
    ...mapState('setting/tagViews', [
      'opened',
      'current',
      'isZoomInScreen',
      'currentAnchorList'
    ])
  },
  methods: {
    ...mapActions('setting/tagViews', [
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll',
      'refreshPage',
      'close'
    ]),
    ...mapMutations('setting/tagViews', ['SET_IS_ZOOM_IN_SCREEN']),
    /**
     * @description 计算某个标签页是否可关闭
     * @param {Object} page 其中一个标签页
     */
    isTabClosable (page) {
      return page.name !== 'index'
    },

    /**
     * @description 接收点击 tab 标签的事件
     * @param {object} tab 标签
     * @param {object} event 事件
     */
    handleClick (tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find((page) => page.fullPath === tab.name)
      if (page) {
        const { name, params, query } = page
        this.$router.push({ name, params, query })
      }
    },

    /**
     * @description 右键菜单的 row-click 事件
     * @param {String} command 事件类型
     */
    contextmenuClick (command) {
      this.handleControlItemClick(command, this.tagName)
    },

    /**
     * @description 接收点击关闭控制上选项的事件
     * @param {String} command 事件类型
     * @param {String} tagName tab 名称
     */
    handleControlItemClick (command, tagName = null) {
      if (tagName) this.contextmenuFlag = false
      const params = { pageSelect: tagName }
      switch (command) {
        case 'refresh':
          if (this.current === tagName) {
            this.refreshPage()
          } else {
            this.$router.push(tagName)
          }
          break
        case 'left':
          this.closeLeft(params)
          break
        case 'right':
          this.closeRight(params)
          break
        case 'other':
          this.closeOther(params)
          break
        case 'all':
          this.closeAll()
          break
        case 'collectedPage':
          this.collectedPage()
          break
        case 'sharePage':
          this.sharePage()
          break
        case 'message':
          console.log('前往消息盒子')
          this.$router.push({
            path: '/messageBox'
          })
          break
        case 'lockPage':
          this.lockPage()
          break
        case 'zoomInScreen':
          console.log('放大窗口')
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },

    /**
     * @description: 当前页面anchor锚点操作
     * @param {*} command
     * @return {*}
     */
    handleCurrentPageAnchor (command) {
      this.$commJs.pageScrollToAnchor(command)
    },

    /**
     * @description 点击 tab 上的删除按钮触发这里
     * @param {String} tagName tab 名称
     */
    handleTabRemove (tagName) {
      this.close({ tagName })
    },

    /**
     * @description 右键菜单功能点击
     * @param {Object} event 事件
     */
    handleContextmenu (event) {
      let target = event.target
      // fix https://github.com/d2-projects/d2-admin/issues/54
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    // 关闭所有
    closeAllTags () {
      console.log('关闭所有')
      this.closeAll()
    },
    // 放大窗口
    zoomInScreen () {
      // this.isZoomInScreen = !this.isZoomInScreen
      this.SET_IS_ZOOM_IN_SCREEN(!this.isZoomInScreen)
    },
    // 分享窗口
    sharePage () {
      console.log('分享窗口')
      // window.open(window.location.href)
      util.open(window.location.href)
    },
    // 锁定窗口
    lockPage () {
      console.log('锁定窗口')
      this.isLocakPage = !this.isLocakPage
    },
    // 收藏窗口
    collectedPage () {
      console.log('收藏窗口')
      this.$message.success(`${!this.isCollectedPage ? '' : '取消'}收藏页面成功`)
      this.isCollectedPage = !this.isCollectedPage
    },
    // 查看页面详情信息
    checkPageInfoList () {
      console.log('查看页面详情信息')
    }
  }
}
</script>

<style lang="scss" scoped>
.appHeader-tagViews {
  width: 100%;
  overflow: hidden;
  &-tabs {
    width: 60vw;
    .el-tabs__item {
      line-height: $layout-tagview-hegiht;
      height: $layout-tagview-hegiht;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      font-size: 16px;
      line-height: $layout-tagview-hegiht;
    }
  }
  &-operation {
    min-width: 0px;
    .tagViews-operation-btn {
      width: 36px;
      height: 100%;
    }
  }
}

.tagViews-operation-anchorMenu {
  max-height: 350px !important;
  overflow-y: scroll;
  overflow-x: hidden;
  &__item {
    position: relative;
  }
  &__alert {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}
</style>
