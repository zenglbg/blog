import { Injectable } from '@nestjs/common';
import { User } from '../../user/Models/user.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public login(user: Partial<User>) {
    return this.userService.login(user);
  }
}
