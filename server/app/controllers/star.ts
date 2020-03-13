import { Star } from "../model/entity/star";
import {
  Ctx,
  Param,
  Get,
  Post,
  JsonController,
  Body,
  QueryParams
} from "routing-controllers";
import { Context } from "koa";
import { Container, Service } from "typedi";
import Query from "../service/query";
const query = Container.get(Query);
@Service()
@JsonController("/api")
export default class {
  constructor(private query: Query) {
    this.query = new Query();
  }
  @Get("/star/list/all")
  async list_all() {
    return this.query.listAll(Star);
  }

  @Get("/star/list")
  async list(
    @QueryParams() query: { title: string; pageNo: number; pageSize: number }
  ) {
    const { title, pageNo, pageSize } = query;
    console.log(query);
    const where = `entity.title like :title`;
    const params = { title: `%${title}%` };
    return this.query.list(Star, where, params, pageNo, pageSize);
  }

  @Post("/star/create")
  public async create(@Body() body: { title: string; url: string }) {
    const { title } = body;
    if (!title) {
      return {
        code: 1003,
        msg: "标题不能为空"
      };
    }
    return this.query.create(Star, { title }, body);
  }

  @Post("/star/destroy")
  public async destroy(@Body() id: { id: number }) {
    return this.query.destroy(id, Star);
  }
}
