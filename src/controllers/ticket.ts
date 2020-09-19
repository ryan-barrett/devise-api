import { logger }                       from '../utils/logger';
import { generateId }                   from '../utils/generateId';
import { TicketModel, UserModel }       from '../models';
import { validateUser }                 from '../utils/controller';
import { ControllerError }              from '../errors';
import { TicketId, TicketData, Ticket } from '../types';

class TicketControllerError extends ControllerError {
}

export class TicketController {
  public static async Get(ticketId: TicketId): Promise<Ticket> {
    return await TicketModel.Find(ticketId);
  }

  public static async GetMultiple(ticketIds: Array<TicketId>): Promise<Array<Ticket>> {
    const results = [];

    for (let ticketId of ticketIds) {
      results.push(await TicketController.Get(ticketId));
    }
    return results;
  }

  public static async Create(newTicketData: TicketData): Promise<Ticket> {
    const { user } = newTicketData;
    if (user && !await validateUser(user)) {
      throw new TicketControllerError(400, 'cannot create ticket with invalid user');
    }
    const { email } = await UserModel.Find(user);

    newTicketData.id = `ticket-${await generateId()}`;
    newTicketData.dateCreated = new Date();
    newTicketData.lastUpdated = new Date();

    const newTicket = new TicketModel({ ...newTicketData, assignee: email });
    const response = await TicketModel.Put(newTicket);

    logger.info({ newTicket, response }, 'new ticket created');
    return await TicketController.Get(newTicketData.id);
  }

  public static async Update(ticketData: TicketData): Promise<Ticket> {
    const { id, user, boardId, title, estimate, description } = ticketData;

    const existingTicket = await TicketModel.Find(id);
    existingTicket.user = user;
    const { email } = await UserModel.Find(user);
    existingTicket.assignee = email;
    existingTicket.boardId = boardId;
    existingTicket.title = title;
    existingTicket.estimate = estimate;
    existingTicket.description = description;
    existingTicket.lastUpdated = new Date();

    const updatedTicket = new TicketModel(existingTicket);
    const response = await TicketModel.Put(updatedTicket);

    logger.info({ id, response }, 'ticket updated');
    return await TicketController.Get(id);
  }
}
