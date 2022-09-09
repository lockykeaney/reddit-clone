import { Router, Request, Response } from 'express';
import { createNewAccount } from '../controllers';
const router = Router();

router
  .get('/', async (req: Request, res: Response) => {
    try {
      res.json({ message: 'Create Endpoint' });
    } catch (error) {
      throw new Error(error);
    }
  })
  .post('/create', createNewAccount);

export default router;
