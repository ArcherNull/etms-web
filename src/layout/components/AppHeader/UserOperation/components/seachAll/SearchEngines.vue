<!--
 * @Author: Null
 * @Date: 2022-05-12 18:56:04
 * @Description:
-->
<template>
  <div class="SearchEngines">
    <!-- 顶部提示选择 -->
    <div class="SearchEngines-header" flex="main:justify cross:center">
      <!-- 筛选项 -->
      <div class="SearchEngines-header-filter" flex="cross:center">
        <div v-for="(item,index) in filterLeftList" :key="index" class="SearchEngines-header-filter__item">
          {{ item.title }}
        </div>
      </div>

      <!-- 筛选项 -->
      <div class="SearchEngines-header-filter" flex="main:right cross:center">
        <div v-for="(item,index) in filterRightList" :key="index" class="SearchEngines-header-filter__item">
          {{ item.title }}
        </div>
      </div>
    </div>
    <!-- 搜索输入框 -->
    <div class="SearchEngines-main dk-p-16" flex="main:center cross:center dir:top">
      <div class="SearchEngines-main__logo">
        <img :src="image" alt="logo">
      </div>
      <div class="SearchEngines-main__searchInput dk-mt-16">
        <MySearchInput />
      </div>
    </div>
    <!-- 底部建议输入，搜索展示的结果 -->
    <div class="SearchEngines-footer">
      <SearchEnginesFrame />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchEngines',
  components: {
    SearchEnginesFrame: () => import('./components/SearchEnginesFrame.vue')
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('element/elEmpty', ['image']),
    ...mapState('searchAll/searchEngines', ['filterLeftList', 'filterRightList'])
  }
}
</script>

<style lang="scss" scoped>
.SearchEngines{
    &-header{
        &-filter{
            &__item{
                margin-right: 8px;
                color: $color-primary;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    &-main{
        &__logo{
            img{
                width: 180px;
                height: 100px;
                object-fit: contain;
            }

        }
        &__searchInput{

        }
    }
    &-footer{

    }
}
</style>
