import { User } from '@clerk/backend';

export {};
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
