import {DocumentType} from '@typegoose/typegoose';

import {CityEntity} from './city.entity.js';
import CreateCityDto from './create-city.dto.js';

interface CityServiceInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findById(id: string): Promise<DocumentType<CityEntity> | null>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
}

export {CityServiceInterface};
