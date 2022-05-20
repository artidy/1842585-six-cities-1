import {ClassConstructor, plainToInstance} from 'class-transformer';

import {DatabaseOptions} from '../types/database-options.js';
import ValidateTypeEnum from '../types/validate-type.enum.js';

const generateRandomValue = (min: number, max: number, digit = 0): number =>
  +((Math.random() * (max - min)) + min).toFixed(digit);

const getRandomItem = <T>(items: T[]): T =>
  items[generateRandomValue(0, items.length - 1)];

const getRandomBoolean = (): boolean => Boolean(generateRandomValue(0, 1));

const getRandomItems = <T>(items: T[]): T[] => {
  const itemsCount = generateRandomValue(1, items.length);
  const result = [] as T[];

  while (result.length < itemsCount) {
    const randomItem = getRandomItem(items);

    if (!result.includes(randomItem)) {
      result.push(randomItem);
    }
  }

  return result;
};

const getOptionsString = (options: DatabaseOptions): string => {
  const optionsKeys = Object.keys(options);

  return optionsKeys.reduce((prev, current) =>
    `${prev === '' ? '?' : ''}${current}=${options[current as keyof DatabaseOptions]}`, '');
};

const getMongodbURI = (
  username: string,
  password: string,
  host: string,
  port: number,
  databaseName: string,
  options: DatabaseOptions = {}
): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}${getOptionsString(options)}`;

const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

const createErrorObject = (message: string) => ({
  error: message,
});

const getValidateMessage = (validateType: ValidateTypeEnum, value: string | number = ''): string => {
  switch(validateType) {
    case ValidateTypeEnum.MinLength:
      return `должно содержать значение длиной не меньше ${value} символов.`;
    case ValidateTypeEnum.Maxlength:
      return `должно содержать значение длиной больше ${value} символов.`;
    case ValidateTypeEnum.IsDateString:
      return 'должно быть в формате даты ISO.';
    case ValidateTypeEnum.IsEnum:
      return `должно содержать значение из перечисления ${value}`;
    case ValidateTypeEnum.IsMongoId:
      return 'некорректный формат идентификатора.';
    case ValidateTypeEnum.ArrayMinSize:
      return `должен содержать минимум ${value} значений.`;
    case ValidateTypeEnum.ArrayMaxSize:
      return `должен содержать максимум ${value} значений.`;
    case ValidateTypeEnum.IsBoolean:
      return 'должно быть типом булево.';
    case ValidateTypeEnum.Min:
      return `должно содержать число больше ${value}.`;
    case ValidateTypeEnum.Max:
      return `должно содержать число не больше ${value}.`;
    case ValidateTypeEnum.ValidateNested:
      return 'неверный формат значения';
    case ValidateTypeEnum.IsEmail:
      return 'неверный формат электронного адреса';
    default:
      return `${validateType} - неизвестная ошибка.`;
  }
};

export {
  generateRandomValue,
  getRandomItem,
  getRandomBoolean,
  getRandomItems,
  getMongodbURI,
  fillDTO,
  createErrorObject,
  getValidateMessage
};
