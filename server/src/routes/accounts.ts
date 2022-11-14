import { Router } from 'express';
import { createNewAccount, getAccountList } from '../controllers';
const router = Router();

router.get('/account-list', getAccountList).post('/create', createNewAccount);

export default router;
