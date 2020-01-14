import { Context } from "koa";
import { Service } from "typedi";
import { BaseEntity, Repository } from "typeorm";

@Service()
export default class Query {
  public async list(Entity, where, params, pageNo, pageSize) {
    try {
      const data = await Entity.createQueryBuilder("entity")
        .where(where)
        .offset((pageNo - 1) * pageSize)
        .limit(pageSize)
        .setParameters(params)
        .orderBy("createdAt", "DESC")
        .getMany();

      if (data) {
        return {
          code: 1000,
          data,
          total: data.length,
          msg: "success"
        };
      }
    } catch (err) {
      console.log(err);
      return {
        code: 1003,
        msg: "服务器繁忙"
      };
    }
  }

  public async listAll(Entity) {
    try {
      const data = await Entity.createQueryBuilder("entity")
        .orderBy("createdAt", "DESC")
        .getMany();

      if (data) {
        return {
          code: 1000,
          data
        };
      }
    } catch (err) {
      console.log(err);
      return {
        code: 1003,
        msg: "服务器繁忙"
      };
    }
  }

  public async create(Entity, query, save) {
    try {
      const category = await Entity.findOne(query);
      if (category) {
        return {
          code: 300,
          msg: "数据已存在"
        };
      }
      const data = await Entity.create(save).save();
      return {
        code: 1000,
        data
      };
    } catch (err) {
      console.log(err);
      return {
        code: 1003,
        msg: "服务器繁忙"
      };
    }
  }

  public async destroy(ctx: Context, Entity) {
    const params = (ctx.request as any).body;
    try {
      const res = await Entity.delete(params);
      if (res.affected === 1) {
        return {
          code: 1000,
          msg: "删除成功"
        };
      } else {
        return {
          code: 1003,
          msg: "此数据不存在"
        };
      }
    } catch (err) {
      return {
        code: 1003,
        msg: "服务器繁忙"
      };
    }
  }
}
