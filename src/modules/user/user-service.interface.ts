import {DocumentType} from '@typegoose/typegoose';

import CreateUserDto from './create-user.dto.js';
import {UserEntity} from './user.entity.js';

interface UserServiceInterface {
  create(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>>;
}

export {UserServiceInterface};
