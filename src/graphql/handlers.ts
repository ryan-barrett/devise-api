import { UserId } from '../types/appTypes';
import { logger } from '../utils/logger';
import { createUser, getUser, updateUser } from './resolvers/userResolver';

import { UserInput } from '../interfaces/graphql';

export const root = {
  getUser: async (args: UserId) => {
    // @ts-ignore
    const { input } = args;

    logger.info({ event: 'received getUser request', input });
    return await getUser(input);
  },

  createUser: async (args: UserInput) => {
    // @ts-ignore
    const { input } = args;
    const { userName, email } = input;

    logger.info({ event: 'received createUser request', userName, email });
    return await createUser(input);
  },

  updateUser: async (args: UserInput) => {
    // @ts-ignore
    const { input } = args;
    const { id, userName, email, boards } = input;

    if (id === undefined) {
      logger.error({ event: 'no id specified for update user action' });
      return new Error(`{ status: 400, message: 'no id specified for update user action' }`);
    }

    logger.info({ event: 'received updateUser request', id, userName, email, boards });
    return await updateUser(input);
  }
};
