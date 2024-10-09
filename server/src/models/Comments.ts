import { Schema, model, Document } from 'mongoose';

export interface T_Comment {
  content: string;
  postId: string;
}

const CommentSchema = new Schema({
  content: {
    type: String,
  },
  postId: {
    type: String,
  },
  parentCommentId: {
    type: String,
    default: null,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: undefined,
  },
});

export const CommentModel = model<unknown>('Comment', CommentSchema);
