import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../Models/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * create
   */
  public create(category) {
    const { label } = category;
    // return {category}
    return from(this.categoryRepository.findOne({ where: { label } })).pipe(
      switchMap(existcategory => {
        console.log(existcategory);
        if (existcategory) {
          throw new HttpException('分类已经存在', HttpStatus.BAD_REQUEST);
        }

        const newCategory = this.categoryRepository.create(category);
        return from(this.categoryRepository.save(newCategory));
      }),
    );
  }

  /**
   * findAll
   *
   */
  public findAll(queryParams) {
    const { articleStatus } = queryParams;
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.createAt', 'ASC');

    if (articleStatus) {
      qb.leftJoinAndSelect(
        'category.articles',
        'articles',
        'articles.status=:status',
        {
          status: articleStatus,
        },
      );
    } else {
      qb.leftJoinAndSelect('category.articles', 'articles');
    }

    return from(qb.getMany());
  }

  /**
   * findById
   */
  public findById(id) {
    return from(
      this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id=:id')
        .orWhere('category.label=:id')
        .orWhere('category.value=:id')
        .setParameter('id', id)
        .getOne(),
    );
  }

  findByIds(ids) {
    return this.categoryRepository.findByIds(ids);
  }

  /**
   * 更新分类
   * @param id
   * @param Category
   */
  updateById(id, category: Partial<Category>) {
    return from(this.categoryRepository.findOne(id)).pipe(
      switchMap(oldCategory => {
        if (oldCategory) {
          const updateCategory = this.categoryRepository.merge(
            oldCategory,
            category,
          );
          return from(this.categoryRepository.save(updateCategory));
        }
      }),
    );
  }

  /**
   * 删除分类
   * @param id
   */
  deleteById(id) {
    return from(this.categoryRepository.findOne(id))
      .pipe(
        switchMap(existcategory => {
          console.log(`existcategory`, existcategory);
          if (existcategory) {
            return from(
              this.categoryRepository
                .createQueryBuilder()
                .delete()
                .where('id = :id', { id })
                .execute(),
            );
          } else {
            throw new HttpException('分类不存在', HttpStatus.BAD_REQUEST);
          }
        }),
      )
      .pipe(
        map(result => {
          console.log(result);
          return result;
        }),
      );
  }
}
