import { User, EmailUser, Profiles, Option } from "../model/entity";
import { Request } from "express";

import {
  Ctx,
  Param,
  Get,
  Post,
  JsonController,
  Body,
  BodyParam,
  Session,
  Authorized,
  Req,
  CurrentUser,
} from "routing-controllers";
import { Service, Inject } from "typedi";
import { Mysql, Utils, Auth } from "../service";
import { Code } from "typeorm";

@Service()
@JsonController("/api/option")
export default class {
  @Inject()
  mysql: Mysql;
  @Inject()
  utils: Utils;
  @Inject()
  auth: Auth;

  @Authorized()
  @Post("/add")
  public async add(
    @Session() session: any,
    @Body() body: { option_name: string; option_values: string }
  ) {
    const { option_name, option_values } = body;
    const is_exist = await this.mysql.findOne(Option, { option_name });
    if (is_exist) {
      return {
        code: 201,
        msg: "数据已存在",
      };
    }
    const data = await this.mysql.save(Option, body);
    if (data) {
      return {
        code: 200,
        msg: "添加成功",
      };
    }
    return {
      code: 202,
      msg: "添加失败，请稍后再试！",
    };
  }
  @Authorized()
  @Post("/update")
  public async update(
    @Session() session: any,
    @Body() body: { option_name: string; option_values: string }
  ) {
    const { option_name } = body;
    const is_exist = await this.mysql.findOne(Option, { option_name });
    if (!is_exist) {
      return {
        code: 201,
        msg: "数据不存在",
      };
    }
    const data = await this.mysql.update(Option, { option_name }, body);
    if (data) {
      return {
        code: 200,
        msg: "修改成功",
      };
    }
    return {
      code: 202,
      msg: "修改失败，请稍后再试！",
    };
  }

  @Authorized()
  @Post("/del")
  public async del(
    @Session() session: any,
    @Body() body: { option_id: number }
  ) {
    const { option_id } = body;
    const is_exist = await this.mysql.findOne(Option, { option_id });
    console.log(is_exist);
    if (!is_exist) {
      return {
        code: 201,
        msg: "数据不存在",
      };
    }
    const data = await this.mysql.remove(Option, body);
    if (data) {
      return {
        code: 200,
        msg: "删除成功",
      };
    }
    return {
      code: 202,
      msg: "删除失败，请稍后再试！",
    };
  }

  @Get("/list/all")
  public async listAll() {
    const data = await this.mysql.findAll(Option);
    if (data) {
      return {
        code: 200,
        data,
      };
    }
    return {
      code: 202,
      msg: "没有查询到数据！",
    };
  }
}
