// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './plugins'
import Storage from '../../plugins/storage'
import axios from 'axios'

Vue.config.productionTip = false

/**
 * axios ajax工具库配置
 */
axios.defaults.baseURL = 'http://dev.vegetable.com:8081'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

/**
 * localStorage配置
 */
Vue.use(Storage, {
  prefix: 'vegetable_mall_'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
