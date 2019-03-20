<template>
  <div class="ChargesForm">
    <div class="form-title">选择服务</div>
    <div v-for="charge in charges" :key="charge.chargeId" class="ChargesForm__item">
      <h3>
        <span>{{charge.charge.name}}</span>
        <Price :number="charge.price" :unit="`CAD${charge.charge.unit==1 ?'/单':'/天'}`"/>
      </h3>
      <p>{{charge.charge.description}}</p>
      <van-stepper v-model="charge.quantity" integer :min="0" :max="charge.charge.max"/>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { groupApi } from '@/api'
export default {
  data() {
    return {
      charges: [],
      order: store.state.order
    }
  },
  methods: {
    finish() {
      store.updateOrder({
        orderCharges: this.charges.map(x => ({
          chargeId: x.chargeId,
          quantity: x.quantity
        }))
      })
      return true
    }
  },
  mounted() {
    groupApi.getCharges(this.order.groupId).then(data => {
      this.charges = data.map(item => {
        let orderCharge = this.order.orderCharges.find(
          x => x.chargeId === item.chargeId
        )
        item.quantity = orderCharge ? orderCharge.quantity : 0
        return item
      })
    })
  }
}
</script>

<style lang="less">
.ChargesForm {
  &__item {
    position: relative;
    padding: 20px 15px;
    background-color: #fff;
    margin-bottom: 10px;

    h3 {
      font-size: 14px;
      span {
        margin-right: 15px;
      }
    }

    p {
      margin-top: 10px;
      line-height: 1.5;
      text-align: justify;
      color: rgba(0, 0, 0, 0.44);
    }

    .van-stepper {
      position: absolute;
      top: 10px;
      right: 15px;
    }
    .van-stepper__minus:not(.van-stepper__minus--disabled) ~ input {
      color: #f44;
      font-weight: bold;
    }
  }
}
</style>
