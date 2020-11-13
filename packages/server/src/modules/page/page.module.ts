import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageController } from './page.controller';
import { Page } from './page.entity';
import { PageService } from './page.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), AuthModule],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
