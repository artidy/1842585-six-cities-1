import {NextFunction, Request, Response} from 'express';
import * as jose from 'jose';
import {createSecretKey} from 'crypto';
import {StatusCodes} from 'http-status-codes';

import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {TokenServiceInterface} from '../../modules/token/token-service.interface.js';
import HttpError from '../errors/http-error.js';

class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(
    private readonly jwtSecret: string,
    private readonly tokenService: TokenServiceInterface) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');

    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const {payload} = await jose.jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));
      const result = await this.tokenService.findByToken(token);

      if (!result) {
        return next(
          new HttpError(
            StatusCodes.UNAUTHORIZED,
            'Пользователь не авторизован.',
            'AuthenticateMiddleware'
          )
        );
      }

      res.locals.user = {id: payload.id as string, email: payload.email as string};

      return next();
    } catch {

      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          'Неверный токен',
          'AuthenticateMiddleware'
        )
      );
    }
  }
}

export default AuthenticateMiddleware;
