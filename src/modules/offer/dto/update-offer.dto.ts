import Location from '../../../types/location.js';

class UpdateOfferDto {
  public city?: string;
  public previewImage?: string;
  public images?: string[];
  public title?: string;
  public isPremium?: boolean;
  public rating?: number;
  public type?: string;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
  public description?: string;
  public location?: Location;
}

export default UpdateOfferDto;
