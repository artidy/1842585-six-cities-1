import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass} from '@typegoose/typegoose';

import CreateFavoriteDto from './dto/create-favorite.dto.js';

const {ModelOptions, prop} = typegoose;

export interface FavoriteEntity extends Base {}

@ModelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class FavoriteEntity extends TimeStamps {
  constructor({offerId}: CreateFavoriteDto, userId: string) {
    super();

    this.offerId = offerId;
    this.userId = userId;
  }

  @prop({required: true})
  public offerId!: string;

  @prop({required: true})
  public userId!: string;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
