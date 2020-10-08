import { Base } from '@common/entity/base.entity';
import { Column, Entity } from 'typeorm';


@Entity({
  name: 'file'
})
export class File extends Base {

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column()
  type: string;

  @Column()
  size: string;

  @Column()
  url: string;
}
