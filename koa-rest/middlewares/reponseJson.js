const {success, failed} = require('../tools/resGenerator')

module.exports = function () {
  return async function responseJSON(ctx, next) {
    ctx.success = function (data) {
      ctx.body = success(data)
    }
    ctx.failed = function (err) {
      ctx.body = failed(err)
    }
    await next()
  }
}