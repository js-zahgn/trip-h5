import '@/utils/vant-ui'
import './assets/reset.less'
import './assets/common.less'

import Vue from 'vue'
import App from './views/App'
import router from './router'

import Frame from './views/Frame'
import Page from './views/Page'
import Price from './components/Price'

import './utils/filters'

Vue.config.productionTip = false

Vue.component(Frame.name, Frame)
Vue.component(Page.name, Page)
Vue.component(Price.name, Price)

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.$app = app
