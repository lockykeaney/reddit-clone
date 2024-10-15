import { T_Account } from './models';

declare global {
  namespace Express {
    interface Request {
      user?: T_Account;
    }
  }
}
