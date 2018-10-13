import Vue from 'vue'
import Backend from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#backend',
  template: '<backend/>',
  components: { Backend }
})
