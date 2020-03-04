import { Tag } from "../model/entity/tag";
import { Ctx, Param, Get, Post, JsonController } from "routing-controllers";
import { Context } from "koa";
// import crypto from "crypto";
import { getRepository } from "typeorm";
import { Container, Inject, Service } from "typedi";
import Query from "../service/query";
const query = Container.get(Query);

@JsonController("/api")
export default class {
  @Get("/tag/list")
  async list(@Ctx() ctx: Context) {
    const { name, pageNo, pageSize } = ctx.query;
    const where = `entity.name like :name`;
    const params = { name: `%${name}%` };
    return query.list(Tag, where, params, pageNo, pageSize);
  }

  @Get("/tag/list/all")
  public async listAll(@Ctx() ctx: Context) {
    return query.listAll(Tag);
  }

  @Post("/tag/create")
  public async create(@Ctx() ctx: Context) {
    const params = (ctx.request as any).body;
    if (!params.name) {
      return {
        code: 1003,
        msg: "分类不能为空"
      };
    }
    return query.create(Tag, { name: params.name }, params);
  }

  @Post("/tag/destroy")
  public async destroy(@Ctx() ctx: Context) {
    return query.destroy(ctx, Tag);
  }
}
