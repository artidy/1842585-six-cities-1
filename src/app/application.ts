import 'reflect-metadata';
import {Component} from '../types/component.types.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {getMongodbURI} from '../utils/functions.js';

@injectable()
class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface) {}

  public async init() {
    this.logger.info('Приложение инициализировано.');
    this.logger.info(`Приложения работает на порте ${this.config.get('PORT')}`);

    const dbUser = this.config.get('DB_USER');

    const uri = getMongodbURI(
      dbUser,
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
      {
        authSource: dbUser
      }
    );

    await this.databaseClient.connect(uri);
  }
}

export default Application;
