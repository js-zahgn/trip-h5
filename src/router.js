import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Hotels = () =>
  import(/* webpackChunkName:'Hotels' */ '@/views/hotel/Hotels')
const BookHotel = () =>
  import(/* webpackChunkName:'BookHotel' */ '@/views/hotel/BookHotel')

const MyInfo = () => import(/* webpackChunkName:'myInfo' */ '@/views/my')
const OrderList = () => import(/* webpackChunkName:'orders' */ '@/views/orders')
const OrderDetail = () =>
  import(/* webpackChunkName:'orderDetail' */ '@/views/orders/detail')
const Paid = () => import(/* webpackChunkName:'paid' */ '@/views/order/paid')

const Error404 = () => import(/* webpackChunkName:'error' */ '@/views/error')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName:'home' */ '@/views/home')
    },
    {
      path: '/groups',
      component: () => import(/* webpackChunkName:'group' */ '@/views/group')
    },
    {
      path: '/order/edit',
      component: () => import('@/views/order/edit')
    },
    {
      path: '/paid/:orderId',
      name: 'paid',
      component: Paid
    },
    {
      path: '/hotels/:orderId',
      name: 'hotels',
      component: Hotels
    },
    {
      path: '/bookHotel/:orderId',
      name: 'bookHotel',
      component: BookHotel
    },
    {
      path: '/my',
      name: 'myInfo',
      component: MyInfo
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderList
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: '/err',
      name: 'error',
      component: Error404
    }
  ]
})
