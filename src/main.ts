import {Container} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';

import Application from './app/application.js';
import LoggerService from './common/logger/logger.service.js';
import ConfigService from './common/config/config.service.js';
import {Component} from './types/component.types.js';
import {LoggerInterface} from './common/logger/logger.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import {DatabaseInterface} from './common/database-client/database.interface.js';
import {UserEntity, UserModel} from './modules/user/user.entity.js';
import {UserServiceInterface} from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import {CityServiceInterface} from './modules/city/city-service.interface.js';
import CityService from './modules/city/city.service.js';
import {CityEntity, CityModel} from './modules/city/city.entity.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigService>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
applicationContainer.bind<CityServiceInterface>(Component.CityServiceInterface).to(CityService).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);

await application.init();
