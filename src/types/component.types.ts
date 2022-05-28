const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserModel: Symbol.for('UserModel'),
  CityModel: Symbol.for('CityModel'),
  GoodModel: Symbol.for('GoodModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  FavoriteModel: Symbol.for('FavoriteModel'),
  BuildingTypeModel: Symbol.for('BuildingTypeModel'),
  TokenModel: Symbol.for('TokenModel'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  CityServiceInterface: Symbol.for('CityServiceInterface'),
  BuildingTypeServiceInterface: Symbol.for('BuildingTypeServiceInterface'),
  GoodServiceInterface: Symbol.for('GoodServiceInterface'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  BuildingTypeController: Symbol.for('BuildingTypeController'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  FavoriteServiceInterface: Symbol.for('FavoriteServiceInterface'),
  TokenServiceInterface: Symbol.for('TokenServiceInterface'),
  CityController: Symbol.for('CityController'),
  GoodController: Symbol.for('GoodController'),
  OfferController: Symbol.for('OfferController'),
  UserController: Symbol.for('UserController'),
  FavoriteController: Symbol.for('FavoriteController')
} as const;

export {Component};
