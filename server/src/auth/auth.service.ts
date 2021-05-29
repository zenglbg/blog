import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken() {
    return 11;
  }

  async doLogin({ username, password }) {
    return this.userService.validateUser(username, password);
  }
}
