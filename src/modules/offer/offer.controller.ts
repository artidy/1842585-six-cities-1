import 'reflect-metadata';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';

import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {Controller} from '../../common/controller/controller.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {fillDTO} from '../../utils/functions.js';
import HttpError from '../../common/errors/http-error.js';
import OfferDto from './dto/offer.dto.js';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectid.middleware.js';

@injectable()
class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для предложений...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateOfferById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOfferById,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, fillDTO(OfferDto, await this.offerService.find()));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = this.offerService.create(body);

    this.created(res, fillDTO(OfferDto, result));
  }

  public async getOfferById({params}: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложение с идентификатором ${params.offerId} не найдено.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferDto, offer));
  }

  public async updateOfferById({params, body}: Request, res: Response): Promise<void> {
    const offer = await this.offerService.updateById(params.offerId, body);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложение с идентификатором ${params.offerId} не найдено.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferDto, offer));
  }

  public async deleteOfferById({params}: Request, res: Response): Promise<void> {
    const offer = await this.offerService.deleteById(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложение с идентификатором ${params.offerId} не найдено.`,
        'OfferController'
      );
    }

    this.noContent(res);
  }
}

export default OfferController;
