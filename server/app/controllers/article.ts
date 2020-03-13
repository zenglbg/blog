import { Tag, Category, Article } from "../model/entity";
import {
  Ctx,
  Param,
  Get,
  Post,
  JsonController,
  Body
} from "routing-controllers";
// import crypto from "crypto";
import { Context } from "koa";
import { getRepository } from "typeorm";
import { Service, Inject } from "typedi";
import Query from "../service/query";
@Service()
@JsonController("/api")
export default class {
  constructor(private query: Query) {
    this.query = new Query();
  }

  @Get("/article/list")
  async list(@Ctx() ctx: Context) {
    console.log(` 被请求了文章列表`);

    const { title = "", pageNo = 1, pageSize = 5 } = ctx.query;
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

  @Get("/article/list/all")
  public async listAll() {
    const data: any = await this.query.listAll(Article);

    if (data.code === 1000) {
      data.data.forEach(function(v: any) {
        v.tag = v.tag.split(",");
        v.category = v.category.split(",");
      });
    }
    return data;
  }

  @Get("/article/item")
  async item(@Ctx() ctx: Context) {
    const { id } = ctx.query;

    const data = await Article.findOne({ id });
    if (data) {
      const _data = {
        ...data,
        tag: data.tag.split(","),
        category: data.category.split(",")
      };
      return {
        code: 1000,
        data: _data
      };
    }
    return {
      code: 1003,
      msg: "分类不存在"
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

  @Post("/article/create")
  async create(@Ctx() ctx: Context) {
    const params = (ctx.request as any).body;
    const { title, category, tag } = params;
    if (!title) {
      return {
        code: 1003,
        msg: "分类不能为空"
      };
    }
    // this.query.create(Tag, { name: tag }, { name: tag });
    // this.query.create(Category, { name: category }, { name: category });
    return this.query.create(Article, { title }, params);
  }

  @Post("/article/update")
  public async update(@Body() body: any) {
    const { id } = body;
    delete body.id;
    try {
      await Article.update({ id }, body);
      return {
        code: 1000,
        msg: "修改成功"
      };
    } catch (error) {
      console.log(error);
      return {
        code: 1003,
        msg: "服务器繁忙"
      };
    }
  }

  @Post("/article/destroy")
  public async destroy(@Body() id: { id: number }) {
    return this.query.destroy(id, Article);
  }
}
