import axios from '../axios'

export default {
  getStores: () => axios.get('stores').then(res => res.data)
}
