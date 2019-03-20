<template>
  <div class="Home-PickForm">
    <div class="row">
      <div class="cell cell-left" @click="showStorePicker('fromStore')">
        <span>取车地点</span>
        <strong>{{form.fromStoreName}}</strong>
      </div>
      <div class="cell cell-mid">
        <span class="arrow">
          <van-icon name="ellipsis"/>
          <van-icon name="arrow"/>
        </span>
      </div>
      <div class="cell cell-right" @click="showStorePicker('toStore')">
        <span>还车地点</span>
        <strong>{{form.toStoreName}}</strong>
      </div>
    </div>

    <div class="row">
      <div class="cell cell-left" @click="showTimePicker('fromTime')">
        <strong>{{form.fromTime | day}}</strong>
        <span>
          <time>{{form.fromTime | week}}</time>
          <time>{{form.fromTime | time}}</time>
        </span>
      </div>
      <div class="cell cell-mid">
        <span class="days">{{form.days}}天</span>
      </div>
      <div class="cell cell-right" @click="showTimePicker('toTime')">
        <strong>{{form.toTime | day}}</strong>
        <span>
          <time>{{form.toTime | week}}</time>
          <time>{{form.toTime | time}}</time>
        </span>
      </div>
    </div>

    <van-button @click="search" type="danger" size="large">立即租车</van-button>

    <van-actionsheet v-model="store.picker" :title="store.title">
      <p v-for="store in stores" :key="store.id" @click="storePicked(store)">{{store.name}}</p>
    </van-actionsheet>
    <van-actionsheet v-model="time.picker">
      <van-datetime-picker
        v-model="time.current"
        type="datetime"
        :min-date="time.min"
        :max-date="time.max"
        class="noYearPicer"
        :formatter="formatter"
        :title="time.title"
        @confirm="selectTime"
      />
    </van-actionsheet>
  </div>
</template>

<script>
import store from '@/store'
import { orderApi } from '@/api'
import { toDate, pad0 } from '@/utils'
export default {
  data() {
    const now = new Date(),
      y = now.getFullYear(),
      m = now.getMonth(),
      d = now.getDate()

    return {
      store: {
        picker: false,
        title: '取车地点',
        key: 'fromStore'
      },
      time: {
        picker: false,
        title: '取车地点',
        key: 'fromStore',
        max: new Date(y, m, d + 100),
        min: now,
        current: now
      },
      form: store.state.order
    }
  },

  computed: {
    stores() {
      return store.state.stores
    }
  },

  methods: {
    checkDays() {
      const { fromTime, toTime } = this.form
      if (toDate(fromTime) > toDate(toTime)) {
        this.$toast('还车时间必须大于取车时间！')
        this.form.days = 0
        return
      }
      orderApi.getDays(fromTime, toTime).then(d => {
        this.form.days = d
      })
    },

    showStorePicker(key) {
      this.store.key = key
      this.store.title = key === 'fromStore' ? '取车地点' : '还车地点'
      this.store.picker = true
    },
    storePicked(store) {
      this.form[this.store.key + 'Id'] = store.id
      this.form[this.store.key + 'Name'] = store.name
      this.store.picker = false
    },
    formatter(type, value) {
      switch (type) {
        case 'year':
          return value
        case 'month':
          return `${value} 月`
        case 'day':
          return `${value} 日`
        case 'hour':
          return `${value} 点`
        case 'minute':
          return `${value} 分`
      }
    },
    showTimePicker(key) {
      this.time.key = key
      this.time.title = key === 'fromTime' ? '取车时间' : '还车时间'
      this.time.picker = true
      this.time.current = toDate(this.form[key])
    },
    selectTime(date) {
      const y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes()
      this.form[this.time.key] = `${y}/${pad0(m)}/${pad0(d)} ${pad0(h)}:${pad0(
        min
      )}`
      this.checkDays()
      this.time.picker = false
    },

    search() {
      const { fromTime, toTime } = this.form
      if (toDate(fromTime) > toDate(toTime)) {
        this.$toast('还车时间必须大于取车时间！')
        return
      }
      store.updateOrder(this.form)
      this.$router.push('groups')
    }
  },
  mounted() {
    this.checkDays()
  }
}
</script>

<style lang="less" scoped>
.Home-PickForm {
  margin: -25px @screen-gap 0;
  padding: 35px 20px 30px;
  background-color: #fff;
  border-radius: 20px 20px 5px 5px;
  z-index: 2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    margin-bottom: 32px;
  }

  .cell {
    text-align: center;

    > span {
      display: block;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.44);
      margin-bottom: 6px;

      time {
        display: inline-block;
        font-size: 14px;
      }
      time ~ time {
        font-size: 15px;
        margin-left: 8px;
      }
    }

    > strong {
      display: block;
      font-size: 18px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.66);
      margin-bottom: 6px;
    }

    &-left,
    &-right {
      width: 42%;
    }
  }

  .arrow {
    line-height: 40px;

    i {
      color: rgba(0, 0, 0, 0.1);
    }
  }

  .days {
    height: 48px;
    width: 48px;
    font-size: 14px;
    line-height: 45px;
    text-align: center;
    border-radius: 50%;
    margin-top: -5px;
    color: rgba(0, 0, 0, 0.88);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .van-popup {
    .van-actionsheet__content {
      border-top: @border;

      p {
        line-height: 40px;
        text-align: center;
        font-size: 18px;
      }
    }
  }
}
</style>

