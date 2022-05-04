import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

type ConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
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
  },
  DB_USER: {
    doc: 'Логин для подключения к базе данных',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Пароль для подключения к базе данных',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Порт для подключения к базе данных',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Имя базы данных',
    format: String,
    env: 'DB_NAME',
    default: null,
  }
});

export {ConfigSchema, configSchema};
