<template>
  <div class="Paid">
    <section>
      <h3>支付成功</h3>
      <p>预定酒店可享7折优惠</p>
      <div class="buttons">
        <van-button
          class="button"
          type="danger"
          plain
          @click="$router.push(`/hotels/${orderId}`)"
        >预定酒店</van-button>
        <van-button
          class="button"
          type="danger"
          @click="$router.push(`/orderDetail/${orderId}`)"
        >订单详情</van-button>
      </div>
    </section>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data() {
    return {
      order: store.state.order
    }
  },
  computed: {
    orderId() {
      return this.$route.params.orderId
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.Paid {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 100vh;

  section {
    line-height: 50px;
    text-align: center;
    width: 100%;

    h3 {
      font-weight: 600;
      line-height: 30px;
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      color: #aaa;
      font-size: 16px;
      margin-bottom: 100px;
    }

    .buttons {
      display: flex;
      justify-content: space-around;

      button {
        width: 40%;
      }

      // span:last-child {
      //   color: $color-orange;
      // }
    }
  }
}
</style>

