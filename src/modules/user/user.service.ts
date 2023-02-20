import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import { User, Prisma, Profile } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll(where: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(where);
  }

  findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  createProfile(profile: Prisma.ProfileCreateInput): Promise<Profile | null> {
    return this.prisma.profile.create({
      data: profile,
    });
  }

  getProfile(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        Profile: true,
      },
    });
  }
}
