const Router = require('koa-router')
const router = new Router({
  prefix: '/comic'
})

router.get('/', function (ctx, next) {
  ctx.success('this is a comic response!')
})

router.get('/bar', function (ctx, next) {
  ctx.success('this is a comic/bar response')
})

module.exports = router
