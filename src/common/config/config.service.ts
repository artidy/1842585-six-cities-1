import {config} from 'dotenv';

import {ConfigInterface} from './config.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {configSchema, ConfigSchema} from './config.schema.js';

class ConfigService implements ConfigInterface {
  private readonly config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Невозможно считать файл .env. Возможно файла не существует.');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.error});

    this.config = configSchema.getProperties();
    this.logger.info('Файл .env успешно считан.');
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}

export default ConfigService;
