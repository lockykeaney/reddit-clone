import { Router } from 'express';

import accountsRouter from './accounts';
import authRouter from './auth';
import postsRouter from './posts';

const router = Router();
router
  .use('/accounts', accountsRouter)
  .use('/auth', authRouter)
  .use('/posts', postsRouter);

export default router;
