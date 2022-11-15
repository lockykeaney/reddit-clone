import { Router } from 'express';

import accountsRouter from './accounts';
import authRouter from './auth';
import postsRouter from './posts';
import votesRouter from './votes';

const router = Router();
router
  .use('/accounts', accountsRouter)
  .use('/auth', authRouter)
  .use('/posts', postsRouter)
  .use('/votes', votesRouter);

export default router;
