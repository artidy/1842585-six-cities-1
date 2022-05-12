import {ControllerInterface} from './controller.interface.js';
import {Response, Router} from 'express';
import asyncHandler from 'express-async-handler';
import {LoggerInterface} from '../logger/logger.interface.js';
import {RouteInterface} from '../../types/route.interface.js';

abstract class Controller implements ControllerInterface {
  readonly router: Router;

  protected constructor(protected readonly logger: LoggerInterface) {
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
}

export default Controller;
