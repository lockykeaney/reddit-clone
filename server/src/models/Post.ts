import { Schema, model, Document } from 'mongoose';

export interface T_Post {
  content: string;
  postedByUserId?: string;
}

export type T_PostInput = T_Post;
export type T_PostReturn = T_Post & {
  created: Date;
  updated: Date;
  comments: unknown[];
  upvotes: number;
  downvotes: number;
} & Document;

const PostSchema = new Schema({
  content: {
    type: String,
  },
  postedByUserId: {
    type: String,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
    default: undefined,
  },
  comments: {
    type: [Object],
    default: [],
  },
  votes: {
    type: [Object],
    default: [],
  },
});

export const PostModel = model<T_PostReturn>('Post', PostSchema);
