import { Request, Response } from 'express';
import type { RequestWithBody } from '../types';
import { PostModel, T_Post } from '../models';

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await PostModel.find()
      .then((data: T_Post[]) => {
        data.length === 0 ? res.status(204).send() : res.status(200).send(data);
      })
      .catch((error: any) => console.log('mongoose error: ', error));
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

    await PostModel.findById(id).then((data: T_Post) => {
      data ? res.status(200).send(data) : res.status(204).send();
    });
  } catch (error) {
    throw new Error(error);
  }
};
