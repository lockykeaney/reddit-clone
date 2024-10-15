import { T_Account } from './models';
import { Request } from 'express';

export type RequestWithUser = {
  user: { id: string } & T_Account;
} & Request;

export type RequestWithBody<T> = {
  body: T;
};
