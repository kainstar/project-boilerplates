const koa = require('koa')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , onerror = require('koa-onerror');

const app = new koa();

const path = require('path');
const fs = require('fs');

const index = require('./server/routes/index');
const users = require('./server/routes/users');

// error handler
onerror(app);

// global middlewares
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

app.use(async (ctx) => {
  ctx.type = "html/text";
  ctx.body = fs.createReadStream(__dirname + '/public/index.html');
});

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

module.exports = app;
