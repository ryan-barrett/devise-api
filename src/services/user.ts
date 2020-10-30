import { app }                         from '../index';
import { Service }                     from './service';
import { logger }                      from '../utils/logger';
import { UserController }              from '../controllers';
import { ServiceError }                from '../errors';
import { User, PromiseStatus, UseJwt } from '../typing';


class UserServiceError extends ServiceError {
}

export class UserService extends Service {
  constructor(user?: { [key: string]: string | Array<string> }) {
    super(user);
  }

  public async get(userId: string) {
    logger.info({ userId }, 'received getUser request');

    try {
      return await UserController.Get(userId);
    }
    catch (error) {
      const { message } = error;
      throw new UserServiceError(500, message, error);
    }
  }

  public async getAllBoards(userId: string) {
    logger.info({ userId }, 'received getAllBoards request');
    if (userId === UseJwt.Value) {
      // @ts-ignore
      userId = this.user.id;
    }

    try {
      const { boards: boardIds } = await this.get(userId);
      const result = await Promise.all(boardIds.map(async (boardId) => {
        try {
          const response = await app.callService('BoardService', 'get', [boardId], this.user);
          return { id: boardId, status: PromiseStatus.Success, response };
        }
        catch (error) {
          logger.info({ error }, 'error calling BoardService from UserService');
          return { id: boardId, status: PromiseStatus.Failed };
        }
      }));
      logger.info({ result }, 'fetch all boards response');

      const boards = result.map((promiseResponse) => {
        if (promiseResponse.status === PromiseStatus.Success) {
          return promiseResponse.response;
        }
        else {
          throw new Error('unable to successfully fetch all boards');
        }
      });
      return boards;
    }
    catch (error) {
      const { message } = error;
      throw new UserServiceError(500, message, error);
    }
  }

  public async create(userData: User) {
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

  public async update(userData: User) {
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
