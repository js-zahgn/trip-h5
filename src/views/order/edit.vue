<template>
  <Page title="填写订单" :back="goBack">
    <div class="Order-Edit">
      <van-steps :active="step" active-color="#FBC415">
        <van-step v-for="(step,index) in steps" :key="index">{{step}}</van-step>
      </van-steps>
      <ChargesForm ref="form0" v-if="step==0" transition="expand"/>
      <DriversForm ref="form1" v-if="step==1" transition="expand"/>
      <CustomerForm ref="form2" v-if="step==2" transition="expand"/>
      <FeesForm ref="form3" v-if="step==3" transition="expand"/>
      <div class="steps-foot">
        <van-button v-if="step>0&&step!=3" type="default" @click="prevStep">上一步</van-button>
        <van-button v-if="step<3" type="danger" @click="nextStep">下一步</van-button>
        <van-button v-if="step==3" type="danger" @click="prePay">立即支付</van-button>
      </div>
    </div>
  </Page>
</template>

<script>
import store from '@/store'
import ChargesForm from './forms/ChargesForm'
import DriversForm from './forms/DriversForm'
import CustomerForm from './forms/CustomerForm'
import FeesForm from './forms/FeesForm'
export default {
  components: { ChargesForm, DriversForm, CustomerForm, FeesForm },
  data() {
    return {
      step: 0,
      animate: 'slide-left',
      steps: ['选择服务', '驾驶信息', '个人信息', '支付确认']
    }
  },
  methods: {
    goBack() {
      if (this.step == 0) this.$router.go(-1)
      else this.prevStep()
    },
    prevStep() {
      this.animate = 'slide-left'
      this.step--
    },
    nextStep() {
      if (this.$refs['form' + this.step].finish()) {
        this.animate = 'slide-right'
        this.step++
      }
    },
    prePay() {
      this.$router.push(`/paid/38966984704`)
    }
  },
  watch: {
    $route(to, fr) {
      let toStep = to.path.split('/edit/')[1],
        fromStep = fr.path.split('/edit/')[1]
      this.animate = toStep < fromStep ? 'slide-left' : 'slide-right'
    }
  }
}
</script>

<style lang="less">
.expand-transition {
  transition: all 0.3s ease;
  height: 100px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
.expand-enter,
.expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}

.Order-Edit {
  padding-bottom: 50px;

  .van-steps--horizontal {
    padding: 0 10px 0 15px;
  }
  .van-step--horizontal:last-child .van-step__title {
    margin-right: -2px;
  }
  .van-step--horizontal.van-step--finish {
    color: @color-orange;
    .van-step__circle,
    .van-step__line {
      background-color: @color-orange;
    }
  }

  .steps-view {
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-out;
  }

  .steps-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;

    .van-button {
      width: 100%;
      border-radius: 0;
      &--default {
        color: #fff;
        background-color: @color-regular-blue;
        border-color: @color-regular-blue;
      }
    }
  }
}
</style>
