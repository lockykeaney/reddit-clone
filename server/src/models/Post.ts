import { Schema, model } from 'mongoose';

export interface T_Post {
  content: string;
  postedByUserId: string;
  created: Date;
  updated?: Date;
  comments: unknown[];
  upvotes: number;
  downvotes: number;
}

const PostSchema = new Schema<T_Post>({
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
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
});

export const PostModel = model<T_Post>('Post', PostSchema);
