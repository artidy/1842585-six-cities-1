import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import {getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

import CreateBuildingTypeDto from './create-building-type.dto.js';

export interface BuildingTypeEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'building_types'
  }
})
export class BuildingTypeEntity extends TimeStamps {
  constructor({name}: CreateBuildingTypeDto) {
    super();

    this.name = name;
  }

  @prop({required: true})
  public name!: string;
}

export const BuildingTypeModel = getModelForClass(BuildingTypeEntity);
