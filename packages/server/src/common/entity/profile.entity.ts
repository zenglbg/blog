import { Column } from 'typeorm'


export class Profile {

  @Column()
  phone: string;


  @Column()
  height: number;


  @Column()
  weight: number


  @Column()
  age: number;

}