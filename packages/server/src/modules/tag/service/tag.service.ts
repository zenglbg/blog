import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm';
import { Tag } from '../Models/tag.entity';
import { from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) { }


  /**
   * findId
   * 
   */
  public findById(id: any) {
    return from(
      this.tagRepository
        .createQueryBuilder('tag')
        .where('tag.id=:id')
        .orWhere('tag.label=:id')
        .orWhere('tag.value=:id')
        .setParameter('id', id)
        .getOne()
    )
  }



  /**
   * findByIds
   */
  public findByIds(ids) {
    return from(this.tagRepository.findByIds(ids))
  }
}
