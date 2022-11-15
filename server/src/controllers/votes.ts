import { Request, Response } from 'express';
import type { RequestWithBody } from '../types';
import { VoteModel, T_Vote } from '../models';

export const voteWithId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    res.status(204).send();
  } catch (error) {
    throw new Error(error);
  }
};
