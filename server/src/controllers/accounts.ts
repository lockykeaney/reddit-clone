import { Response, Request } from 'express';
import { AccountModel, T_Account } from '../models';
import type { RequestWithBody } from '../types';

export type T_CreateNewAccount = {
  loginEmailAddress: string;
  password: string;
  username: string;
};

export const createNewAccount = async (
  req: RequestWithBody<T_CreateNewAccount>,
  res: Response
): Promise<void> => {
  try {
    const { loginEmailAddress, username, password } = req.body;
    await AccountModel.findOne({ loginEmailAddress }).then(
      async (response: T_Account) => {
        if (!response) {
          const account = new AccountModel({
            loginEmailAddress,
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
  _: Request,
  res: Response
): Promise<void> => {
  try {
    await AccountModel.find()
      .then((data: T_Account[]) => {
        data.length === 0
          ? res.status(204).send({ message: 'No accounts found' })
          : res.status(200).send(data);
      })
      .catch((error) => console.log('mongoose error: ', error));
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAccountById = async (
  req: Request,
  res: Response
): Promise<T_Account[]> => {
  try {
    const { id } = req.params;
    const account = await AccountModel.findById(id);
    account
      ? res.status(200).send(account)
      : res.status(200).send({ message: 'No account found' });
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAccountUsernameById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const account = await AccountModel.findById(id);
    account
      ? res.status(200).send({ username: account.username })
      : res.status(200).send({ message: 'No account found' });
    return;
  } catch (error) {
    throw new Error(error);
  }
};
