import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass} from '@typegoose/typegoose';

import CreateCommentDto from './dto/create-comment.dto.js';

const {ModelOptions, prop} = typegoose;

export interface CommentEntity extends Base {}

@ModelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends TimeStamps {
  constructor({text}: CreateCommentDto, offerId: string, userId: string) {
    super();

    this.text = text;
    this.offerId = offerId;
    this.userId = userId;
  }

  @prop({required: true})
  public text!: string;

  @prop({default: 0})
  public rating!: number;

  @prop({required: true})
  public offerId!: string;

  @prop({required: true})
  public userId!: string;
}

export const CommentModel = getModelForClass(CommentEntity);
