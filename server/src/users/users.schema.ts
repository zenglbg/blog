import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookAsyncCallback, HookNextFunction } from 'mongoose';
import { compareSync, encryptPassword } from 'src/common/utils';
import { v4 } from 'uuid';

export enum Roles {
  SUPERUSER = 0,
  ADMIN = 1,
  USER = 2,
  NOT_CERTIFIED = 3,
}

export type UserDocument = User & Document;

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
    required: true,
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
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  location: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: true,
  })
  avatarUrl: string;

  @Prop({
    type: String,
    // required: true,
  })
  age: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next: HookNextFunction) {
  this.password = encryptPassword(this.password);
  next();
});

UserSchema.methods.isValidPassword = function (password: string): boolean {
  return compareSync(password, this.password);
};

export { UserSchema };
