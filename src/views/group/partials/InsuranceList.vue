<template>
  <div class="InsuranceList">
    <div v-for="ins in data" :key="ins.insuranceId" @click="click(ins)">
      <div>
        <h3>{{ins.insurance.name}}</h3>
        <Price :number="ins.price" unit="CAD/天"/>
      </div>
      <p>{{ins.insurance.include}}</p>
      <van-icon name="arrow"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    click(insurance) {
      this.$emit("onSelect", insurance);
    }
  }
};
</script>

<style lang="less" scoped>
.InsuranceList {
  > div {
    margin-top: 10px;
    padding: 10px 2px;
    position: relative;
    border-top: 1px solid rgba(0, 0, 0, 0.045);

    h3 {
      font-size: 15px;
      display: inline-block;
      margin-right: 15px;
    }

    .van-icon {
      position: absolute;
      right: 0;
      top: 22px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.2);
    }
  }

  h3 {
    font-weight: bold;

    .price {
      margin-left: 15px;

      strong {
        font-size: 15px;
      }
    }
  }

  p {
    margin-top: 8px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.44);
  }
}
</style>


