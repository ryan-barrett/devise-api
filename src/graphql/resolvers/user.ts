import { app }               from '../../index';
import { logger }            from '../../utils/logger';
import { UserController }    from '../../controllers';
import { UserId, UserInput } from '../../types';
import { ServiceError }      from '../../errors';

class UserServiceError extends ServiceError {
}

export async function getUser({ userId }: { [key: string]: string }) {
  return app.callService('UserService', 'getUser', [userId]);
}

export async function createUser(args: UserInput) {
  // @ts-ignore
  const { input } = args;
  const { userName, email } = input;

  logger.info({ userName, email }, 'received createUser request');

  try {
    return await UserController.Create(input);
  }
  catch (error) {
    const { message } = error;
    throw new UserServiceError(500, message, error);
  }
}

export async function updateUser(args: UserInput) {
  // @ts-ignore
  const { input } = args;
  const { id, userName, email, boards } = input;

  logger.info({ id, userName, email, boards }, 'received updateUser request');

  if (id === undefined) {
    throw new UserServiceError(400, 'no id specified for update user action');
  }

  try {
    return await UserController.Update(input);
  }
  catch (error) {
    const { message } = error;
    throw new UserServiceError(500, message, error);
  }
}
