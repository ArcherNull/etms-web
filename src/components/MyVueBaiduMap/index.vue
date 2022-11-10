<!--
 * @Author: Null
 * @Date: 2022-05-06 17:19:33
 * @Description: 百度地图
-->
<template>
  <baidu-map class="MyVueBaiduMap" :center="center" :zoom="zoom" @ready="handler">
    <!-- 在右上角加入比例尺控件 -->
    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT" />

    <!-- 在右上角加入缩放控件  -->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />

    <!-- 在地图左上角加入地图类型控件 -->
    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT" />

    <!-- 在地图右下角加入缩略图控件 -->
    <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :is-open="true" />

    <!-- 在地图右下角加入定位控件 -->
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />

    <!-- 在地图右上角加入版权信息控件 -->
    <bm-copyright
      anchor="BMAP_ANCHOR_TOP_RIGHT"
      :copyright="[{id: 1, content: 'Copyright Message', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a>我是版权信息</a>'}]"
    />

    <!-- 在地图左上角加入城市切换控件 -->
    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT" />

    <!-- 插入全景控件 -->
    <bm-panorama />

    <!-- 地图上的按钮  DistanceTool  -->
    <bm-control>
      <button @click="openDistanceTool">开启测距</button>
    </bm-control>

    <!-- 在 BmMarker 组件中插入一个上下文菜单 -->
    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true">
      <bm-context-menu>
        <bm-context-menu-item :callback="getPosition" text="获取坐标" />
      </bm-context-menu>
    </bm-marker>
  </baidu-map>
</template>
<script>
export default {
  name: 'MyVueBaiduMap',
  data () {
    return {
      center: { lng: 0, lat: 0 }, // 北京
      zoom: 3
    }
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
    // 开始测距
    openDistanceTool () {
      console.log('开始测距')
    },
    // 回调函数
    getPosition () {
      console.log('回调函数')
    }
  }
}
</script>
<style lang="scss" scoped>
.MyVueBaiduMap{
  width: 100%;
  height: 500px;
}
</style>
