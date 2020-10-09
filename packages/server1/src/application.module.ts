import { Module } from "@nestjs/common";
import { RenderModule } from "nest-next";
import Next from "next";

import { configModule } from "./modules/config/config.module";
import { ViewsModule } from "./modules/views/views.module";
import { orm } from "./modules/database/database.module";
@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== "production" })
    ),
    configModule(),
    ViewsModule,
    orm()
  ],
  controllers: [],
})
export class AppModule {}
