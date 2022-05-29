import {IsEmail, MaxLength, MinLength} from 'class-validator';

import {getValidateMessage} from '../../../utils/functions.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from '../../../common/const.js';

class LoginUserDto {
  @IsEmail({message: getValidateMessage(ValidateTypeEnum.IsEmail)})
  public email!: string;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, PASSWORD_MIN_LENGTH)
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, PASSWORD_MAX_LENGTH)
  })
  public password!: string;
}

export default LoginUserDto;
