import { logger } from '../utils/logger';
import { generateId } from '../utils/generateId';
import { TicketModel } from '../models/ticket.model';
import { validateUser } from './helpers';

import { TicketData } from '../interfaces/ticket';
import type { TicketId } from '../types/appTypes';

export const getTicket = async (ticketId: TicketId) => {
  try {
    return await TicketModel.find(ticketId);
  } catch (error) {
    logger.error({ event: 'error getting ticket', error });
    return new Error(`{ status: 500, message: 'error fetching ticket' }`);
  }
};

export const getTickets = async (ticketIds: Array<TicketId>) => {
  const results = [];

  try {
    for (let ticketId of ticketIds) {
      results.push(await getTicket(ticketId));
    }
  } catch (error) {
    logger.error({ event: 'error fetching multiple tickets', ticketIds, error });
    return new Error(`{ status: 500, message: 'error fetching tickets' }`);
  }
  return results;
};

export const createTicket = async (newTicketData: TicketData): Promise<any> => {
  const { user } = newTicketData;
  if (user && !await validateUser(user)) {
    logger.error({ event: 'cannot create ticket with invalid user', user });
    return new Error(`{ status: 400, message: 'cannot create ticket with invalid user' }`);
  }

  newTicketData.id = `ticket-${await generateId()}`;
  newTicketData.dateCreated = new Date();
  newTicketData.lastUpdated = new Date();

  try {
    const newTicket = new TicketModel(newTicketData);
    const response = await TicketModel.put(newTicket);
    logger.info({ event: 'new ticket created', newTicket, response });
  } catch (error) {
    return new Error(`{ status: 500, message: 'error creating ticket' }`);
  }
  return await getTicket(newTicketData.id);
};

export const updateTicket = async (ticketData: TicketData): Promise<any> => {
  const { id, user, board, title, estimate, description } = ticketData;
  const existingTicket = await TicketModel.find(id);

  try {
    existingTicket.user = user;
    existingTicket.board = board;
    existingTicket.title = title;
    existingTicket.estimate = estimate;
    existingTicket.description = description;
    existingTicket.lastUpdated = new Date();
    const updatedTicket = new TicketModel(existingTicket);
    const response = await TicketModel.put(updatedTicket);
    logger.info({ event: 'ticket updated', id, response });
  } catch (error) {
    logger.error({ event: 'error updating ticket', error });
    return new Error(`{ status: 500, message: 'error updating ticket' }`);
  }
  return await getTicket(id);
};