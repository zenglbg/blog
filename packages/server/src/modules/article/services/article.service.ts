import { Injectable, HttpStatus } from '@nestjs/common';
import { Article } from '../Models/article_info.entity';
import { from, of, combineLatest } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { map, switchMap } from 'rxjs/operators';
import { ApiException } from '@common/exceptions/api.exception';
import { ApiErrorCode } from '@common/enums/api-error-code.enum';
import * as dayjs from 'dayjs';
import { TagService } from '@modules/tag/service/tag.service';
import { CategoryService } from '@modules/Category/service/category.service';
import { ArticleContext } from '../Models/article_context.entity';
import { CreateArticleDto } from '../dtos/create.article.dto';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(ArticleContext)
    private readonly articleContextRepository: Repository<ArticleContext>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  /**
   * create
   */
  public create(article: CreateArticleDto) {
    const { title } = article;
    return from(this.articleRepository.findOne({ where: { title } }))
      .pipe(
        switchMap(exist => {
          if (exist) {
            throw new ApiException(
              '文章标题已存在',
              ApiErrorCode.USER_EMAIL_INVALID,
              HttpStatus.OK,
            );
          }
          const { tags, category, status } = article;

          if (status === 'publish') {
            Object.assign(article, {
              publishAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            });
          }

          return combineLatest(
            this.tagService.findByIds(`${tags}`),
            from(this.categoryService.findById(category)),
            of(article),
          );
        }),
      )
      .pipe(
        switchMap(([tags, existCategory, article]) => {
          const newContext = this.articleContextRepository.create({
            context: article.context,
          });
          const newArticle = this.articleRepository.create({
            ...article,
            category: existCategory,
            tags: tags,
            context: newContext,
            needPassword: !!article.password,
          });
          return from(this.articleRepository.save(newArticle));
        }),
      );
  }

  /**
   * findAll
   *
   */
  public findAll(queryParams: any = {}) {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.context', 'context')
      .orderBy('article.publishAt', 'DESC');

    const { page = 1, pageSize = 12, status, ...otherParams } = queryParams;

    query.skip((+page - 1) * pageSize);
    query.take(+pageSize);

    if (status) {
      query.andWhere('article.status=:status').setParameter('status', status);
    }

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query
          .andWhere(`article.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }

    return from(query.getManyAndCount()).pipe(
      map(([data, total]) => ({
        data,
        total,
      })),
    );

    // return from(this.articleRepository.find({ relations: ['context'] }));
  }
}
