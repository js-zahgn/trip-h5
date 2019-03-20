<template>
  <div class="GroupItem">
    <div class="group" @click="toggleInsurances">
      <img :src="group.coverUrl">
      <div class="content">
        <h3>{{group.name}} · {{group.model}}</h3>
        <p>或同组车型 · {{group.seats}}座 · {{group.doors}}门</p>
        <p class="intro">{{group.intro}}</p>
        <Price :number="group.price" unit="CAD/天"/>
        <span class="arrow">
          <van-icon name="arrow-down" v-if="isFolded"></van-icon>
          <van-icon name="arrow-up" v-else></van-icon>
        </span>
      </div>
    </div>
    <InsuranceList v-show="!isFolded" :data="insurances" @onSelect="selectInsurance"/>
  </div>
</template>

<script>
import store from '@/store'
import { groupApi } from '@/api'
import InsuranceList from './InsuranceList'
export default {
  props: ['data'],
  components: { InsuranceList },
  data() {
    return {
      group: this.data,
      insurances: [],
      isFolded: true
    }
  },
  methods: {
    toggleInsurances() {
      this.isFolded = !this.isFolded
      if (!this.isFolded && !this.insurances.length) {
        groupApi.getInsurances(this.group.id).then(data => {
          this.insurances = data
        })
      }
    },
    selectInsurance(insurance) {
      store.updateOrder({
        groupId: this.group.id,
        insuranceId: insurance.insuranceId
      })
      this.$router.push('/order/edit')
    }
  }
}
</script>

<style lang="less" scoped>
.GroupItem {
  padding: 10px;
  background: #fff;
  margin-top: 12px;

  .group {
    display: flex;

    > img {
      flex: 0;
      display: block;
      width: 150px;
      min-width: 150px;
      height: 100px;
    }
  }

  .content {
    position: relative;
    flex: 1;
    padding-left: 10px;

    > h3 {
      font-weight: bold;
      line-height: 1;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.8);
      margin: 4px 0 8px;
    }
    .intro {
      color: rgba(0, 0, 0, 0.44);
      font-size: 12px;
      margin: 12px 0 18px;
    }
    .arrow {
      position: absolute;
      right: 3px;
      bottom: 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

