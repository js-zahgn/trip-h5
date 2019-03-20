<template>
  <div class="CustomerForm">
    <div class="form-title">联系人信息</div>
    <van-cell-group>
      <van-field readonly label="称呼" :error-message="errors.gender">
        <van-radio-group slot="button" v-model="customer.gender">
          <van-radio name="1">先生</van-radio>
          <van-radio name="2">女士</van-radio>
        </van-radio-group>
      </van-field>
      <van-field
        v-model="customer.fullName"
        clearable
        label="姓名"
        placeholder="请填写姓名"
        :error-message="errors.fullName"
      />
      <van-field
        v-model="customer.phoneNumber"
        clearable
        label="手机号(+86)"
        placeholder="请填写手机号"
        :error-message="errors.phoneNumber"
      />
      <van-field v-model="customer.wechat" clearable label="微信号" placeholder="选填"/>
    </van-cell-group>

    <div class="form-title">其它信息</div>
    <van-cell-group>
      <van-field v-model="customer.flightNumber" clearable label="航班号" placeholder="选填"/>
      <van-field
        class="no-keyboard"
        v-model="customer.flightDate"
        clearable
        label="起飞时间"
        placeholder="选填"
        @click="picker.show=true"
      />
      <van-field v-model="customer.remark" type="textarea" clearable label="备注" placeholder="选填"/>
    </van-cell-group>

    <van-actionsheet v-model="picker.show">
      <van-datetime-picker
        v-model="picker.time"
        title="起飞时间"
        type="datetime"
        :min-date="picker.minDate"
        :max-date="picker.maxDate"
        :formatter="formatter"
        @confirm="selectFlightDate"
        @cancel="picker.show=false"
      />
    </van-actionsheet>
  </div>
</template>
<script>
import store from '@/store'
import { fmtDateTime, addDays } from '@/utils'
export default {
  data() {
    return {
      error: false,
      customer: store.state.order.orderCustomer,
      picker: {
        show: false,
        minDate: new Date(),
        maxDate: addDays(100),
        time: addDays(3)
      }
    }
  },
  computed: {
    errors() {
      return {
        gender: this.checkRequired('gender'),
        phoneNumber:
          this.checkRequired('phoneNumber') || this.checkPhoneNumber(),
        fullName: this.checkRequired('fullName')
      }
    }
  },
  methods: {
    checkRequired(field) {
      return this.error && !this.customer[field] ? '此项不能为空' : ''
    },
    checkPhoneNumber() {
      if (!this.error) return
      return /^1[34578]\d{9}$/.test(this.customer.phoneNumber)
        ? ''
        : '手机号格式不正确'
    },
    selectFlightDate() {
      this.customer.flightDate = fmtDateTime(this.picker.time)
      this.picker.show = false
    },
    formatter(t, v) {
      switch (t) {
        case 'year':
          return v
        case 'month':
          return `${v} 月`
        case 'day':
          return `${v} 日`
        case 'hour':
          return `${v} 点`
        case 'minute':
          return `${v} 分`
      }
    },
    finish() {
      this.error = true
      if (Object.keys(this.errors).some(key => !!this.errors[key])) return false
      store.updateOrder({ orderCustomer: this.customer })
      return true
    }
  },
  mounted() {
    document
      .querySelectorAll('.no-keyboard input')
      .forEach(el => (el.onfocus = () => el.blur()))
  }
}
</script>
<style lang="less">
.CustomerForm {
  .contactInfo {
    font-size: 16px;

    section {
      margin-top: 10px;

      h3 {
        line-height: 40px;
        padding: 0 10px;
      }

      .option.mobile {
        padding: 0 10px;
        line-height: 40px;

        > span {
          border-right: @border;
        }
      }

      .option {
        background-color: #fff;
        padding: 12px 10px;
        display: flex;
        position: relative;
        border-top: @border;

        > span {
          flex: 1;
        }

        em {
          flex: 5;
          padding-left: 10px;
        }

        .van-icon {
          position: absolute;
          right: 10px;
          color: #aaa;
        }

        input,
        textarea {
          padding-left: 10px;
          outline: 0;
          border: 0;
          flex: 5;
        }

        textarea {
          color: #000;
          font-size: 16px;
          font-family: Arial;
          line-height: 20px;
          height: 50px;
        }
      }
    }
  }
}
</style>

