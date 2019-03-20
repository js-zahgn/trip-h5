<template>
  <div class="DriversForm">
    <div class="DriversForm__driver">
      <div class="form-title">主要驾驶人</div>
      <van-cell-group>
        <van-field readonly label="称呼" :error-message="errors.gender">
          <van-radio-group slot="button" v-model="driver.gender">
            <van-radio name="1">先生</van-radio>
            <van-radio name="2">女士</van-radio>
          </van-radio-group>
        </van-field>
        <van-field
          v-model="driver.secondName"
          clearable
          label="姓(拼音或英文)"
          placeholder="如：WANG"
          :error-message="errors.secondName"
        />
        <van-field
          v-model="driver.firstName"
          clearable
          label="名(拼音或英文)"
          placeholder="如：LIANG"
          :error-message="errors.firstName"
        />
        <van-field
          v-model="driver.birthday"
          clearable
          type="number"
          label="出生年份"
          placeholder="如：1990"
          :error-message="errors.birthday"
        />
        <van-field readonly label="驾照类型" :error-message="errors.dlType">
          <van-radio-group slot="button" v-model="driver.dlType">
            <van-radio
              class="dl-type"
              v-for="item of dlTypes"
              :key="item.type"
              :name="item.type"
            >{{item.content}}</van-radio>
          </van-radio-group>
        </van-field>
        <van-field readonly label="翻译件类型" v-show="driver.dlType==1">
          <van-radio-group slot="button" v-model="driver.dlTranslator" class="radio-block">
            <van-radio
              class="dl-translator"
              v-for="item of dlTranslators"
              :key="item.type"
              :name="item.type"
            >{{item.content}}</van-radio>
          </van-radio-group>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { toDate } from '@/utils'

export default {
  data() {
    const now = new Date()
    return {
      error: false,
      driver: store.state.order.orderDrivers[0],
      dlTypes: [
        { content: '中国驾照', type: 1 },
        { content: '香港驾照', type: 2 },
        { content: '美国驾照', type: 3 },
        { content: '加拿大驾照', type: 4 }
      ],
      dlTranslators: [
        { content: '已有翻译件，不需要', type: 1 },
        { content: '加拿大当地驾照翻译件', type: 2 },
        { content: '英文公证件', type: 3 }
      ]
    }
  },
  computed: {
    errors() {
      return {
        gender: this.checkRequired('gender'),
        secondName: this.checkRequired('secondName'),
        firstName: this.checkRequired('firstName'),
        birthday: this.checkRequired('birthday') || this.checkBirthday(),
        dlType: this.checkRequired('dlType')
      }
    }
  },
  methods: {
    checkRequired(field) {
      return this.error && !this.driver[field] ? '此项不能为空' : ''
    },
    checkBirthday() {
      var y = new Date().getFullYear()
      return this.error &&
        (y - this.driver.birthday < 15 || y - this.driver.birthday > 100)
        ? '请输入正确的年龄'
        : ''
    },
    verifyDriver() {
      const requiredFields = [
        'gender',
        'secondName',
        'firstName',
        'dlType',
        'birthday'
      ]
      for (let f of requiredFields) {
        if (!this.driver[f]) {
          this.error = true
          return false
        }
      }
      if (
        this.driver.birthday > new Date().getFullYear() - 15 ||
        this.driver.birthday > new Date().getFullYear() < 100
      ) {
        this.error = true
      }
      return true
    },
    finish() {
      if (!this.verifyDriver()) return false
      store.updateOrder({ orderDrivers: [this.driver] })
      return true
    }
  }
}
</script>
<style lang="less">
.DriversForm {
  .dl-type:last-child {
    margin-top: 7px;
  }
}
</style>
