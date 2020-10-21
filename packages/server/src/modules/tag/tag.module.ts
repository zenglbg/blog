import { Module } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './models/tag.entity';
import { TagController } from './controllers/tag.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  exports: [TagService],
  controllers: [TagController],
})
export class TagsModule {}
