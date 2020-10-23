import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

const passModule = PassportModule.register({
  defaultStrategy: 'jwt',
});
const jwtModule = JwtModule.register({
  secret: 'lbg',
  signOptions: {
    expiresIn: '4h',
  },
});
@Module({
  imports: [forwardRef(() => UserModule), passModule, jwtModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [passModule, jwtModule, AuthService],
})
export class AuthModule {}
