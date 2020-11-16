import { ArticleService } from '@modules/article/article.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Search } from './search.entity';
import { concat, from } from 'rxjs';
import { switchMap, tap, take, scan } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Search)
    private readonly searchRepository: Repository<Search>,
    private readonly articleService: ArticleService,
  ) {}

  searchArticle(type, keyword = '') {
    return concat(
      this.articleService.search(keyword),
      this.createRecord(type, keyword),
    ).pipe(
      // tap(console.log),
      scan(acc => acc),
    );
  }

  createRecord(type, keyword) {
    return from(
      this.searchRepository.findOne({
        where: { type, keyword },
      }),
    ).pipe(
      switchMap(exist => {
        let newData;
        if (exist) {
          const count = exist.count;
          newData = this.searchRepository.merge(exist, {
            count: count + 1,
          });
        } else {
          newData = this.searchRepository.create({ type, keyword });
        }
        return this.searchRepository.save(newData);
      }),
    );
  }

  findall(queryParams: any = {}) {
    const query = this.searchRepository
      .createQueryBuilder('search')
      .orderBy('search.updateAt', 'DESC');

    const { page = 1, pageSize = 12, pass, ...otherParams } = queryParams;

    query.skip((page - 1) * pageSize);
    query.take(pageSize);

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query
          .andWhere(`search.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }

    return query.getManyAndCount();
  }

  deleteById(id) {
    return from(this.searchRepository.findOne(id)).pipe(
      switchMap(exist => this.searchRepository.remove(exist)),
    );
  }
}
