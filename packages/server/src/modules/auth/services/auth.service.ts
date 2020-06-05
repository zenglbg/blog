import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/Models/user.entity';
import { UserService } from '../../user/services/user.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  public validateUser(payload: User) {
    return this.userService.findByid(payload.id);
  }
}
