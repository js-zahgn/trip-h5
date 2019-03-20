<template>
  <ul class="Home-Shortcuts">
    <li>
      <van-icon name="notes-o"/>
      <span>租车须知</span>
    </li>
    <li>
      <van-icon name="description"/>
      <span>租车流程</span>
    </li>
    <li>
      <van-icon name="records"/>
      <span>保险说明</span>
    </li>
  </ul>
</template>

<script>
export default {
}
</script>


<style lang="less">
.Home-Shortcuts {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  padding: @vertical-gap 0;
  margin: @vertical-gap @screen-gap;
  border-radius: 5px;

  > li {
    display: flex;
    align-items: center;
    flex-direction: column;

    >i {
      font-size: 40px;
      color: @color-orange;
    }

    span {
      margin-top: 5px;
    }
  }
}
</style>

