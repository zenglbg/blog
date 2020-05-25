import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt.strategy';

const passModule = PassportModule.register({
  defaultStrategy: 'jwt',
});
const jwtModule = JwtModule.register({
  // secret: 'lbg',
  secretOrPrivateKey: 'lbg',
  signOptions: {
    expiresIn: '4h',
  },
});
@Module({
  imports: [forwardRef(() => UserModule), passModule, jwtModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [passModule, jwtModule],
})
export class AuthModule {}
