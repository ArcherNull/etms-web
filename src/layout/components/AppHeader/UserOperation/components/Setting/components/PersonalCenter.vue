<!--
 * @Author: Null
 * @Date: 2022-03-21 16:09:00
 * @Description: 设置--个人中心
-->

<template>
  <div class="PersonalCenter borderRed" flex="dir:top cross:stretch main:justify">
    <!-- 顶部用户信息 -->
    <div class="PersonalCenter-top" flex="main:justify cross:stretch box:last">
      <div class="PersonalCenter-top__left " flex>
        <div class="PersonalCenter-top__left-userImg" flex="cross:center">
          <MyImage
            class="PersonalCenter-top__left-userImg-img"
            :src="srcList[0]"
            :preview-src-list="srcList"
          />
        </div>
        <div
          class="PersonalCenter-top__left-userInfo"
          flex="dir:top main:justify"
        >
          <div class="PersonalCenter-top__left-userInfo-main " flex="dir:top main:justify">
            <div class="userInfo-item">
              <div class="userInfo-item-1 dk-f1-title text-ellipsis-1" :title="userInfo.username" @dblclick="copyContent(userInfo.username)">
                {{ userInfo.username }}
              </div>
            </div>
            <LabelText title="所属公司：" :content="userInfo.companyName" />
            <LabelText title="手机号：" :content="userInfo.phone" />
            <LabelText title="所属项目部：" :content="userInfo.organization" />
          </div>
        </div>
      </div>

      <div class="PersonalCenter-top__right" flex="dir:top main:justify cross:bottom">
        <div class="PersonalCenter-top__right-top">
          <div class="PersonalCenter-top__right-top-power">
            <SvgIcon name="safe" />
          </div>
          <div class="PersonalCenter-top__right-top-secret">
            <SvgIcon name="safe" />
          </div>
        </div>
        <div class="PersonalCenter-top__right-qr">
          <SvgIcon name="qr-code" />
        </div>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="PersonalCenter-content borderRed">content</div>

    <div class="PersonalCenter-footer borderRed">footer</div>
  </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  data () {
    return {
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      ],
      userInfo: {
        username:
          ' 测试用那个是发射点发射点发射点发发生发射点发顺丰温柔温热温热认为发生的发发生发射点发顺丰温柔温热温热认为发生的',
        loginName: 'dk19860',
        companyName: '供应链一部',
        phone: '15825415256',
        organization: '事业一部/项目组三组/项目部二部'
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.PersonalCenter {
  width: 100%;
  height: 100%;
  &-top {
    &__left {
      &-userImg {
        &-img {
          border-radius: 50%;
          border: solid 5px $color-primary-2;
        }
      }
      &-userInfo {
        &-main {
          padding: 4px;
          margin-left: 10px;
          height: 100%;
          .userInfo-item {
            &-1{
              margin-bottom: 5px;
            }
            &-1 {
              min-width: 0px;
            }
          }
        }
      }
    }
    &__right {
      width: 100px;
    }
  }
  &-content{
    height: calc(100vh - 255px);
  }
  &-footer{
    height: 40px;
  }
}
</style>

