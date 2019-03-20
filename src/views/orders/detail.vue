<template>
  <Page title="订单详情" :showHome="true" class="p-detail" :back="()=>$router.push('/orders')">
    <div v-if="dataReady">
      <Header :data="orderInfo"></Header>
      <OrderInfo :data="orderInfo"></OrderInfo>
    </div>
    <HotelInfo :data="hotelInfo"></HotelInfo>
  </Page>
</template>
<script>
import Header from './partials/Header'
import OrderInfo from './partials/OrderInfo'
import HotelInfo from './partials/HotelInfo'
import { orderApi } from '@/api'
export default {
  data() {
    return {
      dataReady: false,
      orderInfo: null,
      hotelInfo: null
    }
  },
  components: { Header, OrderInfo, HotelInfo },
  computed: {
    orderId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo() {
      orderApi.getOrderDetail(this.orderId).then(res => {
        this.dataReady = true
        this.orderInfo = res.data
        this.hotelInfo = res.data.orderHotel
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>

