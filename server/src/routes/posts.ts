import { Router } from 'express';

import {
  getAllPosts,
  createNewPost,
  getSinglePost,
  editSinglePost,
} from '../controllers';

const router = Router();

router
  .get('/', (_, res) => {
    return res.json({ message: 'Posts endpoint!' });
  })
  .get('/all-posts', getAllPosts)
  .post('/new', createNewPost)
  .get('/:id', getSinglePost)
  .patch('/:id', editSinglePost);

export default router;
