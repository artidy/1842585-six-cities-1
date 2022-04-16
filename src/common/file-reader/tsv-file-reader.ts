import {readFileSync} from 'fs';

import {FileReaderInterface} from './file-reader.interface.js';
import Offer from '../../types/offer.js';

class TsvFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public fileName: string) { }

  public read(): void {
    this.rawData = readFileSync(this.fileName, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        cityName,
        cityLatitude,
        cityLongitude,
        cityZoom,
        previewImage,
        images,
        title,
        isFavorite,
        isPremium,
        rating,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        hostName,
        hostType,
        hostAvatar,
        description,
        latitude,
        longitude,
        zoom,
        hostId,
        id
      ]) => ({
        city: {
          name: cityName,
          location: {
            latitude: +cityLatitude,
            longitude: +cityLongitude,
            zoom: +cityZoom,
          },
        },
        previewImage,
        images: images.split(','),
        title,
        isFavorite: Boolean(isFavorite),
        isPremium: Boolean(isPremium),
        rating: +rating,
        type,
        bedrooms: +bedrooms,
        maxAdults: +maxAdults,
        price: +price,
        goods: goods.split(','),
        host: {
          name: hostName,
          avatarUrl: hostAvatar,
          isPro: Boolean(hostType),
          id: +hostId,
        },
        description,
        location: {
          latitude: +latitude,
          longitude: +longitude,
          zoom: +zoom,
        },
        id: +id,
      }));
  }
}

export default TsvFileReader;
