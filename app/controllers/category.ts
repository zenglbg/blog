import { Category } from "../model/entity/category";
import { Ctx, Param, Get, Post, JsonController } from "routing-controllers";
import { Context } from "koa";
// import crypto from "crypto";
import { Container, Inject, Service } from "typedi";
import Query from "../server/query";
const query = Container.get(Query);

@JsonController("/api")
export default class {
  @Get("/category/list")
  async list(@Ctx() ctx: Context) {
    const { name, pageNo, pageSize } = ctx.query;
    const where = `entity.name like :name`;
    const params = { name: `%${name}%` };
    return query.list(Category, where, params, pageNo, pageSize);
  }

  @Get("/category/list/all")
  public async listAll(@Ctx() ctx: Context) {
    return query.listAll(Category);
  }

  @Post("/category/create")
  public async create(@Ctx() ctx: Context) {
    const { name } = (ctx.request as any).body;
    if (!name) {
      return {
        code: 1003,
        msg: "分类不能为空"
      };
    }
    return query.create(Category, { name }, { name });
  }

  @Post("/category/destroy")
  public async destroy(@Ctx() ctx: Context) {
    return query.destroy(ctx, Category);
  }
}
