import { Tag } from "../model/entity/tag";
import {
  Ctx,
  Param,
  Get,
  Post,
  JsonController,
  Body,
} from "routing-controllers";
import { Context } from "koa";
// import crypto from "crypto";
import { Container, Service } from "typedi";
import { Query } from "../service";

const query = Container.get(Query);
@Service()
@JsonController("/api")
export default class {
  constructor(private query: Query) {
    this.query = new Query();
  }

  @Get("/tag/list")
  async list(@Ctx() ctx: Context) {
    const { name, pageNo, pageSize } = ctx.query;
    const where = `entity.name like :name`;
    const params = { name: `%${name}%` };
    return this.query.list(Tag, where, params, pageNo, pageSize);
  }

  @Get("/tag/list/all")
  public async listAll(@Ctx() ctx: Context) {
    return this.query.listAll(Tag);
  }

  @Post("/tag/create")
  public async create(@Ctx() ctx: Context) {
    const params = (ctx.request as any).body;
    if (!params.name) {
      return {
        code: 1003,
        msg: "分类不能为空",
      };
    }
    return this.query.create(Tag, { name: params.name }, params);
  }

  @Post("/tag/destroy")
  public async destroy(@Body() id: { id: number }) {
    return this.query.destroy(id, Tag);
  }
}
