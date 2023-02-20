import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  create(
    createCategoryDto: Prisma.CategoryCreateInput,
  ): Promise<Category | null> {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  update(
    where: Prisma.CategoryWhereUniqueInput,
    updateCategoryDto: Prisma.CategoryUpdateInput,
  ) {
    return this.prisma.category.update({
      data: updateCategoryDto,
      where,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
