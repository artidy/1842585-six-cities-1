import {ConfigInterface} from '../common/config/config.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';

class Application {
  private logger!: LoggerInterface;
  private config!: ConfigInterface;

  constructor(logger: LoggerInterface, config: ConfigInterface) {
    this.logger = logger;
    this.config = config;
  }

  public async init() {
    this.logger.info('Приложение инициализировано.');
    this.logger.info(`Приложения работает на порте ${this.config.get('PORT')}`);
  }
}

export default Application;
