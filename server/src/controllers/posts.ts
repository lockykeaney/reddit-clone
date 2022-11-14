import { Response } from 'express';
import type { RequestWithBody } from '../types';
import { PostModel, T_Post } from '../models';

// export const createNewPost = async (
//   req: RequestWithBody<any>,
//   res: Response
// ): Promise<any> => {};

export const getAllPosts = async (
  req: RequestWithBody<any>,
  res: Response
): Promise<T_Post[]> => {};
