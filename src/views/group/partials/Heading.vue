<template>
  <div class="Heading">
    <div class="left">
      <p>{{order.fromStoreName}}</p>
      <time>{{order.fromTime | dateFormat}}</time>
    </div>
    <div class="mid">
      <b></b>
      <span>{{order.days}}天</span>
      <b></b>
    </div>
    <div class="right">
      <p>{{order.toStoreName}}</p>
      <time>{{order.toTime | dateFormat}}</time>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    stores() {
      return store.state.stores;
    },
    order() {
      return store.state.order;
    }
  },

  filters: {
    dateFormat(d) {
      const _num = n => (n < 10 ? `0${n}` : n);
      let n = new Date(d);
      return `${_num(n.getMonth() + 1)}-${_num(n.getDate())} ${_num(
        n.getHours()
      )}:${_num(n.getMinutes())}`;
    }
  }
};
</script>


<style lang="less" scoped>
.Heading {
  margin-top: -1px;
  background-color: @color-dark-orange;
  color: #fff;
  display: flex;
  padding: 12px 10px;

  .left,
  .right {
    flex: 1;
    text-align: center;
    font-size: 16px;

    > p {
      font-size: 16px;
      margin-bottom: 6px;
      font-weight: bold;
    }
  }

  .mid {
    display: flex;
    align-items: center;
    justify-content: center;

    b {
      display: inline-block;
      width: 20px;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.5);
    }

    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      color: rgba(255, 255, 255, 0.8);
      margin-top: -2px;
    }
  }
}
</style>

