import { Star } from "../model/entity/star";
import { Ctx, Param, Get, Post, JsonController } from "routing-controllers";
import { Context } from "koa";
// import crypto from "crypto";
import { getRepository } from "typeorm";
import { Container, Inject, Service } from "typedi";
import Query from "../server/query";
const query = Container.get(Query);

@JsonController("/api")
export default class {
  @Get("/star/list")
  async list(@Ctx() ctx: Context) {
    const { title, pageNo, pageSize } = ctx.query;
    const where = `entity.title like :title`;
    const params = { title: `%${title}%` };
    return query.list(Star, where, params, pageNo, pageSize);
  }

  @Post("/star/create")
  public async create(@Ctx() ctx: Context) {
    const params = ctx.request.body;
    const { title } = params;
    if (!title) {
      return {
        code: 1003,
        msg: "标题不能为空"
      };
    }
    return query.create(Star, { title }, params);
  }

  @Post("/star/destroy")
  public async destroy(@Ctx() ctx: Context) {
    return query.destroy(ctx, Star);
  }
}
