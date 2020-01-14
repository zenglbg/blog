import * as path from "path";
import * as cons from "consolidate";
import { Get, Controller, Ctx } from "routing-controllers";
import { Context } from 'koa'
import bundle from "../../web/src/bundle";
@Controller()
export default class {
  @Get("/*")
  async router(@Ctx() ctx: Context) {
    const pathUrl = ctx.path
    console.log(pathUrl)
    return cons.ejs(path.resolve(__dirname, "../views/index.ejs"), {
      content: bundle.serverRender({path: pathUrl})
    });
  }
}
