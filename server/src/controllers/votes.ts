import { Request, Response } from 'express';
import type { RequestWithBody } from '../types';
import { VoteModel, T_Vote } from '../models';

export const upvotePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: postId } = req.params;
    await new VoteModel({ postId, voteUserId: 'testId', vote: 'UPVOTE' })
      .save()
      .then(() => res.status(204).send())
      .catch((error) => console.log(error));
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const downvotePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: postId } = req.params;
    await new VoteModel({ postId, voteUserId: 'testId', vote: 'DOWNVOTE' })
      .save()
      .then(() => res.status(204).send())
      .catch((error) => console.log(error));
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const getVoteCountForPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: postId } = req.params;
    await VoteModel.find({ postId })
      .then((data: T_Vote[]) => res.status(200).send(data))
      .catch((error: any) => console.log(error));
    return;
  } catch (error) {
    throw new Error(error);
  }
};

type T_VotesReturn = {
  totalVotes: number;
  upVotes: number;
  downVotes: number;
  votes: T_Vote[];
};
const filterByVoteType = (arr: any[], voteType: 'UPVOTE' | 'DOWNVOTE'): any[] =>
  arr.filter((vote: any) => vote.vote === voteType);

export const getVotesForPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: postId } = req.params;
    await VoteModel.find({ postId })
      .then((data: T_Vote[]) => {
        const responseObject: T_VotesReturn = {
          totalVotes: data.length,
          upVotes: filterByVoteType(data, 'UPVOTE').length,
          downVotes: filterByVoteType(data, 'DOWNVOTE').length,
          votes: data,
        };
        res.status(200).send(responseObject);
      })
      .catch((error: any) => console.log(error));
    return;
  } catch (error) {
    throw new Error(error);
  }
};
