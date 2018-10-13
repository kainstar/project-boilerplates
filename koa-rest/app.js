const Koa = require('koa')
const app = new Koa()
const path = require('path')

// 导入中间件
const jsonError = require('koa-json-error')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const responseJson = require('./middlewares/reponseJson')

// 导入路由
const index = require('./routes/index')

// error handler
app.use(jsonError())

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/public')))
app.use(responseJson())

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
