import { logger } from '../utils/logger';

import { generateId } from '../utils/generate.id';
import { TicketModel } from '../models/ticket.model';
import { validateUser } from '../utils/controllers.utils';

import { TicketData } from '../../interfaces';
import type { TicketId } from '../../types';

export class TicketController {
  public static async Get(ticketId: TicketId) {
    try {
      return await TicketModel.find(ticketId);
    } catch (error) {
      logger.error({ event: 'error getting ticket', error });
      return new Error(`{ status: 500, message: 'error fetching ticket' }`);
    }
  }

  public static async GetMultiple(ticketIds: Array<TicketId>) {
    const results = [];

    try {
      for (let ticketId of ticketIds) {
        results.push(await TicketController.Get(ticketId));
      }
    } catch (error) {
      logger.error({ event: 'error fetching multiple tickets', ticketIds, error });
      return new Error(`{ status: 500, message: 'error fetching tickets' }`);
    }
    return results;
  }

  public static async Create(newTicketData: TicketData): Promise<any> {
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
    return await TicketController.Get(newTicketData.id);
  }

  public static async Update(ticketData: TicketData): Promise<any> {
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
    return await TicketController.Get(id);
  }
}
