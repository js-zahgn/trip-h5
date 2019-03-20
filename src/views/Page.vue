<template>
  <div class="Page">
    <van-nav-bar
      :title="title"
      left-text="返回"
      :right-text="showHome?'首页':''"
      left-arrow
      @click-left="goBack"
      @click-right="$router.push('/')"
    />
    <div class="Page-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    title: String,
    back: Function,
    showHome: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      if (this.back) this.back()
      else this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.Page {
  padding-top: 46px;
  .van-nav-bar {
    z-index: 99999;
    position: fixed;
    top: 0;
    width: 100%;
  }
  &-body {
    height: calc(100vh - 46px);
    overflow-y: auto;
  }
}
</style>

