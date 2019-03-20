<template>
  <div class="p-order-detail">
    <div class="basic-info">
      <div class="car">
        <img :src="order.orderGroup.coverUrl" alt>
        <div class="detail">
          <h3>{{order.orderGroup.name}} · {{order.orderGroup.model}}</h3>
          <p>
            <span>或同组车型 ·</span>
            {{order.orderGroup.seats}}座 · {{order.orderGroup.doors}}门
          </p>
          <p>{{order.orderGroup.intro}}</p>
        </div>
      </div>
      <section class="insurance">
        <h3>{{order.orderInsurance.name}}</h3>
        <p>{{order.orderInsurance.include}}</p>
      </section>
    </div>

    <div class="order">
      <section>
        <p>
          <span>订单编号：</span>
          <span>{{order.id}}</span>
        </p>
        <p>
          <span>下单时间：</span>
          <span>{{order.createdAt | dateTime}}</span>
        </p>
      </section>
      <section v-if="order.status != 10">
        <p>
          <span>支付方式：</span>
          <span>微信支付</span>
        </p>
        <p>
          <span>支付时间：</span>
          <span>{{order.createdAt | dateTime}}</span>
        </p>
      </section>
    </div>
    <div class="costInfo">
      <section>
        <b>车辆租金</b>
        <Price :number="order.orderGroup.price" :unit="'CAD x '+order.days"/>
      </section>
      <section>
        <b>保险套餐</b>
        <Price :number="order.orderInsurance.price" :unit="'CAD x '+order.days"/>
      </section>
      <section v-for="charge in order.orderCharges" :key="charge.id">
        <b>{{charge.name}}</b>
        <Price :number="charge.price" :unit="'CAD x '+ (charge.unit==1? 1: order.days)"/>
      </section>
      <div class="total" :class="{paid: order.status!=10}">合计：
        <Price :number="order.amount" unit="CAD"/>
      </div>
    </div>
    <van-button class="pay-button" type="danger" @click="goPay" v-if="order.status == 10">去支付</van-button>
  </div>
</template>
<script>
import store from '@/store'
export default {
  props: ['data'],
  computed: {
    order() {
      return this.data
    }
  },
  methods: {
    goPay() {
      // store.updateOrder(this.order)
    }
  }
}
</script>
<style lang="less">
.p-order-detail {
  .basic-info {
    padding: 10px;
    background-color: #fff;
    h3 {
      font-size: 14px;
    }

    .car {
      display: flex;
      font-size: 14px;
      padding-bottom: 15px;

      img {
        width: 130px;
        height: 80px;
        object-fit: contain;
      }

      > div {
        margin-left: 10px;
        line-height: 26px;

        p {
          color: rgba(0, 0, 0, 0.66);
        }
      }
    }

    .insurance {
      padding-top: 10px;
      border-top: @border;
      line-height: 20px;

      p {
        font-size: 14px;
        color: @color-grey;
      }
    }
  }

  .order {
    margin-top: 20px;
    background-color: #fff;
    padding: 0 10px;
    font-size: 15px;

    section {
      p {
        padding: 15px 0;
      }

      p + p {
        padding-top: 0;
      }
    }

    section + section {
      border-top: @border;
    }
  }

  .costInfo {
    margin-top: 20px;
    background-color: #fff;
    padding: 5px 10px;
    font-size: 15px;
    line-height: 30px;

    section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      b,
      span {
        font-weight: 600;
      }
    }

    .total {
      text-align: right;
      border-top: @border;
    }
  }
  .pay-button {
    width: 50%;
    display: block;
    margin: 15px auto;
  }
}
</style>
