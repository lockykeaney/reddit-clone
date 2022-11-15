import { Router } from 'express';
import { voteWithId } from '../controllers';

const router = Router();

router.get('/vote/:id', voteWithId);

export default router;
