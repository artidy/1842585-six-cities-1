import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {OfferServiceInterface} from './offer-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './create-offer.dto.js';

@injectable()
class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly modelOffer: ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.modelOffer.create(dto);

    this.logger.info(`Добавлено новое предложение id: ${result.id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findById(id);
  }
}

export default OfferService;