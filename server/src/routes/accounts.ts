import { Router } from 'express';
import {
  createNewAccount,
  getAccountList,
  getAccountById,
  getAccountUsernameById,
} from '../controllers';

const router = Router();

export const ACCOUNT_ROUTES = {
  CREATE: '/create',
  LIST: '/accounts-list',
  ACCOUNT_BY_ID: '/:id',
  ACCOUNT_USERNAME: '/:id/username',
};

router
  .post(ACCOUNT_ROUTES.CREATE, createNewAccount)
  .get(ACCOUNT_ROUTES.LIST, getAccountList)
  .get(ACCOUNT_ROUTES.ACCOUNT_BY_ID, getAccountById)
  .get(ACCOUNT_ROUTES.ACCOUNT_USERNAME, getAccountUsernameById);

export default router;
