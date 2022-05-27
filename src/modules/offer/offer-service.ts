import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {OfferServiceInterface} from './offer-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

const POPULATE_FIELDS = ['city', 'type', 'goods', 'host'];
const MAX_OFFERS_COUNT = 50;

@injectable()
class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly modelOffer: ModelType<OfferEntity>
  ) {}

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.modelOffer.aggregate([
      { $limit: MAX_OFFERS_COUNT },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offer_id',
          as: 'comments'
        }
      },
      {
        $addFields: { commentCount: { $size: '$comments' }}
      },
      { $unset: 'comments'}
    ]).exec();
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.modelOffer.create(dto);

    this.logger.info(`Добавлено новое предложение id: ${result.id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findById(id).populate(POPULATE_FIELDS).exec();
  }

  public async updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findByIdAndUpdate(id, dto, {new: true})
      .populate(POPULATE_FIELDS).exec();
  }

  public async deleteById(id: string): Promise<void | null> {
    return this.modelOffer.findByIdAndDelete(id);
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.modelOffer.exists({_id: documentId}) !== null);
  }
}

export default OfferService;
