import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {CommentServiceInterface} from './comment-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import UpdateCommentDto from './dto/update-comment.dto.js';

@injectable()
class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`Добавлен новый комментарий с id: ${result.id} к посту с id: ${result.offerId}`);

    return result;
  }

  public async findByOfferId(id: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId: id});
  }

  public async updateById(id: string, dto: UpdateCommentDto): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findByIdAndUpdate(id, dto);
  }

  public async deleteById(id: string): Promise<void | null> {
    return this.commentModel.findByIdAndDelete(id);
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.commentModel.exists({_id: documentId}) !== null);
  }
}

export default CommentService;
