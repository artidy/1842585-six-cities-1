import {Expose} from 'class-transformer';

class BuildingTypeDto {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;
}

export default BuildingTypeDto;
