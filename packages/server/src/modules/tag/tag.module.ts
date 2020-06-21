import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './Models/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  exports: [TagService]
})
export class TagsModule { }
