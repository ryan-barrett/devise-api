import { logger } from '../../utils/logger';
import { UserController } from '../../controllers/user.controller';
import { UserId, UserInput } from '../../typescript';
import { ServiceError } from '../../errors';

class UserServiceError extends ServiceError {
}

export async function getUser(args: UserId) {
  // @ts-ignore
  const { input } = args;

  logger.info({ event: 'received getUser request', input });

  try {
    return await UserController.Get(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ event: 'get user error', error });
    throw new UserServiceError(500, message, error);
  }
}

export async function createUser(args: UserInput) {
  // @ts-ignore
  const { input } = args;
  const { userName, email } = input;

  logger.info({ event: 'received createUser request', userName, email });

  try {
    return await UserController.Create(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ event: 'create user error', error });
    throw new UserServiceError(500, message, error);
  }
}

export async function updateUser(args: UserInput) {
  // @ts-ignore
  const { input } = args;
  const { id, userName, email, boards } = input;

  logger.info({ event: 'received updateUser request', id, userName, email, boards });

  if (id === undefined) {
    logger.error({ event: 'no id specified for update user action' });
    throw new UserServiceError(400, 'no id specified for update user action');
  }

  try {
    return await UserController.Update(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ event: 'update user error', error });
    throw new UserServiceError(500, message, error);
  }
}
