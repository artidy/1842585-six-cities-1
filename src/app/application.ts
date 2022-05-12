import 'reflect-metadata';
import express, {Express} from 'express';
import {inject, injectable} from 'inversify';

import {Component} from '../types/component.types.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {getMongodbURI} from '../utils/functions.js';

@injectable()
class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface) {
    this.expressApp = express();
  }

  public async init() {
    this.logger.info('Инициализация приложения...');

    const dbUser = this.config.get('DB_USER');
    const port = this.config.get('PORT');

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

    this.expressApp.listen(port);
    this.logger.info(`Сервер стартовал на ${this.config.get('HOST')}:${port}`);
    this.logger.info('Приложение инициализировано.');
  }
}

export default Application;
