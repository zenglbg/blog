import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Article } from '../Models/article_info.entity';
import { from, of, combineLatest, forkJoin, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { map, switchMap } from 'rxjs/operators';
import { ApiException } from '@common/exceptions/api.exception';
import { ApiErrorCode } from '@common/enums/api-error-code.enum';
import * as dayjs from 'dayjs';
import { TagService } from '@modules/tag/services/tag.service';
import { CategoryService } from '@modules/Category/service/category.service';
import { ArticleContent } from '../Models/article_content.entity';
import { CreateArticleDto } from '../dtos/create.article.dto';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(ArticleContent)
    private readonly articleContentRepository: Repository<ArticleContent>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  /**
   * 添加分页查询参数
   */
  public queryMiddle(query, queryParams) {
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
      map(([_data, total]) => {
        // data.forEach(item => {
        //   if (item.needPassword) {
        //     delete item.context;
        //   }
        // });
        // console.log(data);
        const data = _data.reduce((acc, item) => {
          // delete item.context;
          acc.push(item);
          return acc;
        }, []);
        return {
          data,
          total,
        };
      }),
    );
  }

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
              ApiErrorCode.ARTICLE_TITLE_INVALID,
              HttpStatus.OK,
            );
          }
          const { tags, category, status } = article;

          if (status === 'publish') {
            Object.assign(article, {
              publishAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            });
          }

          return combineLatest([
            this.tagService.findByIds(`${tags}`),
            from(this.categoryService.findById(category)),
            of(article),
          ]);
        }),
      )
      .pipe(
        switchMap(([tags, existCategory, article]) => {
          // const newContent = this.articleContentRepository.create({
          //   content: article.content,
          // });

          const newArticle = this.articleRepository.create({
            ...article,
            category: existCategory,
            tags: tags,
            // content: newContent,
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
      // .leftJoinAndSelect('article.context', 'context')
      .orderBy('article.publishAt', 'DESC');

    return this.queryMiddle(query, queryParams);
  }

  /**
   * findArticleByCategory
   * 根据 category 查找文章
   */
  public findArticleByCategory(category, queryParams) {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .where('category.value=:value', { value: category })
      .orderBy('article.publishAt', 'DESC');

    return this.queryMiddle(query, queryParams);
  }

  /**
   * findArticleByTag
   *
   */
  public findArticleByTag(tag, queryParams) {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.tags', 'tag', 'tag.value=:value', {
        value: tag,
      })
      .orderBy('article.publishAt', 'DESC');

    return this.queryMiddle(query, queryParams);
  }

  /**
   * getArchives
   *
   */
  public getArchives() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return from(
      this.articleRepository.find({
        where: { status: 'publish' },
        order: { publishAt: 'DESC' },
      }),
    ).pipe(
      map(data => {
        return data.reduce((ret, d, index) => {
          const year = new Date(d.publishAt).getFullYear();
          const month = new Date(d.publishAt).getMonth();

          if (!ret[year]) {
            ret[year] = {};
          }

          if (!ret[year][months[month]]) {
            ret[year][months[month]] = [];
          }

          ret[year][months[month]].push(d);

          return ret;
        }, {});
      }),
    );
  }

  public recommend(articleId) {}

  /**
   * checkPassword
   *
   */
  public checkPassword(id, { password }) {
    return from(
      this.articleRepository
        .createQueryBuilder('article')
        .where('article.id=:id')
        .andWhere('article.password=:password')
        .setParameter('id', id)
        .setParameter('password', password)
        .getOne(),
    ).pipe(map(data => (!!data ? { pass: !!data, ...data } : { pass: false })));
  }

  /**
   * @function findById
   * 获取指定文章信息
   */
  public findById(id, status = null, isAdmin = false) {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tags')
      .where('article.id=:id')
      .orWhere('article.title=:title')
      .setParameter('id', id)
      .setParameter('title', id);

    if (status) {
      query.andWhere('article.status=:status').setParameter('status', status);
    }

    return from(query.getOne());
  }

  /**
   * updateById
   * 更新文章
   */
  public updateById(id, article: Partial<Article>) {
    // return from(this.articleRepository.findOne(id));
    console.log(article);
    const oldArticle$ = from(this.articleRepository.findOne(id));
    const { tags, category, status } = article;
    const obs$: any[] = [oldArticle$];
    if (tags) {
      const tags$ = from(this.tagService.findByIds(String(tags).split(',')));
      obs$.push(tags$);
    }
    if (category) {
      const category$ = from(this.categoryService.findById(category));
      obs$.push(category$);
    }

    return forkJoin(...obs$).pipe(
      map(data => {
        const [oldArticle, tags, category] = data;
        console.log(oldArticle, tags, category);

        // const newContentArticle = this.articleContentRepository.merge({
        //   content: article.content,
        // });
        const newArticle = {
          ...article,
          // content: newContentArticle,
          views: oldArticle.views,
          needPassword: !!article.password,
          publishAt:
            oldArticle.status === 'draft' && status === 'publish'
              ? dayjs().format('YYYY-MM-DD HH:mm:ss')
              : oldArticle.publishAt,
        };
        if (category) {
          Object.assign(newArticle, { category });
        }
        if (tags) {
          Object.assign(newArticle, { tags });
        }
        const updatedArticle = this.articleRepository.merge(
          oldArticle,
          newArticle,
        );

        return updatedArticle;
      }),
    );
  }

  public deleteById(id) {
    return from(this.articleRepository.findOne(id)).pipe(
      switchMap(existArticle => {
        if (existArticle) {
          return from(this.articleRepository.remove(existArticle));
        } else {
          throw new HttpException('文章删除失败', HttpStatus.BAD_REQUEST);
        }
      }),
    );
  }
}
