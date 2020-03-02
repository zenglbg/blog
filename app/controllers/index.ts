import * as path from "path";
import * as cons from "consolidate";
import { Get, Controller, Ctx, Req, Res } from "routing-controllers";
import { Context, Request, Response } from "koa";
import { appNext, handle } from "../app";

@Controller()
export default class {
  @Get("/admin/*")
  async home(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
    const pathUrl = ctx.path;
    console.log("管理后台路径log", pathUrl);
    await appNext.render(ctx.req, ctx.res, ctx.path, ctx.query);
  }

  @Get("/")
  async index(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
    const pathUrl = ctx.path;
    console.log("管理后台路径log", pathUrl);
    await handle(ctx.req, ctx.res);
  }
}
