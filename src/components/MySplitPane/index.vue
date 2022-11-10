<!--
 * @Author: Null
 * @Date: 2022-04-22 11:24:19
 * @Description: 分割线
-->
<template>
  <div class="MySplitPane">
    <split-pane :min-percent="4" split="vertical" @resize="resize">
      <template slot="paneL">
        A
      </template>

      <template slot="paneR">
        <split-pane :min-percent="4" split="horizontal">
          <template slot="paneL">
            B
          </template>
          <template slot="paneR">
            <split-pane split="vertical" :default-percent="30" @resize="resize">
              <template slot="paneL">
                C
              </template>

              <template slot="paneR">
                D
              </template>
            </split-pane>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
export default {
  name: 'MySplitPane',
  methods: {
    resize () {
      console.log('resize')
    }
  }
}
</script>

<style lang="scss" scoped>
.MySplitPane{
  width: 100%;
  height: 250px;
  @extend %card;
}
</style>
