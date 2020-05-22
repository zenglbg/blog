/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 创建 sequelize 实例
|
*/

import { Injectable, Scope } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import config from '../../config/config.default';
import { camelCase, upperFirst } from 'lodash';
import * as path from 'path';

export const ormProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        ...config().sequelize,
        ...{
          // 模型存放的目录
          modelPaths: [
            path.join(__dirname, '../../modules/**/*.model.{.ts,.js}'),
          ],
          // 判断当前文件是不是模型文件

          // 匹配模型的格式, 转换为大驼峰写法再比较
          // return upperFirst(camelCase(`${filename}_model`)) === member;

          /**
           * @desc
           *
           * 本来是应该要用上面的判断的，但是在实践中，为了避免 model 名重名了，所以在实际中，model 的 文件名会是简写
           * 但是 class 名会加上对应的 模块做前缀，所以这里只需要判断下 class 名是否含有 'Model' 字符，如果有，那么就可以认为当前文件为模型文件
           */
          modelMatch: (filename: string, member: string) =>
            member.includes('Model'),
        },
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
