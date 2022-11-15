import { Schema, model, Document } from 'mongoose';

export type T_Vote = {
  postId: string;
  voteUserId: string;
};
const VoteSchema = new Schema({
  postId: {
    type: String,
  },
  voteUserId: {
    type: String,
  },
  vote: {
    type: String,
    enum: ['UPVOTE', 'DOWNVOTE'],
    required: false,
  },
});

export const VoteModel = model('Vote', VoteSchema);
