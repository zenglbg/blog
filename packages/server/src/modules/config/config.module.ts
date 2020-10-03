import * as path from 'path';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration'


export const configModule = () =>
  ConfigModule.forRoot({
    envFilePath: [path.resolve(__dirname, '../../../env/dev.env')],
    load: [configuration],
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      DATABASE_HOST: Joi.string(),
      DATABASE_PORT: Joi.number().default(3306)
    }),
    // validationOptions: {
    //   allowUnknown: false,
    //   abortEarly: true,
    // },
  });
