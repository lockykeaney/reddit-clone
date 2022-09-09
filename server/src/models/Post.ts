import { Schema, model } from 'mongoose';

const Post = new Schema({
  content: {
    type: String,
  },
  postedByUser: {
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

export default model('Post', Post);
