import axios from '../axios'

export default {
  getHotels: () => axios.get('Hotels').then(res => res.data),
  payDeposit: (id, params) => axios.put(`/Orders/${id}/Hotel`, params).then(res => res.data)
}
