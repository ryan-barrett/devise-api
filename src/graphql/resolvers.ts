import { logger } from '../utils/logger';

import { UserController } from '../controllers/user.controller';
import { BoardController } from '../controllers/board.controller';
import { TicketController } from '../controllers/ticket.controller';

import type { BoardId, TicketId, UserId } from '../../types';
import { UserInput, BoardInput, TicketInput } from '../../interfaces';

export const root = {
  getUser: async (args: UserId) => {
    // @ts-ignore
    const { input } = args;

    logger.info({ event: 'received getUser request', input });
    return await UserController.Get(input);
  },

  createUser: async (args: UserInput) => {
    // @ts-ignore
    const { input } = args;
    const { userName, email } = input;

    logger.info({ event: 'received createUser request', userName, email });
    return await UserController.Create(input);
  },

  updateUser: async (args: UserInput) => {
    // @ts-ignore
    const { input } = args;
    const { id, userName, email, boards } = input;
    logger.info({ event: 'received updateUser request', id, userName, email, boards });

    if (id === undefined) {
      logger.error({ event: 'no id specified for update user action' });
      return new Error(`{ status: 400, message: 'no id specified for update user action' }`);
    }
    return await UserController.Update(input);
  },

  getBoard: async (args: BoardId) => {
    // @ts-ignore
    const { input } = args;

    logger.info({ event: 'received getBoard request', input });
    return await BoardController.Get(input);
  },

  createBoard: async (args: BoardInput) => {
    // @ts-ignore
    const { input } = args;
    const { name } = input;
    logger.info({ event: 'received createBoard request', name });

    if (name === undefined) {
      logger.error({ event: 'no board name specified for create board action' });
      return new Error(`{ status: 400, message: 'no name specified for creating new board' }`);
    }
    return await BoardController.Create(input);
  },

  updateBoard: async (args: BoardInput) => {
    // @ts-ignore
    const { input } = args;
    const { name, id } = input;
    logger.info({ event: 'received updateUser request', name, id });

    if (id === undefined) {
      logger.error({ event: 'no id specified for update board action' });
      return new Error(`{ status: 400, message: 'no id specified for update board action' }`);
    }
    return await BoardController.Update(input);
  },

  getTicket: async (args: TicketId) => {
    // @ts-ignore
    const { input } = args;

    logger.info({ event: 'received getTicket request', input });
    return await TicketController.Get(input);
  },

  getTickets: async (args: Array<TicketId>) => {
    // @ts-ignore
    const { input } = args;

    logger.info({ event: 'received getTickets request', input });
    return await TicketController.GetMultiple(input);
  },

  createTicket: async (args: TicketInput) => {
    // @ts-ignore
    const { input } = args;
    const { title, user, board, estimate, description } = input;
    logger.info({ event: 'received createTicket request', title });

    if (title === undefined) {
      logger.error({ event: 'no board name specified for create ticket action' });
      return new Error(`{ status: 400, message: 'no title specified for creating new board' }`);
    }
    return await TicketController.Create(input);
  },

  updateTicket: async (args: TicketInput) => {
    // @ts-ignore
    const { input } = args;
    const { id, title, user, board, estimate, description } = input;
    logger.info({ event: 'received updateTicket request', id });

    if (id === undefined) {
      logger.error({ event: 'no id specified for update ticket action' });
      return new Error(`{ status: 400, message: 'no id specified for update ticket action' }`);
    }
    return await TicketController.Update(input);
  },
};
