import {Expose} from 'class-transformer';

import Location from '../../../types/location.js';
import City from '../../../types/city.js';
import User from '../../../types/user.js';

class OfferDto {
  @Expose()
  public id!: number;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public title!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: string[];

  @Expose()
  public host!: User;

  @Expose()
  public description!: string;

  @Expose()
  public location!: Location;

  @Expose()
  public createdDate!: Date;

  @Expose()
  public commentCount!: number;
}

export default OfferDto;
