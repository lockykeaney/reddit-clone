import { Router, Request, Response, NextFunction } from 'express';

export const getHomepageItems = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    return next(err);
  }
};
