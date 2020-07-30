import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '../Models/tag.entity';
import { from, Observable, of } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(tag: Partial<Tag>): Observable<Tag> {
    const { label } = tag;
    return from(this.tagRepository.findOne({ where: { label } })).pipe(
      switchMap(existTag => {
        if (existTag) {
          throw new HttpException('标签已存在', HttpStatus.BAD_REQUEST);
        }

        const newTag = this.tagRepository.create(tag);
        return from(this.tagRepository.save(newTag)).pipe(map(_ => newTag));
      }),
    );
  }

  /**
   * findAll
   *
   */
  public findAll(queryParams): Observable<Tag[]> {
    const { articleStatus } = queryParams;
    const qb = this.tagRepository
      .createQueryBuilder('tag')
      .orderBy('tag.createAt', 'ASC');

    if (articleStatus) {
      qb.leftJoinAndSelect(
        'tag.articles',
        'articles',
        'articles.status=:status',
        {
          status: articleStatus,
        },
      );
    } else {
      qb.leftJoinAndSelect('tag.articles', 'articles');
    }
    return from(qb.getMany());
  }
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
        .getOne(),
    );
  }

  /**
   * getArticleById
   *
   */
  public getArticleById(id, status = null): Observable<Tag> {
    return from(
      this.tagRepository
        .createQueryBuilder('tag')
        .leftJoinAndSelect('tag.articles', 'articles')
        .orderBy('articles.updateAt', 'DESC')
        .where('tag.id=:id')
        .orWhere('tag.label=:id')
        .orWhere('tag.value=:id')
        .setParameter('id', id)
        .getOne(),
    );
  }

  /**
   * findByIds
   */
  public findByIds(ids) {
    return from(this.tagRepository.findByIds(ids));
  }

  /**
   * updateById
   *
   */
  public updateById(id, tag: Partial<Tag>): Observable<Tag> {
    return from(this.tagRepository.findOne(id)).pipe(
      switchMap(oldTag => {
        const updateTag = this.tagRepository.merge(oldTag, tag);
        return from(this.tagRepository.save(updateTag));
      }),
    );
  }

  /**
   * deleteById
   *
   */
  public deleteById(id) {
    return from(this.tagRepository.findOne(id)).pipe(
      map(tag => this.tagRepository.remove(tag)),
    );
  }
}
