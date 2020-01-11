import { Article } from "../model/entity/article";
import { Ctx, Param, Get, Post, JsonController } from "routing-controllers";
// import crypto from "crypto";
import { Container } from "typedi";
import { Context } from "koa";
import { getRepository } from "typeorm";

@JsonController("/api")
export default class {
  @Get("/article/list")
  async list(@Ctx() ctx: Context) {
    // const article = new Article();
    // const i = 123;
    // article.title = "blog 迁移到 http://xiangxi.red/doc" + i;
    // article.readedCount = 45 + i;
    // article.author = "gong" + i;
    // article.summary = "迁移" + i;
    // article.category = "前端" + i;
    // article.tag = "JS" + i;
    // article.content = `<p><a href="http://xiangxi.red/doc" target="_self">doc</a>&nbsp;</p>↵`;
    // await article.save();
    const { title = "blog", pageNo = 1, pageSize = 5 } = ctx.query;
    const data = await getRepository(Article)
      .createQueryBuilder("article")
      .where("article.title like :param")
      .setParameters({
        param: `%${title}%`
      })
      .offset((+pageNo - 1) * +pageSize)
      .limit(pageSize)
      .orderBy("createdAt", "DESC")
      .getMany();

    data.forEach(function(v: any) {
      v.tag = v.tag.split(",");
      v.category = v.category.split(",");
    });

    return {
      code: 1000,
      data,
      tatol: data.length,
      msg: "success"
    };
  }

  @Get("/article/listAll")
  async listAll(@Ctx() ctx: Context) {
    const listAll = await Article.createQueryBuilder("article")
      .orderBy("createdAt", "DESC")
      .getMany();

    return {
      code: 1000,
      data: listAll,
      msg: "success"
    };
  }

  @Get("/article/item")
  async item(@Ctx() ctx: Context) {
    const { id } = ctx.query;

    const data = await Article.findOne({ id });
    const _data = {
      ...data,
      tag: data.tag.split(","),
      category: data.category.split(",")
    };
    console.log(data, _data);
    return {
      code: 1000,
      data: _data
    };
  }

  @Get("/article/detail")
  async detail(@Ctx() ctx: Context) {
    const { id } = ctx.query;
    let article = await Article.findOne({ id });
    article.readedCount++;
    await Article.save(article);
    return {
      code: 1000,
      data: {
        ...article,
        tag: article.tag.split(","),
        category: article.category.split(",")
      }
    };
  }
}
