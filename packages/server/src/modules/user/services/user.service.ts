import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, throwError, Observable, of } from 'rxjs';
import {
  switchMap,
  mergeMap,
  map,
  concatAll,
  catchError,
} from 'rxjs/operators';
import { User } from '../Models/user.entity';
import config from '../../../config/config.default';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.init();
  }

  public init() {
    const { name, password } = config().admin;

    this.createUser({
      name,
      password,
      role: 'admin',
    }).subscribe(
      function next(_) {
        console.log();
        console.log(
          `管理员账户创建成功，用户名：${name}，密码：${password}，请及时登录系统修改默认密码`,
        );
        console.log();
      },
      function error(_) {
        console.log();
        console.log(
          `管理员账户已经存在，用户名：${name}，密码：${password}，请及时登录系统修改默认密码`,
        );
        console.log();
      },
    );
  }

  public findAll(queryParams: any = {}): Observable<[User[], number]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.createAt', 'DESC');

    const { page = 1, pageSize = 12, status, ...otherParams } = queryParams;

    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);

    if (status) {
      query.andWhere('user.status=:status').setParameter('status', status);
    }

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query
          .andWhere(`user.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }
    return from(query.getManyAndCount());
  }

  /**
   * 创建用户
   * @param user
   */
  public createUser(user: Partial<User>) {
    const { name } = user;
    return from(this.userRepository.findOne({ where: { name } })).pipe(
      switchMap(existUser => {
        if (existUser) {
          throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        }
        const newUser = this.userRepository.create(user);
        return from(this.userRepository.save(newUser));
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  /**
   * 登录
   * @param user
   */
  public login(user: Partial<User>) {
    const { name, password } = user;
    return from(this.userRepository.findOne({ where: { name } })).pipe(
      switchMap(existUser => {
        if (!existUser) {
          throw new HttpException(`用户不存在`, HttpStatus.BAD_REQUEST);
        } else {
          return from(User.comparePassword(password, existUser.password)).pipe(
            map(isSame => {
              if (!isSame) {
                throw new HttpException(`密码错误`, HttpStatus.BAD_REQUEST);
              }
              if (existUser.status == 'locked') {
                throw new HttpException(
                  `用户已锁定，无法登录`,
                  HttpStatus.BAD_REQUEST,
                );
              }
              return existUser;
            }),
          );
        }
      }),
    );
  }

  /**
   * findByid
   */
  public findByid(id) {
    return from(this.userRepository.findOne(id));
  }
}
