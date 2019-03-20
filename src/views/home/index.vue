<template>
  <Frame :tab="0" class="Home">
    <div class="banner"></div>
    <PickForm/>
    <Shortcuts/>
    <div class="hot-line">400-888-8888</div>
  </Frame>
</template>

<script>
import PickForm from './partials/PickForm'
import Shortcuts from './partials/Shortcuts'

export default {
  components: { PickForm, Shortcuts }
}
</script>

<style lang="less">
.Home {
  .banner {
    width: 100%;
    height: 135px;
    background-color: @color-orange;
  }

  .hot-line {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: @vertical-gap 0;
  }
}
</style>

