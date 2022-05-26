import {IsMongoId, Max, MaxLength, Min, MinLength} from 'class-validator';

import {getValidateMessage} from '../../../utils/functions.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';
import {COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, RATING_MAX, RATING_MIN} from '../../../common/const.js';

class CreateCommentDto {
  @MinLength(COMMENT_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, COMMENT_MIN_LENGTH)
  })
  @MaxLength(COMMENT_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, COMMENT_MAX_LENGTH)
  })
  public text!: string;

  @Min(RATING_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, RATING_MIN)})
  @Max(RATING_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, RATING_MAX)})
  public rating!: number;

  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public offerId!: string;

  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public userId!: string;
}

export default CreateCommentDto;
