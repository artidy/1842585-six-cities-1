import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

type ConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'Порт для подключения к приложению',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Соль для хеша паролей',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'Адрес подключения к базе данных',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  }
});

export {ConfigSchema, configSchema};
