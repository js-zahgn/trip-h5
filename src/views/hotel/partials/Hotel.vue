<template>
  <section @click="goBookHotel">
    <div class="imgBox">
      <img :src="hotel.coverUrl" alt>
    </div>
    <div class="info">
      <h3>{{hotel.name}}</h3>
      <p>{{hotel.description}}</p>
      <p class="discount" v-if="hotel.discount!=0">{{hotel.discount}} 折优惠</p>
      <span v-else>暂无优惠活动</span>
    </div>
  </section>
</template>
<script>
export default {
  props: ['data', 'isList'],
  computed: {
    hotel() {
      return this.data
    }
  },
  methods: {
    goBookHotel() {
      if (this.isList) {
        this.$emit('goBook', this.hotel)
      }
    }
  }
}
</script>
<style lang="less" scoped>
section {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;

  .imgBox {
    width: 120px;
    height: 90px;
    background: #ccc;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .info {
    padding: 0 15px;
    line-height: 25px;

    h3 {
      font-size: 16px;
      font-weight: 600;
    }

    p {
      color: #a5a5a5;
      font-size: 14px;
    }
    .discount {
      color: #f44;
    }

    span {
      color: #a5a5a5;
    }
  }
}
</style>
