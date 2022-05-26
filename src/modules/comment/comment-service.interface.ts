import {DocumentType} from '@typegoose/typegoose';

import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import UpdateCommentDto from './dto/update-comment.dto.js';

interface CommentServiceInterface extends DocumentExistsInterface{
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(id: string): Promise<DocumentType<CommentEntity>[]>;
  updateById(id: string, dto: UpdateCommentDto): Promise<DocumentType<CommentEntity> | null>;
  deleteById(id: string): Promise<void | null>;
}

export {CommentServiceInterface};
