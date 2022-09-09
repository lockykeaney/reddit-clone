import { Router, Request, Response } from 'express';
import { createNewAccount } from '../controllers';
import { AccountModel } from '../models';
const router = Router();

interface RequestWithBody extends Request {
  body: {
    loginEmailAdress: string;
    password: string;
  };
}
router
  .post('/login', async (req: RequestWithBody, res: Response): Promise<any> => {
    const { loginEmailAdress, password } = req.body;
    try {
      const account = await AccountModel.findOne({ loginEmailAdress });
      if (account) {
        if (password !== account.password) {
          res.status(200).json({ message: 'Incorrect Password' });
        } else {
          account.updateOne({ lastDateActive: new Date() });
          res.status(200).json(account);
        }
      } else {
        res.status(200).json({ message: 'That account does not exist' });
      }
    } catch (error) {
      throw new Error(error);
    }
  })
  .post('/logout', createNewAccount);

export default router;
