import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { User } from '../user/Models/user.entity';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'lbg',
    });
  }

  validate(payload: User) {
    return this.authService.validateUser(payload).pipe(
      map(user => {
        console.log(`objectobjectobjectobjectobjectobjectobject`);
        console.log(333);
        if (!user) {
          throw new UnauthorizedException('身份验证失败');
        }
        return user;
      }),
      catchError(err => err),
    );
  }
}
