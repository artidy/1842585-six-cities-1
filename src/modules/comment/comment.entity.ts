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
  constructor({text, rating, offerId, userId}: CreateCommentDto) {
    super();

    this.text = text;
    this.rating = rating;
    this.offerId = offerId;
    this.userId = userId;
  }

  @prop({required: true})
  public text!: string;

  @prop({required: true})
  public rating!: number;

  @prop({required: true})
  public offerId!: string;

  @prop({required: true})
  public userId!: string;
}

export const CommentModel = getModelForClass(CommentEntity);
