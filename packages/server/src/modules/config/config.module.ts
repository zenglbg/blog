import { Module, Global } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from './services/config.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        path.resolve(
          __dirname,
          `../../../env/${process.env.NODE_ENV_FILE}.env`,
        ),
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
