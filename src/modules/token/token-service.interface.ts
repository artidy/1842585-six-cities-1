import {DocumentType} from '@typegoose/typegoose';

import CreateTokenDto from './dto/create-token.dto.js';
import {TokenEntity} from './token.entity.js';

interface TokenServiceInterface {
  create(dto: CreateTokenDto): Promise<DocumentType<TokenEntity>>;
  findByToken(token: string): Promise<DocumentType<TokenEntity> | null>;
  findByRefreshToken(refreshToken: string): Promise<DocumentType<TokenEntity> | null>;
  deleteByToken(token: string): Promise<void | null>;
  deleteByRefreshToken(refreshToken: string): Promise<void | null>;
}

export {TokenServiceInterface};
