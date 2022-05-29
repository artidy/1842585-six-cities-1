import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

type ConfigSchema = {
  HOST: string;
  PORT: number;
  SALT_ROUNDS: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  UPLOAD_DIR: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  TOKEN_EXPIRATION_TIME: string;
}

const configSchema = convict<ConfigSchema>({
  HOST: {
    doc: 'Адрес подключения к серверу',
    format: String,
    env: 'HOST',
    default: 'http://localhost'
  },
  PORT: {
    doc: 'Порт для подключения к приложению',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT_ROUNDS: {
    doc: 'Сложность генерируемой соли',
    format: Number,
    env: 'SALT_ROUNDS',
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
  },
  UPLOAD_DIR: {
    doc: 'Директория для загрузки файлов',
    format: String,
    env: 'UPLOAD_DIR',
    default: './upload',
  },
  JWT_SECRET: {
    doc: 'Секретная строка для генерации токена',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
  JWT_REFRESH_SECRET: {
    doc: 'Секретная строка для генерации токена',
    format: String,
    env: 'JWT_REFRESH_SECRET',
    default: null,
  },
  TOKEN_EXPIRATION_TIME: {
    doc: 'Время действия токена',
    format: String,
    env: 'TOKEN_EXPIRATION_TIME',
    default: '15m',
  }
});

export {ConfigSchema, configSchema};
