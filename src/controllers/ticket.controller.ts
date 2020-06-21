import { logger } from '../utils/logger';
import { generateId } from '../utils/generate.id';
import { TicketModel } from '../models/ticket.model';
import { validateUser } from '../utils/controller.utils';
import { TicketId, TicketData } from '../typescript';

export class TicketController {
  public static async Get(ticketId: TicketId) {
    return await TicketModel.Find(ticketId);
  }

  public static async GetMultiple(ticketIds: Array<TicketId>) {
    const results = [];

    for (let ticketId of ticketIds) {
      results.push(await TicketController.Get(ticketId));
    }
    return results;
  }

  public static async Create(newTicketData: TicketData): Promise<any> {
    const { user } = newTicketData;
    if (user && !await validateUser(user)) {
      throw new Error('cannot create ticket with invalid user');
    }

    newTicketData.id = `ticket-${await generateId()}`;
    newTicketData.dateCreated = new Date();
    newTicketData.lastUpdated = new Date();

    const newTicket = new TicketModel(newTicketData);
    const response = await TicketModel.Put(newTicket);

    logger.info({ event: 'new ticket created', newTicket, response });
    return await TicketController.Get(newTicketData.id);
  }

  public static async Update(ticketData: TicketData): Promise<any> {
    const { id, user, board, title, estimate, description } = ticketData;

    const existingTicket = await TicketModel.Find(id);
    existingTicket.user = user;
    existingTicket.board = board;
    existingTicket.title = title;
    existingTicket.estimate = estimate;
    existingTicket.description = description;
    existingTicket.lastUpdated = new Date();

    const updatedTicket = new TicketModel(existingTicket);
    const response = await TicketModel.Put(updatedTicket);

    logger.info({ event: 'ticket updated', id, response });
    return await TicketController.Get(id);
  }
}
