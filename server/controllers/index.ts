import * as path from "path";
import * as cons from "consolidate";
import { Get, Controller } from "routing-controllers";

@Controller()
export default class {
  @Get("/")
  async router() {
    return cons.ejs(path.resolve(__dirname, "../views/index.ejs"), {});
  }
}
