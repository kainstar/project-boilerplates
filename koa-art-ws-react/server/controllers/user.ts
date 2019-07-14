import { Controller, Ctx, Get } from 'routing-controllers';
import { Context } from 'koa';

@Controller('/user')
class UserController {
  @Get('/')
  async index(@Ctx() ctx: Context) {
    return 'this is a users response!';
  }

  @Get('/bar')
  async bar(@Ctx() ctx: Context) {
    return 'this is a users/bar response';
  }

  @Get('/json')
  async json(@Ctx() ctx: Context) {
    return {
      title: 'koa2 json',
    };
  }
}

export default UserController;
