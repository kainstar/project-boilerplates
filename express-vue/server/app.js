const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const app = express()

// uncomment after placing your favicon in /public
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../static')))

app.use('/api', require('./routes/api'))
app.use('/api/mock', require('./routes/api/mock'))

app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json(res.locals)
})

const serverPort = parseInt(process.env.SERVER_PORT || 3000)
app.listen(serverPort, function (err) {
  if (err) {
    console.error('express server start failed, reason:', err)
  }
  console.log(`express server start success, listening on http://localhost:${serverPort}`)
})
