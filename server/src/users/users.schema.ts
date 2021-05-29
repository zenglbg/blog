import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import { compareSync, encryptPassword, md5 } from 'src/common/utils';
import { v4 } from 'uuid';

export enum Roles {
  SUPERUSER = 0,
  ADMIN = 1,
  USER = 2,
  NOT_CERTIFIED = 3,
}

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    default: v4,
  })
  _id: string;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: false,
  })
  password: string;

  @Prop({
    type: String,
    // required: true,
  })
  email: string;

  @Prop({
    type: Number,
    default: Roles.NOT_CERTIFIED,
    required: true,
  })
  role: number;

  @Prop({
    type: String,
    // required: true,
  })
  name: string;

  @Prop({
    type: String,
    // required: true,
  })
  location: string;

  @Prop({
    type: String,
    // required: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    // required: true,
  })
  avatarUrl: string;

  @Prop({
    type: String,
    // required: true,
  })
  age: string;

  @Prop({
    type: String,
    // required: true,
  })
  sign: string;
}

export type typeUser = {
  isValidPassword(password: string): boolean;
} & User;

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next: HookNextFunction) {
  this.password = encryptPassword(this.password);
  this.sign = md5(v4());
  next();
});

UserSchema.methods.isValidPassword = function (password: string): boolean {
  return compareSync(password, this.password);
};

export { UserSchema };
