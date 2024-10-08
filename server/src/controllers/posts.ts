import { Request, Response } from 'express';
import type { RequestWithBody } from '../types';
import { PostModel, T_Post, VoteModel } from '../models';

export const getAllPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    await PostModel.find()
      .then((data: T_Post[]) => {
        data.length === 0 ? res.status(204).send() : res.status(200).send(data);
      })
      .catch((error) => console.log('mongoose error: ', error));
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const createNewPost = async (
  req: RequestWithBody<T_Post>,
  res: Response
): Promise<void> => {
  try {
    const { content, postedByUserId } = req.body;
    await new PostModel({
      content,
      postedByUserId,
    })
      .save()
      .then((data) => res.status(200).send(data))
      .catch((error) => console.log('mongoose error: ', error));
  } catch (error) {
    throw new Error(error);
  }
};

export const getSinglePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    const votesForPost = await VoteModel.find({ postId: id });

    const returnValue = {
      ...post,
      votes: votesForPost,
    };
    (await post)
      ? res.status(200).send(votesForPost.length > 1 ? returnValue : post)
      : res.status(204).send();
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const editSinglePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(post);
    return;
  } catch (error) {
    throw new Error(error);
  }
};
