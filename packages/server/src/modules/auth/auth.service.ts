import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';
import { of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { exist } from '@hapi/joi';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    /**
     * 注入jwtService
     */
    private readonly jwtService: JwtService,
  ) {}

  public createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  public login(user: Partial<User>) {
    return this.userService.login(user).pipe(
      map(data => {
        const { id, name, email, role } = data;
        const token = this.createToken({ id, name, email, role });
        if (token) {
          return Object.assign(data, { token });
        }
        return data;
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  public isAdmin(token: string) {
    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop();
    }

    try {
      const { id } = this.jwtService.decode(token) as Partial<User>;
      return this.userService
        .findByid(id)
        .pipe(map(user => id && user.role === 'admin'));
    } catch (error) {
      return of(false);
    }
  }

  public validateUser(payload: User) {
    return this.userService.findByid(payload.id);
  }
}
