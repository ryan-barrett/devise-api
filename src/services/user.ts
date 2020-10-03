import { Service }        from './service';
import { logger }         from '../utils/logger';
import { UserController } from '../controllers';
import { ServiceError }   from '../errors';
import { User }           from '../types/types';

class UserServiceError extends ServiceError {
}

export class UserService extends Service {
  constructor(user?: { [key: string]: string | Array<string> }) {
    super(user);
  }

  public async getUser(userId: string) {
    logger.info({ userId }, 'received getUser request');

    try {
      return await UserController.Get(userId);
    }
    catch (error) {
      const { message } = error;
      throw new UserServiceError(500, message, error);
    }
  }

  public async createUser(userData: User) {
    const { userName, email } = userData;
    logger.info({ userName, email }, 'received createUser request');

    try {
      return await UserController.Create(userData);
    }
    catch (error) {
      const { message } = error;
      throw new UserServiceError(500, message, error);
    }
  }

  public async updateUser(userData: User) {
    const { id, userName, email, boards } = userData;
    logger.info({ id, userName, email, boards }, 'received updateUser request');

    if (id === undefined) {
      throw new UserServiceError(400, 'no id specified for update user action');
    }

    try {
      return await UserController.Update(userData);
    }
    catch (error) {
      const { message } = error;
      throw new UserServiceError(500, message, error);
    }
  }
}
