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
  BuildingTypeModel: Symbol.for('BuildingTypeModel'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  CityServiceInterface: Symbol.for('CityServiceInterface'),
  BuildingTypeServiceInterface: Symbol.for('BuildingTypeServiceInterface'),
  GoodServiceInterface: Symbol.for('GoodServiceInterface'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  BuildingTypeController: Symbol.for('BuildingTypeController'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CityController: Symbol.for('CityController'),
  GoodController: Symbol.for('GoodController'),
  OfferController: Symbol.for('OfferController'),
  UserController: Symbol.for('UserController')
} as const;

export {Component};
