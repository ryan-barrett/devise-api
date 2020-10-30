import { Service }          from './service';
import { logger }           from '../utils/logger';
import { TicketController } from '../controllers';
import { ServiceError } from '../errors';
import { TicketData }   from '../typing/interfaces';

const ticketStatusTypes: { [key: string]: string } = {
  todo: 'todo',
  'in progress': 'in progress',
  done: 'done',
};

class TicketServiceError extends ServiceError {
}

export class TicketService extends Service {
  constructor(user?: { [key: string]: string | Array<string> }) {
    super(user);
  }

  public async get(id: string) {
    logger.info({ id }, 'received getTicket request');

    try {
      return await TicketController.Get(id);
    }
    catch (error) {
      const { message } = error;
      throw new TicketServiceError(500, message, error);
    }
  }

  public async getMultiple(ids: Array<string>) {
    logger.info({ ids }, 'received getTickets request');

    try {
      return await TicketController.GetMultiple(ids);
    }
    catch (error) {
      const { message } = error;
      throw new TicketServiceError(500, message, error);
    }
  }

  public async create(ticketData: TicketData) {
    const { status, title } = ticketData;
    logger.info({ title }, 'received createTicket request');
    if (!ticketStatusTypes[status]) {
      throw new TicketServiceError(400, 'invalid status for create ticket action');
    }

    try {
      return await TicketController.Create(ticketData);
    }
    catch (error) {
      const { message } = error;
      logger.error({ error }, 'error creating ticket');
      throw new TicketServiceError(500, message, error);
    }
  }

  public async update(ticketData: TicketData) {
    const { id, status } = ticketData;
    logger.info({ id }, 'received updateTicket request');

    if (!ticketStatusTypes[status]) {
      throw new TicketServiceError(400, 'invalid status for update ticket action');
    }

    try {
      return await TicketController.Update(ticketData);
    }
    catch (error) {
      const { message } = error;
      throw new TicketServiceError(500, message, error);
    }
  }
}
