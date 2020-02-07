import * as path from "path";
import * as cons from "consolidate";
import { Get, Controller, Ctx, Req, Res, UseBefore } from "routing-controllers";
import { Context, Request, Response } from "koa";
import { appNext, handle } from "../app";
import serve from "koa-static";

// import bundle from "../../web/src/bundle";
@Controller()
@UseBefore(serve(path.resolve(__dirname, "../../public/")))
export default class {
  // @Get("/admin/home")
  // async home(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
  //   const pathUrl = ctx.path;
  //   console.log("管理后台路径log", pathUrl);
  //   await appNext.render(ctx.req, ctx.res, ctx.path, ctx.query);
  // }
  // @Get("/admin/login")
  // async login(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
  //   const pathUrl = ctx.path;
  //   console.log("管理后台路径log", pathUrl);
  //   await appNext.render(ctx.req, ctx.res, ctx.path, ctx.query);
  // }
  // @Get("*")
  // async router(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
  //   const pathUrl = ctx.path;
  //   console.log("管理后台路径log", pathUrl);
  //   await handle(ctx.req, ctx.res);
  // }
}
