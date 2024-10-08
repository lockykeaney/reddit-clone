import { Router } from 'express';
import { createNewAccount, getAccountList } from '../controllers';

const router = Router();

router.post('/create', createNewAccount);

export default router;
