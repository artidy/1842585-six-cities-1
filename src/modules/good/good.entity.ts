import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import {getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

import CreateGoodDto from './create-good.dto.js';

export interface GoodEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'goods'
  }
})
export class GoodEntity extends TimeStamps {
  constructor({name}: CreateGoodDto) {
    super();

    this.name = name;
  }

  @prop({required: true})
  public name!: string;
}

export const GoodModel = getModelForClass(GoodEntity);
