import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsMongoId,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';

import Location from '../../../types/location.js';
import {getValidateMessage} from '../../../utils/functions.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';

const PREVIEW_MIN_LENGTH = 10;
const IMAGE_MIN_COUNT = 6;
const IMAGE_MAX_COUNT = 6;
const TITLE_MIN_LENGTH = 10;
const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MIN_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 1024;
const RATING_MIN = 1;
const RATING_MAX = 5;
const ROOMS_MIN = 1;
const ROOMS_MAX = 8;
const ADULTS_MIN = 1;
const ADULTS_MAX = 10;
const PRICE_MIN = 100;
const PRICE_MAX = 100000;

class CreateOfferDto {
  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public city!: string;

  @MinLength(PREVIEW_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, PREVIEW_MIN_LENGTH)
  })
  public previewImage!: string;

  @ArrayMinSize(IMAGE_MIN_COUNT, {
    message: getValidateMessage(ValidateTypeEnum.ArrayMinSize, IMAGE_MIN_COUNT)
  })
  @ArrayMaxSize(IMAGE_MAX_COUNT, {
    message: getValidateMessage(ValidateTypeEnum.ArrayMaxSize, IMAGE_MAX_COUNT)
  })
  public images!: string[];

  @MinLength(TITLE_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, TITLE_MIN_LENGTH)
  })
  @MaxLength(TITLE_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, TITLE_MAX_LENGTH)
  })
  public title!: string;

  @IsBoolean({message: getValidateMessage(ValidateTypeEnum.IsBoolean)})
  public isPremium!: boolean;

  @Min(RATING_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, RATING_MIN)})
  @Max(RATING_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, RATING_MAX)})
  public rating!: number;

  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public type!: string;

  @Min(ROOMS_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, ROOMS_MIN)})
  @Max(ROOMS_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, ROOMS_MAX)})
  public bedrooms!: number;

  @Min(ADULTS_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, ADULTS_MIN)})
  @Max(ADULTS_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, ADULTS_MAX)})
  public maxAdults!: number;

  @Min(PRICE_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, PRICE_MIN)})
  @Max(PRICE_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, PRICE_MAX)})
  public price!: number;

  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId), each: true})
  public goods!: string[];

  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public host!: string;

  @MinLength(DESCRIPTION_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, DESCRIPTION_MIN_LENGTH)
  })
  @MaxLength(DESCRIPTION_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, DESCRIPTION_MAX_LENGTH)
  })
  public description!: string;

  @ValidateNested({message: getValidateMessage(ValidateTypeEnum.ValidateNested)})
  public location!: Location;

  @IsDateString({message: getValidateMessage(ValidateTypeEnum.IsDateString)})
  public createdDate!: Date;
}

export default CreateOfferDto;
