import { generateId } from '../utils/generateId';
import { logger } from '../utils/logger';
import { Board } from './models/board';
import { User, UserData } from './models/user';
import { Ticket } from './models/ticket';

import type { Id, BoardId } from './models/board';
import type { UserId } from './models/user';
import type { TicketId } from './models/ticket';

const getTicket = (ticketId: number) => {
  logger.debug({ event: 'get single ticket from CB', ticketId });
};

const getTickets = (userId: number) => {
  logger.debug({ event: 'get tickets from CB', userId });
};

// const createTicket = (userId: UserId) => {
//
// }

const getBoard = (boardId: number) => {
  logger.debug({ event: 'get all tickets associated with a board', boardId });
};

export const getUser = async (userId: UserId) => {
  try {
    return await User.find(userId)
  } catch (error) {
    logger.error({ event: 'error getting user', error});
  }
};


export const createUser = async (newUserData: UserData): Promise<any> => {
  newUserData.id = await generateId();
  newUserData.boards = [];

  try {
    const newUser = new User(newUserData);
    const response = await User.put(newUser);
    logger.info({ event: 'new user created', response})
  } catch (error) {
    logger.error({ event: 'error creating user', error });
  }

  return await getUser(newUserData.id);
};
