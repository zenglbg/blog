import {
  Injectable,
  SetMetadata,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  public canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    let token = request.headers.token;
    // console.log(token);
    if (/Bearer/.test(token)) {
      /**
       * 不需要 Bearer ，否则验证失败
       */
      token = token.split(' ').pop();
    }

    const user = this.jwtService.decode(token) as any;
    const hasRole = user && roles.some(role => role === user.role);
    // console.log(user, `user`, roles, user && user.role && hasRole);
    return user && user.role && hasRole;
  }
}
