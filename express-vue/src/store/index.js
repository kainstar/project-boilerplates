import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errMsg: ''
  },
  getters: {},
  mutations: {
    setErrMsg (state, errMsg) {
      state.errMsg = errMsg
    }
  },
  actions: {},
  strict: process.env.NODE_ENV === 'production'
})
