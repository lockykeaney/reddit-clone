import { Response } from 'express';
import { AccountModel, T_Account } from '../models';
import type { RequestWithBody } from '../types';

export type T_CreateNewAccount = {
  loginEmailAdress: string;
  password: string;
  username: string;
};

export const createNewAccount = async (
  req: RequestWithBody<T_CreateNewAccount>,
  res: Response
): Promise<any> => {
  try {
    const { loginEmailAdress, username, password } = req.body;
    await AccountModel.findOne({ loginEmailAdress }).then(
      async (response: T_Account) => {
        if (!response) {
          const account = new AccountModel({
            loginEmailAdress,
            password,
            username,
          });
          await account
            .save()
            .then((data) => res.status(201).send(data))
            .catch((error) => console.log('mongoose error: ', error));
        } else {
          return res.status(400).json({
            message: 'An account already exists with that email address',
          });
        }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const getAccountList = async (
  req: RequestWithBody<T_CreateNewAccount>,
  res: Response
): Promise<T_Account[]> => {
  try {
    await AccountModel.find()
      .then((data: T_Account[]) => res.status(200).send(data))
      .catch((error) => console.log('mongoose error: ', error));
    return;
  } catch (error) {
    throw new Error(error);
  }
};
