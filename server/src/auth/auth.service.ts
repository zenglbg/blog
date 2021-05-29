import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { ajax } from 'src/common/fetch';
import { UserService } from 'src/users/user.service';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async doLogin({ username, password }) {
    const user = await this.userService.getByInfo({ username });
    const qqPage = await ajax('http://qq.com');

    if (user) {
      return user.isValidPassword(password, user.password);
    }
    return {
      code: HttpStatus.OK,
      msg: `未找到用户`,
      qqPage,
    };
  }
}
