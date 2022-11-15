import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { AccountModel, T_AccountDocumentReturn } from '../models';
import type { RequestWithBody } from '../types';

type LoginProps = {
  username: string;
  password: string;
};

export const authControllerLogin = async (
  req: RequestWithBody<LoginProps>,
  res: Response
): Promise<any> => {
  const { username, password } = req.body;
  try {
    await AccountModel.findOne({ username })
      .then((account: T_AccountDocumentReturn) => {
        if (account) {
          bcrypt.compare(password, account.password, (err, match) => {
            if (err) {
              throw new Error('err');
            }
            if (match) {
              account.updateOne({ lastDateActive: new Date() });
              res.status(201).json(account);
            } else {
              res.status(400).json({ message: 'Incorrect Password' });
            }
          });
        } else {
          res.status(400).json({ message: 'That account does not exist' });
        }
      })
      .catch((err) => console.log(err));
  } catch (error) {
    throw new Error(error);
  }
};
