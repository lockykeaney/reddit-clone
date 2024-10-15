import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AccountModel } from '../models';
import type { RequestWithBody } from '../types';

type LoginProps = {
  username: string;
  password: string;
};

export const authControllerLogin = async (
  req: RequestWithBody<LoginProps>,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  try {
    await AccountModel.findOne({ username })
      .then((account) => {
        if (account) {
          bcrypt.compare(password, account.password, (err, match) => {
            if (err) {
              throw new Error('err');
            }
            if (match) {
              account.updateOne({ lastDateActive: new Date() });
              const token = jwt.sign(
                JSON.stringify(account),
                process.env.SECRET_TOKEN
              );
              res.status(200).json({ message: 'user logged in', token });
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

// export const authControllerLogout = async (req: Request, res: Response) => {
//   try {

//   } catch (error) {
//     throw new Error(error);
//   }
// }
