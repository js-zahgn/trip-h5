<template>
  <transition :name="animate">
    <router-view class="App"/>
  </transition>
</template>

<script>
import store from "../store";
export default {
  name: "App",
  data() {
    return {
      animate: ""
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (to.path == "/") {
        this.animate = "slide-right";
      } else if (from.path == "/") {
        this.animate = "slide-left";
      } else {
        this.animate = toDepth < fromDepth ? "slide-right" : "slide-left";
      }
    }
  },
  async mounted() {
    await store.getSetStores();
  }
};
</script>

<style lang="less">
.App {
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease-out;
}
</style>


