import { Module } from '@nestjs/common';
import { ormProviders } from './orm.providers';

@Module({
  providers: [...ormProviders],
  exports: [...ormProviders],
})
export class OrmModule {}
