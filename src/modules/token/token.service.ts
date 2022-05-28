import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {Component} from '../../types/component.types.js';
import {TokenServiceInterface} from './token-service.interface.js';
import {TokenEntity} from './token.entity.js';
import CreateTokenDto from './dto/create-token.dto.js';

@injectable()
class TokenService implements TokenServiceInterface {
  constructor(
    @inject(Component.TokenModel) private readonly tokenModel: ModelType<TokenEntity>
  ) {}

  public async create(dto: CreateTokenDto): Promise<DocumentType<TokenEntity>> {
    return this.tokenModel.create(dto);
  }

  public async findByToken(token: string): Promise<DocumentType<TokenEntity> | null> {
    return this.tokenModel.findOne({token});
  }

  public async findByRefreshToken(refreshToken: string): Promise<DocumentType<TokenEntity> | null> {
    return this.tokenModel.findOne({refreshToken});
  }

  public async deleteByToken(token: string): Promise<void | null> {
    return this.tokenModel.findOneAndDelete({token});
  }

  public async deleteByRefreshToken(refreshToken: string): Promise<void | null> {
    return this.tokenModel.findOneAndDelete({refreshToken});
  }
}

export default TokenService;
