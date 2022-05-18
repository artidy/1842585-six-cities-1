import 'reflect-metadata';
import {Response, Router} from 'express';
import asyncHandler from 'express-async-handler';
import {injectable} from 'inversify';

import {ControllerInterface} from './controller.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {RouteInterface} from '../../types/route.interface.js';
import {StatusCodes} from 'http-status-codes/build/es/index.js';

@injectable()
abstract class Controller implements ControllerInterface {
  readonly router: Router;

  constructor(protected readonly logger: LoggerInterface) {
    this.router = Router();
  }

  public addRoute(route: RouteInterface) {
    this.router[route.method](route.path, asyncHandler(route.handler.bind(this)));
    this.logger.info(`Зарегистрирован роутер: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response): void {
    this.send(res, StatusCodes.NO_CONTENT, {});
  }
}

export {Controller};
