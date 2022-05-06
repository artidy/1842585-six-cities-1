import {DocumentType} from '@typegoose/typegoose';
import {GoodEntity} from './good.entity.js';
import CreateGoodDto from './create-good.dto.js';

interface GoodServiceInterface {
  create(dto: CreateGoodDto): Promise<DocumentType<GoodEntity>>;
  findById(id: string): Promise<DocumentType<GoodEntity> | null>;
  findByName(name: string): Promise<DocumentType<GoodEntity> | null>;
  findOrCreate(dto: CreateGoodDto): Promise<DocumentType<GoodEntity>>;
}

export {GoodServiceInterface};
