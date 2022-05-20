import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {UserServiceInterface} from './user-service.interface.js';
import {fillDTO} from '../../utils/functions.js';
import HttpError from '../../common/errors/http-error.js';
import CreateUserDto from './dto/create-user.dto.js';
import UserDto from './dto/user.dto.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectid.middleware.js';
import UploadFileMiddleware from '../../common/middlewares/upload-file.middleware.js';

@injectable()
class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для пользователей...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.register,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIR'), 'avatar')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, fillDTO(UserDto, await this.userService.find()));
  }

  public async register({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response) {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Пользователь с email: ${body.email} уже существует.`,
        'UserController',
      );
    }

    const result = await this.userService.create(body, this.config.get('SALT_ROUNDS'));

    this.created(res, fillDTO(UserDto, result));
  }

  public async uploadAvatar({params, file}: Request, res: Response) {
    const result = await this.userService.updateById(params.userId, {avatarUrl: file?.path});

    this.created(res, fillDTO(UserDto, result));
  }
}

export default UserController;
