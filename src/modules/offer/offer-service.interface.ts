import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';

interface OfferServiceInterface extends DocumentExistsInterface{
  find(offerId: string): Promise<DocumentType<OfferEntity>[]>;
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string): Promise<void | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  decCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}

export {OfferServiceInterface};
