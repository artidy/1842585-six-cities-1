import {Response, Router} from 'express';

import {RouteInterface} from '../../types/route.interface.js';

interface ControllerInterface {
  readonly router: Router;
  addRoute(route: RouteInterface): void
  send<T>(res: Response, statusCode: number, data: T): void;
}

export {ControllerInterface};
