import * as path from "path";
import * as Joi from "@hapi/joi";
import { ConfigModule } from "@nestjs/config";
import configBase from "./config.base";
import configApi from "./config.api";
import configDatabase from "./config.database";

export const configModule = () =>
  ConfigModule.forRoot({
    envFilePath: [
      path.resolve(__dirname, "../../../.env"),
    ],
    load: [configBase, configApi, configDatabase],
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid("development", "production", "test", "provision")
        .default("development"),
      PORT: Joi.number().default(3000),
      DATABASE_HOST: Joi.string(),
      DATABASE_PORT: Joi.number().default(3306),
    }),
    // validationOptions: {
    //   allowUnknown: false,
    //   abortEarly: true,
    // },
  });
