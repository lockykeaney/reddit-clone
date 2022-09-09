import { Router, Request, Response } from 'express';
import { AccountModel, ProfileModel } from '../models';

export type T_CreateNewAccount = {
  loginEmailAdress: string;
  password: string;
  userName: string;
};
interface RequestWithBody extends Request {
  body: T_CreateNewAccount;
}
export const createNewAccount = async (
  req: RequestWithBody,
  res: Response
): Promise<any> => {
  try {
    const { loginEmailAdress, userName, password } = req.body;
    await AccountModel.findOne({ loginEmailAdress }).then(
      async (response: any) => {
        if (!response) {
          const account = new AccountModel({
            loginEmailAdress,
            password,
          });
          const accountId = await account
            .save()
            .then((dbRes) => {
              console.log('Created new acccount: ', dbRes);
              return dbRes._id;
            })
            .catch((error) => console.log('mongoose error: ', error));
          const profile = new ProfileModel({
            accountId,
            userName,
          });
          await profile
            .save()
            .then((dbRes) => {
              console.log('Created new profile: ', dbRes);
            })
            .catch((error) => console.log('mongoose error: ', error));
          return res
            .status(200)
            .json({ message: 'Account and Profile created successfully' });
        } else {
          return res
            .status(200)
            .json({
              message: 'An account already exists with that email address',
            });
        }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};
