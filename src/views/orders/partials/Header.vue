<template>
  <div class="p-detail-Header">
    <div class="left">
      <p>{{orderInfo.fromStore}}</p>
      <span>{{orderInfo.fromTime | day}} {{orderInfo.fromTime | time}}</span>
    </div>
    <div class="mid">
      <b></b>
      <span>{{orderInfo.days}}天</span>
      <b></b>
    </div>
    <div class="right">
      <p>{{orderInfo.toStore}}</p>
      <span>{{orderInfo.toTime | day}} {{orderInfo.toTime | time}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      orderInfo: this.data
    }
  }
}
</script>
<style lang="less" scoped>
.p-detail-Header {
  background-color: @color-dark-orange;
  color: #fff;
  display: flex;
  padding: 12px;
  font-size: 16px;

  > div {
    flex: 1;
    text-align: center;

    p {
      line-height: 30px;
    }
  }

  .mid {
    display: flex;
    align-items: center;
    justify-content: center;

    b {
      display: inline-block;
      width: 25px;
      height: 1px;
      background-color: #fff;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border: 1px solid #fff;
      border-radius: 50%;
    }
  }
}
</style>

