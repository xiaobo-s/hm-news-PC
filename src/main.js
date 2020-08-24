import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'
import './styles/base.css'

import 'element-ui/lib/theme-chalk/index.css'

// axios优化
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

// 定义过滤器
Vue.filter('fixUrl', value => {
  if (value.startsWith('http')) {
    return value
  } else {
    return axios.defaults.baseURL + value
  }
})

Vue.filter('time', function(value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
