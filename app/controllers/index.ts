import * as path from "path";
import * as cons from "consolidate";
import { Get, Controller, Ctx, Req, Res, UseBefore } from "routing-controllers";
import { Context, Request, Response } from "koa";
import serve from "koa-static";
import { appNext } from "../app";

// import bundle from "../../web/src/bundle";
@Controller()
@UseBefore(serve(path.resolve(__dirname, "../../public/")))
export default class {
  @Get("/*")
  async router(@Ctx() ctx: Context, @Req() req: Request, @Res() res: Response) {
    const pathUrl = ctx.path;
    console.log(pathUrl);
    await appNext.render(ctx.req, ctx.res, ctx.path, ctx.query);
    return cons.ejs(path.resolve(__dirname, "../views/index.ejs"), {});
  }
}
