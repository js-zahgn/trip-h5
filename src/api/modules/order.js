import axios from '../axios'

export default {
  getDays(fromTime, toTime) {
    return axios
      .get('orders/days', { params: { fromTime, toTime } })
      .then(res => parseFloat(res.data))
  },
  create(order) {
    return axios.post('orders', order).then(res => res.data)
  },
  getOrders() {
    return axios.get('Orders').then(res => res.data)
  },
  getOrderDetail(id) {
    return axios.get(`Orders/${id}`).then(res => res)
  }
}
