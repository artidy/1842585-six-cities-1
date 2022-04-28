import {LoggerInterface} from '../common/logger/logger.interface.js';

class Application {
  private logger!: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
  }

  public async init() {
    this.logger.info('Приложение инициализировано.');
  }
}

export default Application;
