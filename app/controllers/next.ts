import { Get, Controller, Ctx, Req, Res } from "routing-controllers";
import { Context, Request, Response } from "koa";
import { appNext, handle } from "../app";

@Controller()
export default class {
  @Get("/_next/*")
  async _next(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
    const pathUrl = ctx.path;
    console.log(
      "管理后台路径_next_next_next_next_next_next_next_next_next",
      pathUrl
    );
    await handle(ctx.req, ctx.res);
  }
  @Get("/_error/*")
  async _error(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
    const pathUrl = ctx.path;
    console.log(
      "管理后台路径_error_error_error_error_error_error_error_error_error",
      pathUrl
    );
    await handle(ctx.req, ctx.res);
  }
  @Get("/*.*")
  async str(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
    const pathUrl = ctx.path;
    console.log("管理后台路径*.**.**.**.**.**.**.**.**.**.*", pathUrl);
    await handle(ctx.req, ctx.res);
  }
}
