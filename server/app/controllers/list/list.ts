import { Ctx, Param, Get, JsonController } from 'routing-controllers';
import { Context } from 'koa';

// @JsonController('/list')
// export default class {
//   @Get('/')
//   async router(@Ctx() ctx: Context) {
//     try {
//       return {
//         code: 200,
//         data:  {
//           a: 1
//         }
//       }
//     } catch (e) {
//       console.error(ctx, e)
//       return {
//         code: 500,
//         message: '服务器错误',
//       }
//     }
//   }

@JsonController('/list')
export default class {
  @Get('/')
  async router(@Ctx() ctx: Context) {
    const data = ctx;
    try {
      return {
        code: 200,
        data: data.host
      };
    } catch (err) {
      console.log(err, `错误`);
    }
  }
}