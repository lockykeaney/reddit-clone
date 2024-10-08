import { Router } from 'express';
import {
  upvotePost,
  downvotePost,
  getVoteCountForPost,
  getVotesForPost,
} from '../controllers';

const router = Router();

router
  .get('/upvote/:id', upvotePost)
  .get('/downvote/:id', downvotePost)
  .get('/vote-count/:id', getVotesForPost);

export default router;
