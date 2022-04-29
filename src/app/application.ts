import 'reflect-metadata';
import {Component} from '../types/component.types.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';

@injectable()
class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface) {}

  public async init() {
    this.logger.info('Приложение инициализировано.');
    this.logger.info(`Приложения работает на порте ${this.config.get('PORT')}`);
  }
}

export default Application;
