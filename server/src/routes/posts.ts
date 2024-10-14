import { Router } from 'express';
import passport from 'passport';
import '../passport';

import {
  getListOfPosts,
  createNewPost,
  getSinglePostById,
  editSinglePost,
  getCountOfPosts,
} from '../controllers';

const router = Router();

export const POSTS_ROUTES = {
  COUNT: '/posts-count',
  LIST: '/list',
  NEW: '/new',
  BY_ID: '/:id',
};

router
  .get('/', (_, res) => {
    return res.json({ message: 'Posts endpoint!' });
  })
  .get(POSTS_ROUTES.COUNT, getCountOfPosts)
  .post(POSTS_ROUTES.LIST, getListOfPosts)
  .post(
    POSTS_ROUTES.NEW,
    passport.authenticate('jwt', { session: false }),
    createNewPost
  )
  .get(POSTS_ROUTES.BY_ID, getSinglePostById)
  .patch(POSTS_ROUTES.BY_ID, editSinglePost);

export default router;
