<template>
  <Page title="选择酒店" class="hotelList">
    <div class="content">
      <Hotel v-for="hotel in hotelList" @goBook="goBookHotel" :data="hotel" :isList="true" :key="hotel.id"></Hotel>
    </div>
  </Page>
</template>
<script>
import { hotelApi } from '@/api'
import store from '@/store'
import Hotel from './partials/Hotel'
export default {
  name: 'hotels',
  data() {
    return {
      hotelList: []
    }
  },
  components: { Hotel },
  mounted() {
    store.state.hotel = null
    this.getHotel()
  },
  methods: {
    async getHotel() {
      const data = await hotelApi.getHotels()
      this.hotelList = data.list
    },
    goBookHotel(hotel) {
      store.state.hotel = hotel
      this.$router.push(`/bookHotel/${this.$route.params.orderId}`)
    }
  }
}
</script>
<style lang="less" scoped>
.hotelList {
  .content {
    margin-top: 15px;
  }
}
</style>

