import { Router } from 'express';
import { createNewAccount, getAccountList } from '../controllers';

const router = Router();

router.post('/create', createNewAccount).get('/account-list', getAccountList);

export default router;
