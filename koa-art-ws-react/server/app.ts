import path from 'path';
import Koa from 'koa';
import artRender from 'koa-art-template';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import { useKoaServer } from 'routing-controllers';

import IndexController from './controllers/index';
import UserController from './controllers/user';

const app = new Koa();

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(logger());
app.use(require('koa-static')(path.join(__dirname, '../public')));

// 添加art-template模板引擎支持
artRender(app, {
  root: path.join(__dirname, '../views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production',
});

useKoaServer(app, {
  controllers: [IndexController, UserController],
});

export default app;
