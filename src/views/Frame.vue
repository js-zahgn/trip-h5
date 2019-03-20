<template>
  <div class="Frame">
    <div class="Frame-body">
      <slot></slot>
    </div>
    <van-tabbar v-model="currentTab">
      <van-tabbar-item
        v-for="tab in tabs"
        :to="tab.url"
        :icon="tab.icon"
        :key="tab.name"
      >{{tab.name}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Frame',
  props: {
    tab: Number
  },
  data() {
    return {
      tabs: [
        { name: '首页', icon: 'wap-home', url: '/' },
        { name: '我的', icon: 'contact', url: '/my' }
      ],
      currentTab: this.tab
    }
  }
}
</script>

<style lang="less">
.Frame {
  &-body {
    height: calc(100vh - 50px);
    padding-bottom: 50px;
    overflow-y: auto;
  }
}
</style>


