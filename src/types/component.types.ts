const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserModel: Symbol.for('UserModel'),
  CityModel: Symbol.for('CityModel'),
  BuildingTypeModel: Symbol.for('BuildingTypeModel'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  CityServiceInterface: Symbol.for('CityServiceInterface'),
  BuildingTypeServiceInterface: Symbol.for('BuildingTypeServiceInterface'),
} as const;

export {Component};
