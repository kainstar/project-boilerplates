/**
 * Vue-axios插件
 */
const VueAxios = {
  install: function (Vue, axios) {
    if (this.installed) {
      return
    }
    this.installed = true
    if (!axios) {
      console.error('You have to install axios')
      return
    }
    Vue.axios = axios
    Vue.prototype.axios = axios;
    Vue.prototype.$http = axios;
    Object.defineProperties(Vue.prototype, {
      axios: {
        get() {
          return axios
        }
      },
      $http: {
        get() {
          return axios
        }
      }
    })
  },
  installed: false
}

export { VueAxios }