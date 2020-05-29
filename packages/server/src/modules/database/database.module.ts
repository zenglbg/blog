import { Module, DynamicModule } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/services/config.service';
import * as path from 'path';

const orm = (): DynamicModule => {
  const config = new ConfigService(
    path.resolve(__dirname, `../../../env/${process.env.NODE_ENV}.env`),
  );

  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: config.databaseHost,
    port: config.databasePort,
    username: config.databaseUserName,
    password: config.databasePassword,
    database: config.databaseName,
    entities: [
      path.resolve(
        __dirname,
        `../${config.ormLoadingPath}/**/*.entity{.ts,.js}`,
      ),
    ],
    subscribers: [
      path.resolve(
        __dirname,
        `../${config.ormLoadingPath}/**/*.entity{.ts,.js}`,
      ),
    ],
    synchronize: config.databaseSynchronize,
    dropSchema: config.databaseDropSchema,
  });
};
