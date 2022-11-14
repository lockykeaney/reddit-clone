import { Router } from 'express';

import { authControllerLogin } from '../controllers';

const router = Router();

router.post('/login', authControllerLogin);

export default router;
