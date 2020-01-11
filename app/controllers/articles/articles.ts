import { Ctx, Param, Get, JsonController, Post } from 'routing-controllers';
import { Context } from 'Koa';

@JsonController('/article')
export default class {
  @Post('/write')
  async write(@Ctx() ctx: Context) {
    const data = ctx;
    try {
      return {
        code: 10000
      };
    } catch (e) {
      console.log(e);
    }
  }
}
