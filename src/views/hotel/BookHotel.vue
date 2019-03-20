<template>
  <Page title="预定酒店" class="bookHotel">
    <Hotel v-if="hotelBaseInfo!=null" :data="hotelBaseInfo"></Hotel>

    <div class="form-title">入住信息</div>
    <van-cell-group>
      <van-field
        class="no-keyboard"
        v-model="checkInTime"
        clearable
        label="入住时间"
        placeholder
        @click="selcetTime('checkInTime')"
      />
      <van-field
        class="no-keyboard"
        v-model="checkOutTime"
        clearable
        label="退房时间"
        placeholder
        @click="selcetTime('checkOutTime')"
      />
      <van-field v-model="customerCount" type="number" clearable label="入住人数" placeholder/>
    </van-cell-group>

    <footer>
      <span v-if="hotelBaseInfo!=null">押金：
        <Price :number="hotelBaseInfo.deposit" unit="CAD"/>
      </span>
      <van-button type="danger" @click="payDeposit">支付押金</van-button>
    </footer>

    <van-actionsheet v-model="time.picker">
      <van-datetime-picker
        v-model="time.current"
        type="datetime"
        :min-date="time.min"
        :max-date="time.max"
        :title="time.title"
        @confirm="selectedTime"
      />
    </van-actionsheet>
  </Page>
</template>
<script>
import Hotel from './partials/Hotel'
import { fmtDateTime, wxPay } from '@/utils'
import store from '@/store'
import { hotelApi } from '@/api'
const now = new Date(),
  nowY = now.getFullYear(),
  nowM = now.getMonth(),
  nowD = now.getDate(),
  nowH = now.getHours()
export default {
  name: 'bookHotel',
  props: ['hotel'],
  data() {
    return {
      hotelBaseInfo: null,
      checkInTime: '',
      checkOutTime: '',
      customerCount: '',
      time: {
        picker: false,
        key: 'checkInTime',
        title: '入住时间',
        min: new Date(),
        max: new Date(nowY + 20, nowM, nowD, nowH),
        current: new Date()
      }
    }
  },
  components: { Hotel },
  mounted() {
    if (!store.state.hotel) {
      this.$router.replace('/orders')
    } else this.hotelBaseInfo = store.state.hotel

    document
      .querySelectorAll('.no-keyboard input')
      .forEach(el => (el.onfocus = () => el.blur()))
  },
  methods: {
    selcetTime(key) {
      if (key !== 'checkInTime') {
        let inDate = new Date(this.checkInTime)
        this.time.title = '退房时间'
        this.time.min = new Date(
          inDate.getFullYear(),
          inDate.getMonth(),
          inDate.getDate(),
          inDate.getHours()
        )
      }
      this.time.key = key
      this.time.picker = true
    },
    selectedTime(time) {
      this[this.time.key] = fmtDateTime(time)
      this.time.picker = false
    },
    verifyNum() {
      if (this.customerCount.length == 1) {
        this.customerCount = this.customerCount.replace(/[^1-9]/g, '')
      } else {
        this.customerCount = this.customerCount.replace(/\D/g, '')
      }
    },
    payDeposit() {
      const _this = this
      if (this.customerCount < 1) {
        this.$toast('请填写入住人数！')
        return
      }
      if (this.checkInTime >= this.checkOutTime) {
        this.$toast('退房时间必须大于入住时间！')
        return
      }
      const params = {
        hotelId: this.hotelBaseInfo.id,
        startTime: fmtDateTime(this.checkInTime),
        endTime: fmtDateTime(this.checkOutTime),
        peopleCount: this.customerCount
      }
      const { orderId } = this.$route.params
      // hotelApi.payDeposit(orderId, params).then(res => {
      //   // wxPay(res.data,()=>{})
      //   store.state.hotel = null
      //   _this.$router.replace('/orderDetail/' + orderId)
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.bookHotel {
  .checkInInfo {
    border-top: @border;

    .option {
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom: @border;
      padding: 0 10px;
      font-size: 16px;

      span {
        width: 90px;
        font-weight: 600;
      }
    }
  }

  footer {
    border-top: @border;
    background: #fff;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-left: 15px;
    line-height: 42px;
    box-sizing: border-box;

    .van-button {
      float: right;
      border-radius: 0;
    }
  }
}
</style>

