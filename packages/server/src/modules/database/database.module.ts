import * as path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';


export const orm = (): DynamicModule => {
  return TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      ...config.get('ormconfig'),
      entities: [path.join(__dirname, '../../modules/**/**.entity{.ts,.js}')],
      migrations: [path.join(__dirname, './migrations')],
      synchronize: true,
      // logging: true,
    }),
    inject: [ConfigService],
  });
  // return TypeOrmModule.forRoot({
  //   ...config().ormconfig,
  //   entities: [path.join(__dirname, '../../modules/**/**.entity{.ts,.js}')],
  //   migrations: [path.join(__dirname, './migrations')],
  //   synchronize: true,
  //   // logging: true,
  // });
  // return TypeOrmModule.forRoot({
  //   type: 'mysql',
  //   host: config.databaseHost,
  //   port: config.databasePort,
  //   username: config.databaseUserName,
  //   password: config.databasePassword,
  //   database: config.databaseName,
  //   entities: [
  //     path.resolve(
  //       __dirname,
  //       `../${config.ormLoadingPath}/**/*.entity{.ts,.js}`,
  //     ),
  //   ],
  //   subscribers: [
  //     path.resolve(
  //       __dirname,
  //       `../${config.ormLoadingPath}/**/*.entity{.ts,.js}`,
  //     ),
  //   ],
  //   synchronize: config.databaseSynchronize,
  //   dropSchema: config.databaseDropSchema,
  // });
};
