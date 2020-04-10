import {
  Ctx,
  QueryParams,
  Get,
  Body,
  BodyParam,
  JsonController,
  Post,
  Session,
  Authorized,
} from "routing-controllers";
import { Articles } from "../../model/entity";
import { Service } from "typedi";
import { Mysql } from "../../service";
@Service()
@JsonController("/api/article")
export default class {
  constructor(private mysql: Mysql) {}

  @Authorized()
  @Post("/write")
  public async write(@Session() session: any, @Body() body: any) {
    const { user_name } = session;
    const { article_title, article_content } = body;
    if (!article_title && !article_content) {
      return {
        code: 201,
        msg: "文章信息不完整！",
      };
    }
    const article = await this.mysql.save(Articles, {
      user_name,
      article_title,
      article_content,
    });
    if (article) {
      return {
        code: 200,
        msg: "文章创建成功",
      };
    } else {
      return {
        code: 202,
        msg: "文章创建失败",
      };
    }
  }

  @Authorized()
  @Post("/del")
  public async delete(@BodyParam("article_id") article_id: number) {
    if (!article_id) {
      return {
        code: 206,
        msg: "文章id不能为空",
      };
    }
    const is_exist = await this.mysql.findOne(Articles, { article_id });
    if (is_exist) {
      await this.mysql.remove(Articles, { article_id });
      return {
        code: 200,
        msg: "文章已删除！",
      };
    }
    return {
      code: 202,
      msg: "要删除文章不存在！",
    };
  }

  @Authorized()
  @Post("/update")
  public async update(@Body() body: any) {
    const { article_id, article_title, article_content } = body;
    /**
     * 文章是否存在
     */
    if (!article_id && !article_title && !article_content) {
      return {
        code: 201,
        msg: "文章信息上传不完整",
      };
    }
    const is_exist = await this.mysql.findOne(Articles, { article_id });
    if (is_exist) {
      await this.mysql.update(
        Articles,
        { article_id },
        {
          article_title,
          article_content,
        }
      );
      return {
        code: 200,
        msg: "文章修改成功！",
      };
    } else {
      return {
        code: "202",
        msg: "没有找到要修改的文章！",
      };
    }
  }

  @Get("/list")
  public async list(@QueryParams() query: any) {
    const { article_title, pageNo = 1, pageSize = 5 } = query;
    const list = await this.mysql.list(
      Articles,
      "article_title",
      article_title,
      pageNo,
      pageSize
    );
    if (list) {
      return {
        code: 200,
        data: list,
      };
    } else {
      return {
        code: 201,
        msg: "无数据",
      };
    }
  }
  @Get("/list/all")
  public async listAll(@QueryParams() query: any) {
    const list = await Articles.find();
    if (list) {
      return {
        code: 200,
        data: list,
      };
    } else {
      return {
        code: 201,
        msg: "无数据",
      };
    }
  }
}
