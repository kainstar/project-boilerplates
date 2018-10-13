/**
 * localStorage 工具类
 */
export default class Storage {
  constructor (options = {
    prefix: ''
  }) {
    this.prefix = options.prefix || ''
  }

  get (key) {
    return localStorage.getItem(this.prefix + key)
  }

  set (key, data) {
    localStorage.setItem(this.prefix + key, data)
    return this
  }

  remove (key) {
    localStorage.removeItem(this.prefix + key)
    return this
  }

  static install (Vue, options) {
    Vue.prototype.$ls = new Storage(options)
  }
}
