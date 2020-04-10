import { Service } from "typedi";
import { User } from "../model/entity";

interface BaseEntity {
  find?: Function;
}

@Service()
export class Mysql {
  public async findOne(Entity, key) {
    /**
     * key 是一个对象
     */
    return await Entity.findOne(key);
  }
  public async findAll(Entity: any) {
    return await Entity.find();
  }
  public async save<T>(Entity: any, save: T) {
    return await Entity.create(save).save();
  }
  public async remove(Entity: any, key) {
    let entityToRomove = await this.findOne(Entity, key);
    return await Entity.remove(entityToRomove);
  }
  public async update(Entity: any, where: any, update: any) {
    return await Entity.createQueryBuilder("emailUser")
      .update(Entity)
      .set(update)
      .where(where)
      .execute();
  }
  public async list(
    Entity,
    key: string,
    val: string,
    pageNo: number,
    pageSize: number
  ) {
    return await Entity.createQueryBuilder("entity")
      .where(`entity.${key} like :${key}`)
      .offset((pageNo - 1) * pageSize)
      .limit(pageSize)
      .setParameters({
        [key]: `%${val}%`,
      })
      .orderBy("createdAt", "DESC")
      .getMany();
  }
  public async listAll(Entity) {
    return await Entity.createQueryBuilder("entity")
      .orderBy("createdAt", "DESC")
      .getMany();
  }
}
