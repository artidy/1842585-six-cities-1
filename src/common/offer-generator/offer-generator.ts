import {generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems} from '../../utils/functions.js';
import MockData from '../../types/mock-data.js';
import {OfferGeneratorInterface} from './offer-generator.interface.js';
import City from '../../types/city.js';
import User from '../../types/user.js';
import dayjs from 'dayjs';

const MIN_RATING = 1;
const MAX_RATING = 5;
const DIGIT_RATING = 1;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_LATITUDE = 48.85661;
const MAX_LATITUDE = 53.550341;
const MIN_LONGITUDE = 2.351499;
const MAX_LONGITUDE = 10.000654;
const OFFER_ZOOM = 10;
const MIN_OFFER_ID = 1;
const MAX_OFFER_ID = 100000;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const randomCity: City = getRandomItem<City>(this.mockData.cities);
    const randomUser: User = getRandomItem<User>(this.mockData.authors);

    return [
      randomCity.name,
      randomCity.location.longitude,
      randomCity.location.latitude,
      randomCity.location.zoom,
      getRandomItem<string>(this.mockData.images),
      getRandomItems<string>(this.mockData.images).join(','),
      getRandomItem<string>(this.mockData.titles),
      getRandomBoolean(),
      getRandomBoolean(),
      generateRandomValue(MIN_RATING, MAX_RATING, DIGIT_RATING),
      getRandomItem<string>(this.mockData.buildings_type),
      generateRandomValue(MIN_ROOMS, MAX_ROOMS),
      generateRandomValue(MIN_GUESTS, MAX_GUESTS),
      generateRandomValue(MIN_PRICE, MAX_PRICE),
      getRandomItems<string>(this.mockData.goods).join(','),
      randomUser.name,
      randomUser.isPro,
      randomUser.avatarUrl,
      getRandomItem<string>(this.mockData.descriptions),
      generateRandomValue(MIN_LATITUDE, MAX_LATITUDE),
      generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE),
      OFFER_ZOOM,
      randomUser.id,
      generateRandomValue(MIN_OFFER_ID, MAX_OFFER_ID),
      dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day'),
    ].join('\t');
  }
}

export default OfferGenerator;
