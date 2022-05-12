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
import {BuildingTypeServiceInterface} from './modules/building-type/building-type-service.interface.js';
import BuildingTypeService from './modules/building-type/building-type.service.js';
import {BuildingTypeEntity, BuildingTypeModel} from './modules/building-type/building-type.entity.js';
import {GoodEntity, GoodModel} from './modules/good/good.entity.js';
import {GoodServiceInterface} from './modules/good/good-service.interface.js';
import GoodService from './modules/good/good.service.js';
import {OfferEntity, OfferModel} from './modules/offer/offer.entity.js';
import {OfferServiceInterface} from './modules/offer/offer-service.interface.js';
import OfferService from './modules/offer/offer-service.js';
import {ControllerInterface} from './common/controller/controller.interface.js';
import OfferController from './modules/offer/offer.controller.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import {ExceptionFilterInterface} from './common/errors/exception-filter.interface.js';
import BuildingTypeController from './modules/building-type/building-type.controller.js';
import CityController from './modules/city/city.controller.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigService>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);
applicationContainer.bind<ModelType<BuildingTypeEntity>>(Component.BuildingTypeModel).toConstantValue(BuildingTypeModel);
applicationContainer.bind<ModelType<GoodEntity>>(Component.GoodModel).toConstantValue(GoodModel);
applicationContainer.bind<ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
applicationContainer.bind<CityServiceInterface>(Component.CityServiceInterface).to(CityService).inSingletonScope();
applicationContainer.bind<BuildingTypeServiceInterface>(Component.BuildingTypeServiceInterface).to(BuildingTypeService).inSingletonScope();
applicationContainer.bind<GoodServiceInterface>(Component.GoodServiceInterface).to(GoodService).inSingletonScope();
applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();
applicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.BuildingTypeController).to(BuildingTypeController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.CityController).to(CityController).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);

await application.init();
