import {hash} from 'bcrypt';
import {getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';

import CreateUserDto from './create-user.dto.js';
import User from '../../types/user.js';

export interface UserEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends TimeStamps implements User {
  constructor({avatarUrl, name, isPro, email}: CreateUserDto) {
    super();

    this.email = email;
    this.avatarUrl = avatarUrl;
    this.name = name;
    this.isPro = isPro;
  }

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ required: true, default: '' })
  public avatarUrl!: string;

  @prop({ required: true, default: 'Новый пользователь' })
  public name!: string;

  @prop({ required: true, default: false })
  public isPro!: boolean;

  @prop({ required: true })
  private password!: string;

  public async setPassword(password: string, salt: string) {
    this.password = await hash(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
