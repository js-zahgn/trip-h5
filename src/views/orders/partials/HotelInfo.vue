<template>
  <div class="hotelInfo" :class="{btn: hotelInfo==null}">
    <div v-if="hotelInfo==null" class="bookHotelBtn">
      <van-button @click="bookHotel">预定酒店</van-button>
    </div>
    <div class="hotelDetail" v-else>
      <div class="hotel">
        <div class="imgBox">
          <img :src="hotelInfo.coverUrl" alt="">
        </div>
        <div class="info">
          <h3>{{hotelInfo.name}}</h3>
          <p>{{hotelInfo.description}}</p>
          <em v-if="hotelInfo.discount!=0">享{{hotelInfo.discount}}折优惠</em>
          <span v-else>暂无优惠活动</span>
        </div>
      </div>
      <div class="option">
        <span>入住时间</span>
        <em>{{hotelInfo.startTime | dateTime}} 至 {{hotelInfo.endTime | dateTime}}</em>
      </div>
      <div class="option">
        <span>入住人数</span>
        <em>{{hotelInfo.peopleCount}} 人</em>
      </div>
      <!-- <div class="option" v-if="hotelInfo.roomInfo.singleCount > 0">
          <span>单人间</span>
          <em>{{hotelInfo.roomInfo.singleCount}} 间</em>
        </div>
        <div class="option" v-if="hotelInfo.roomInfo.doubleCount > 0">
          <span>双人间</span>
          <em>{{hotelInfo.roomInfo.doubleCount}} 间</em>
        </div> -->
      <div class="realPay">
        <p>实付定金：<span class="money">C$ {{hotelInfo.deposit | money}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    hotelInfo() {
      return this.data
    }
  },
  methods: {
    bookHotel() {
      this.$router.push(`/hotels/${this.$route.params.id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.hotelInfo.btn {
  border-top: @border;
  border-bottom: @border;
}

.hotelInfo {
  margin-top: 20px;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 15px;

  .bookHotelBtn {
    text-align: center;

    .van-button {
      background-color: #fff;
      width: 100px;
      margin: 10px auto;
      border: @border;
      height: 34px;
      line-height: 32px;
    }
  }

  .hotelDetail {
    .hotel {
      background-color: #fff;
      margin-bottom: 10px;
      padding: 10px;
      display: flex;

      .imgBox {
        width: 60px;
        height: 60px;
        background: #ccc;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .info {
        padding: 0 10px;
        line-height: 20px;

        h3 {
          font-size: 16px;
          font-weight: 600;
        }

        p {
          color: #a5a5a5;
          font-size: 14px;
        }

        em {
          color: red;
          font-weight: 600;
          font-size: 16px;
        }

        span {
          color: #a5a5a5;
        }
      }
    }
  }

  .option {
    display: flex;
    align-items: center;
    height: 30px;
    justify-content: space-between;
  }

  .realPay {
    border-top: @border;
    line-height: 40px;
    text-align: right;
  }
}
</style>
