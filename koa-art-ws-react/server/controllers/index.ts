import { Controller, Ctx, Get, Render } from 'routing-controllers';
import { Context } from 'koa';

@Controller('')
class IndexController {
  @Get('/')
  @Render('index')
  async index(@Ctx() ctx: Context) {
    return {
      title: 'Hello Koa 2!',
    };
  }

  @Get('/string')
  async string(@Ctx() ctx: Context) {
    return 'koa2 string';
  }

  @Get('/json')
  async json(@Ctx() ctx: Context) {
    return {
      title: 'koa2 json',
    };
  }
}

export default IndexController;
