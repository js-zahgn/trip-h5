import axios from '../axios'

export default {
  getGroups: params => axios.get('groups', params).then(res => res.data),
  getInsurances: id =>
    axios.get(`groups/${id}/insurances`).then(res => res.data),
  getCharges: id => axios.get(`groups/${id}/charges`).then(res => res.data)
}
