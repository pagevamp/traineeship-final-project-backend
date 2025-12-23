import { User } from '@clerk/backend';
import { Request } from 'express';
export interface RequestWithUser extends Request {
  decodedData: User;
}
