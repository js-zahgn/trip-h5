import { appApi } from './api'
import { addDays } from './utils'

const cache = {
  setObj(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  },
  getObj(key) {
    const json = localStorage.getItem(key)
    if (!json) return null
    return JSON.parse(json)
  }
}

const initDriver = () => ({
  id: 0,
  gender: '',
  secondName: '',
  firstName: '',
  birthday: '',
  dlType: '',
  dlTranslator: 1,
  dlNo: '',
  dlExpireDate: '',
  passportNo: ''
})

const initOrder = () => ({
  groupId: 0,
  fromStoreId: 0,
  toStoreId: 0,
  fromTime: addDays(3),
  toTime: addDays(10),
  insuranceId: 0,
  channel: 3,
  orderCustomer: {
    gender: '',
    fullName: '',
    phoneNumber: '',
    wechat: '',
    flightNumber: '',
    flightDate: '',
    remark: ''
  },
  orderCharges: [
    /* { chargeId: 0, quantity: 0 } */
  ],
  orderDrivers: [initDriver()],

  // 扩展信息
  fromStoreName: '',
  toStoreName: '',
  days: 0
})

const store = {
  state: {
    stores: [],
    order: initOrder(),
    hotel: null
  },

  async getSetStores() {
    const stores = await appApi.getStores()
    this.state.stores = stores
    // 设置默认取/还地点
    if (!this.state.order.fromStoreId || !this.state.order.toStoreId) {
      this.updateOrder({
        fromStoreId: stores[0].id,
        toStoreId: stores[0].id,
        fromStoreName: stores[0].name,
        toStoreName: stores[0].name
      })
    }
    return stores
  },

  updateOrder(obj) {
    Object.assign(this.state.order, obj)
    cache.setObj('order', this.state.order)
  },

  syncOrder() {
    const order = cache.getObj('order')
    if (!order) return
    Object.assign(this.state.order, order)
  }
}

export default store

store.syncOrder()
