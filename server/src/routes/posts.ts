import { Router } from 'express';
import { getAllPosts, createNewPost, getSinglePost } from '../controllers';

const router = Router();

router
  .get('/all-posts', getAllPosts)
  .post('/new', createNewPost)
  .get('/:id', getSinglePost);

export default router;
