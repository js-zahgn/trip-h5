import Vue from 'vue'
import axios from 'axios'
// import localStore from '@/utils/localStore'

const alert = msg => {
  Vue.$app.$toast(msg)
}

const showLoading = show => {}

const handleResponseError = ({ status, data }) => {
  switch (status) {
    case 401:
    case 403:
      Vue.router.replace('/login')
      break
    case 404:
      alert('对不起，资源不存在或已被删除！')
      break
    case 400:
      if (typeof data === 'string') {
        alert(data)
      } else if (typeof data === 'object') {
        for (let name in data) {
          var itemErrors = data[name]
          if (itemErrors.length > 0) {
            alert(itemErrors[0])
            break
          }
        }
      }
      break
    case 504:
      alert('网络连接失败！')
      break
    default:
      alert('对不起，服务器出现了故障！')
  }
}

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE, //'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  config => {
    showLoading(true)

    // const token = localStore.getToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    showLoading(false)
    return response
  },
  error => {
    showLoading(false)
    if (error.response) {
      handleResponseError(error.response)
      return new Promise(() => {})
    }
    return Promise.reject(error)
  }
)

export const factory = {
  createGet: path => params => http.get(path, { params }).then(res => res.data),

  createPost: path => data => http.post(path, data).then(res => res.data),

  createPut: pathWithoutId => (id, data) =>
    http.put(`${pathWithoutId}/${id}`, data).then(res => res.data),

  createDelete: pathWithoutId => (id, data) =>
    http.delete(`${pathWithoutId}/${id}`).then(res => res.data)
}

export default http
