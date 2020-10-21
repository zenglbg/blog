import * as path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

export const orm = (): DynamicModule => {
  return TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService): ConnectionOptions => ({
      ...config.get('database').ormConfig,
      database: process.env.DATABASE_DB || 'blog', // 数据库名称
      host: process.env.DATABASE_HOST || '127.0.0.1', // 数据库地址
      port: Number(process.env.DATABASE_PORT) || 3306, // 数据库端口
      username: process.env.DATABASE_USER || 'lerna', // 用户名
      password: process.env.DATABASE_PWD || 'secret', // 密码
      entities: [
        path.resolve(__dirname, '../../modules/**/**.entity{.ts,.js}'),
      ],
      migrations: [path.resolve(__dirname, './migrations')],
      synchronize: !!Number(process.env.DATABASE_SYNCHRONIZE),
      logging: !!Number(process.env.DATABASE_LOGGING),
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
