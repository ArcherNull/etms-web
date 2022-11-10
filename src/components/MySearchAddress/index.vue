<!--
 * @Author: Null
 * @Date: 2022-06-23 08:38:47
 * @Description: 地址搜索下拉框
-->
<template>
  <div class="MySearchAddress">
    <div class="MySearchAddress-searchBox" flex="cross:center main:center">
      <el-input v-model="bKeyword" class="MySearchAddress-searchBox__input" clearable />
      <MyButton :icon="showMap? 'el-icon-arrow-up':'el-icon-arrow-down'" @click="showMap = !showMap" />
    </div>
    <div v-show="bKeyword && showMap" class="MySearchAddress-map">
      <MyBaiduMap
        :type="type"
        :location="bLocation"
        :keyword="bKeyword"
        @resultshtmlset="resultshtmlset"
        @searchcomplete="searchcomplete"
        @markersset="markersset"
        @infohtmlset="infohtmlset"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySearchAddress',
  components: {
    MyBaiduMap: () => import('./components/MyBaiduMap.vue'),
    MyButton: () => import('@/components/MyButton/index.vue')
  },
  props: {
    // String, Point, None 	location表示检索区域，其类型可为空、坐标点或城市名称的字符串。当参数为空时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行。
    location: {
      type: [String, Object],
      default: '深圳龙岗'
    },
    // String, Array 搜索关键字。当keyword为数组时将同时执行多关键字的查询，最多支持10个关键字
    keyword: {
      type: [String, Array],
      default: '街道'
    },
    // searchMap 表示有搜索下拉框的地图 ； search 表示只有搜索下拉框；  map表示只有地图
    type: {
      type: String,
      default: 'searchMap'
    }
  },
  data () {
    return {
      bKeyword: '',
      showMap: true // 是否展示地图
    }
  },
  computed: {
    bLocation () {
      return this.location || '深圳'
    }
  },
  watch: {
    keyword: {
      handler (newVal) {
        if (newVal) {
          console.log('获取得到新值====>', newVal)
          this.bKeyword = newVal
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description: 结果列表添加完成后的回调函数
     * @param {*} ele
     * @return {*}
     */
    resultshtmlset (ele) {
      console.log('结果列表添加完成后的回调函数=====>', ele)
    },

    /**
     * @description: 检索完成后的回调函数。如果是多关键字检索，回调函数参数返回一个LocalResult的数组，数组中的结果顺序和检索中多关键字数组中顺序一致
     * @param {*} ele
     * @return {*}
     */
    searchcomplete (ele) {
      console.log('检索完成后的回调函数=====>', ele)
    },

    /**
     * @description: 标注添加完成后的回调函数
     * @param {*} ele
     * @return {*}
     */
    markersset (ele) {
      console.log('标注添加完成后的回调函数=====>', ele)
    },

    /**
     * @description: 标注气泡内容创建后的回调函数
     * @param {*} ele
     * @return {*}
     */
    infohtmlset (ele) {
      console.log('标注气泡内容创建后的回调函数=====>', ele)
      this.bKeyword = ele.address
    }
  }
}
</script>

<style lang="scss" scoped>
.MySearchAddress {
  position: relative;
  width: $baiduMapSearchBoxWidth;
  &-searchBox {
    margin-bottom: 4px;
  }
  &-map {
    width: 100%;
    position: absolute;
    background: #fff;
    z-index: 10;
  }
}
</style>
