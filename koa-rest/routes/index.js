const Router = require('koa-router')
const router = new Router()

const fs = require('fs')
const normailzeModule = require('../tools/normailzeModule')

router.get('/', async (ctx, next) => {
  ctx.success({
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.success('koa2 string')
})

router.get('/json', async (ctx, next) => {
  ctx.success({
    title: 'koa2 json'
  })
})

// 获取 routes 目录下所有路由模块，并挂载到一个路由上
const routeModules = normailzeModule(fs.readdirSync(__dirname))
routeModules.forEach((moduleName) => {
  const route = require(`./${moduleName}`)
  router.use(route.routes(), route.allowedMethods())
})

module.exports = router
