<template>
  <div class="HotkeysDiaItem">
    <DisplayText :display-text="hotkeysItem">
      <div
        v-if="hotkeysItem && hotkeysItem.slotList && hotkeysItem.slotList.length"
        slot="content"
        class="HotkeysDiaItem_container"
      >
        <div
          v-for="(citem, cindex) in hotkeysItem.slotList"
          :key="`slot-${cindex}`"
          :class="[
            'HotkeysDiaItem_container--item',
            selectedHotkeys.includes(citem)
              ? 'HotkeysDiaItem-active'
              : 'HotkeysDiaItem-unactive'
          ]"
          @click="selectHotkeys(citem, hotkeysItem)"
        >
          {{ citem }}
        </div>
        <MyButton
          v-for="(citem, cindex) in hotkeysItem.btnList"
          :key="`btn-${cindex}`"
          class="dk-mr-4"
          :icon="citem.icon"
          :type="citem.type"
        >
          {{ citem.btnText }}
        </MyButton>
      </div>
    </DisplayText>
  </div>
</template>

<script>
export default {
  name: 'HotkeysDiaItem',
  props: {
    hotkeysItem: {
      type: Object,
      default () {
        return {}
      }
    },
    selectedHotkeys: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      displayText: {
        title: '标题',
        content: '标题标题标题',
        helpMessage: '标题标题'
      }
    }
  },
  methods: {
    selectHotkeys (citem, hotkeysItem) {
      console.log('citem ,hotkeysItem', { citem, hotkeysItem })
    }
  }
}
</script>
<style lang="scss" scoped>
.HotkeysDiaItem {
  margin-bottom: 8px;
  &_container {
    &--item {
      display: inline-block;
      margin:0px 8px 8px 0;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: $color-primary;
        transform: scale(1.2);
        border: solid 1px $color-primary-3;
        background: $color-primary-4;
      }
    }
  }
  &-unactive {
    color: $color-text-placehoder;
    background: $color-content-bg;
    border: solid 1px $color-border-5;
  }
  &-active {
    color: $color-primary;
    border: solid 1px $color-primary-3;
    background: $color-primary-4;
  }
}
</style>
