import { Column, BaseEntity } from "typeorm";

export default class Base extends BaseEntity {
  @Column({
    type: "datetime"
  })
  createdAt: Date;

  @Column({
    type: "datetime"
  })
  updatedAt: Date;
}
