import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm';
import { Category } from '../Models/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }


  /**
   * findById
   */
  public findById(id) {

    return this.categoryRepository.findOne(id)

  }
}