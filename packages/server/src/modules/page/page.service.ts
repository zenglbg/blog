import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs = require('dayjs');
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { Page } from './page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  create(page: Partial<Page>) {
    const { name, path } = page;

    from(this.pageRepository.findOne({ where: { path } })).pipe(
      switchMap(exist => {
        if (exist) {
          throw new HttpException('页面已存在', HttpStatus.BAD_REQUEST);
        }

        const newPage = this.pageRepository.create(page);
        return this.pageRepository.save(newPage);
      }),
    );
  }

  findall(queryParams: any = {}): Promise<[Page[], number]> {
    const query = this.pageRepository
      .createQueryBuilder('page')
      .orderBy('publishAt', 'DESC');

    const { page = 1, pageSize = 12, status, ...otherParams } = queryParams;

    query.skip((page - 1) * pageSize);
    query.take(pageSize);

    if (status) {
      query.andWhere('page.status=:status').setParameter('status', status);
    }

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query
          .andWhere(`page.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }

    return query.getManyAndCount();
  }

  findById(id: string | number): Promise<Page> {
    const query = this.pageRepository
      .createQueryBuilder('page')
      .where('page.id=:id')
      .orWhere('page.path=:path')
      .setParameter('id', id)
      .setParameter('path', id);

    return query.getOne();
  }

  updateViewById(id: string | number): Observable<Page> {
    return from(this.pageRepository.findOne(id)).pipe(
      switchMap(old => {
        const newPage = this.pageRepository.merge(old, {
          views: old.views++,
        });
        return this.pageRepository.save(newPage);
      }),
    );
  }

  updateById(id, page: Partial<Page>): Observable<Page> {
    return from(this.pageRepository.findOne(id)).pipe(
      switchMap(old => {
        const { status } = page;

        const newPage = {
          ...page,
          publishAt:
            status === 'publish'
              ? dayjs().format('YYYY-MM-DD HH:mm:ss')
              : old.publishAt,
        };

        const updatePage = this.pageRepository.merge(old, newPage);
        return this.pageRepository.save(updatePage);
      }),
    );
  }

  deleteById(id: string | number): Observable<Page> {
    return from(this.pageRepository.findOne(id)).pipe(
      switchMap(old => this.pageRepository.remove(old)),
    );
  }
}
