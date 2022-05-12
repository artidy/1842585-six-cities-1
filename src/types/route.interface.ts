import {NextFunction, Request, Response} from 'express';

import {HttpMethod} from './http-method.enum.js';

interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}

export {RouteInterface};
