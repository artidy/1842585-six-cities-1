import {config, DotenvParseOutput} from 'dotenv';

import {ConfigInterface} from './config.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';

class ConfigService implements ConfigInterface {
  private readonly config: DotenvParseOutput;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Невозможно считать файл .env. Возможно файла не существует.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('Файл .env успешно считан.');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}

export default ConfigService;
