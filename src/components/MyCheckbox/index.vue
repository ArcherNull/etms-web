<!--
 * @Author: Null
 * @Date: 2022-02-19 11:20:56
 * @Description:
-->

<template>
  <div class="myCheckbox-container">
    <div
      :class="[
        'myCheckbox',
        disabled ? 'myCheckbox__disabled' : 'myCheckbox__enable'
      ]"
    >
      <!-- 复选框 -->
      <span
        :class="[
          'myCheckbox-checkbox',
          selected
            ? 'myCheckbox-checkbox__selected'
            : 'myCheckbox-checkbox__unselected'
        ]"
      />
      <span :class="['myCheckbox-label' , selected?'myCheckbox-label__selected':'myCheckbox-label__unselected' ]">
        <slot>
          <span class="myCheckbox-label__text"> {{ label }} </span>
        </slot>
        <span class="myCheckbox-label__clear" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCheckbox',
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.myCheckbox-container {
  display: inline-block;
  .myCheckbox {
    $checkbox-widht: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    user-select: none;
    cursor: pointer;
    margin-right: 16px;
    &-checkbox {
      display: inline-block;
      margin-right: 5px;
      &__unselected {
        width: $checkbox-widht;
        height: $checkbox-widht;
        border: solid 1px $color-border-5;
        border-radius: 2px;
      }
      &__selected {
        width: $checkbox-widht;
        height: $checkbox-widht;
        background-color: $color-primary;
        border-radius: 2px;
        position: relative;
        color: $color-primary;
        &::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 9px;
          height: 5px;
          display: inline-block;
          border: 1.5px solid #fff;
          border-width: 0 0 2px 2px;
          transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          vertical-align: baseline;
        }
      }
    }
    &-label {
      height: $checkbox-widht;
      font-size: 14px;
      min-width: 70px;
      word-break: keep-all;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &__clear {
        margin-left: 6px;
        display: inline-block;
        width: 12px;
        height: 2px;
        background: $color-primary-1;
        line-height: 0;
        font-size: 0;
        vertical-align: middle;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        &:after {
          content: '/';
          display: block;
          width: 12px;
          height: 2px;

          background: $color-primary-1;
          transform: rotate(-90deg);
          -ms-transform: rotate(-90deg);
          -moz-transform: rotate(-90deg);
          -webkit-transform: rotate(-90deg);
          -o-transform: rotate(-90deg);
        }
      }
    }
  }
}

.myCheckbox__disabled {
  color: $color-text-placehoder;
}
.myCheckbox__enable {
    color: #333;
}
span[class='myCheckbox']:disabled {
  color: #f00;
}
</style>
