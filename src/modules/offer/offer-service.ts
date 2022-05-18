import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {OfferServiceInterface} from './offer-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';

@injectable()
class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly modelOffer: ModelType<OfferEntity>
  ) {}

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.modelOffer.find();
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.modelOffer.create(dto);

    this.logger.info(`Добавлено новое предложение id: ${result.id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findById(id).populate(['city', 'type', 'goods', 'host']).exec();
  }

  public async updateById(id: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findByIdAndUpdate(id, dto);
  }

  public async deleteById(id: string): Promise<void | null> {
    return this.modelOffer.findByIdAndDelete(id);
  }
}

export default OfferService;
