<template>
  <Page title="我的订单" :showHome="true" class="p-orders" :back="()=>$router.push('/my')">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getDataList">
      <section class="orider" v-for="item in orderList" :key="item.id">
        <div @click="goDetail(item)">
          <div class="pick-info">
            <div>
              <h3>取车</h3>
              <p>{{item.fromStore}}</p>
              <p>{{item.fromTime | dateTime}}</p>
            </div>
            <div>
              <h3>还车</h3>
              <p>{{item.toStore}}</p>
              <p>{{item.toTime | dateTime}}</p>
            </div>
          </div>
          <div class="car-info">
            <img :src="item.orderGroup.coverUrl">
            <div>
              <h3>{{item.orderGroup.name}} · {{item.orderGroup.model}}</h3>
              <p>
                <span>或同组车型 ·</span>
                {{item.orderGroup.seats}}座 · {{item.orderGroup.doors}}门
              </p>
              <p>{{item.orderInsurance.name}}</p>
            </div>
          </div>
        </div>
        <div class="fee-info">
          <Price :number="item.amount" unit="CAD"></Price>
          <van-tag>{{item.status | status}}</van-tag>
        </div>
      </section>
    </van-list>
  </Page>
</template>
<script>
import { orderApi } from '@/api'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      orderList: []
    }
  },
  methods: {
    getDataList() {
      orderApi.getOrders().then(data => {
        console.log(data)
        this.loading = false
        this.orderList = data.list
        if (this.orderList.length == data.total) {
          this.finished = true
        }
      })
    },
    goDetail(order) {
      this.$router.push({ path: `/orderDetail/${order.id}` })
    }
  },
  filters: {
    status(s) {
      switch (Number(s)) {
        case 10:
          return '待支付'
        case 20:
          return '已支付'
        case 22:
          return '已取车'
        case 24:
          return '已完成'
        case 40:
          return '退款中'
        case 42:
          return '已退款'
      }
    }
  }
}
</script>
<style lang="less">
.p-orders {
  .orider {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px 15px;

    .pick-info {
      display: flex;
      padding-bottom: 5px;
      line-height: 1.5;

      h3 {
        font-size: 14px;
        font-weight: bold;
      }

      > div {
        flex: 1;
      }
    }

    .car-info {
      padding: 5px 0;
      border-top: @border;
      display: flex;
      font-size: 14px;

      img {
        width: 120px;
        height: 80px;
        object-fit: contain;
      }

      > div {
        margin-left: 10px;
        line-height: 24px;

        h3 {
          font-size: 14px;
        }

        p {
          color: rgba(0, 0, 0, 0.66);
        }
      }
    }

    .fee-info {
      display: flex;
      justify-content: space-between;
      padding-top: 5px;
      border-top: @border;
    }
  }
}
</style>
