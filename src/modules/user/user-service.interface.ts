import {DocumentType} from '@typegoose/typegoose';

import CreateUserDto from './dto/create-user.dto.js';
import {UserEntity} from './user.entity.js';

interface UserServiceInterface {
  find(): Promise<DocumentType<UserEntity>[]>;
  create(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>>;
}

export {UserServiceInterface};
