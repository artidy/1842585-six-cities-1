import Location from '../../types/location.js';

class CreateOfferDto {
  public city!: string;
  public previewImage!: string;
  public images!: string[];
  public title!: string;
  public isPremium!: boolean;
  public rating!: number;
  public type!: string;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public host!: string;
  public description!: string;
  public location!: Location;
  public id!: string;
  public createdDate!: Date;
}

export default CreateOfferDto;
