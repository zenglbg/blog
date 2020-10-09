import * as path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';


export const orm = (): DynamicModule => {
  return TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      ...config.get('database').ormConfig,
      entities: [path.join(__dirname, '../../modules/**/**.entity{.ts,.js}')],
      migrations: [path.join(__dirname, './migrations')],
      synchronize: true,
      // logging: true,
    }),
    inject: [ConfigService],
  }); 
};
