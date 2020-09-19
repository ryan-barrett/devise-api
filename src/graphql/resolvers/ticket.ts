import { logger }                from '../../utils/logger';
import { TicketController }      from '../../controllers';
import { TicketId, TicketInput } from '../../types';
import { ServiceError }          from '../../errors';

const ticketStatusTypes: { [key: string]: string } = {
  todo: 'todo',
  'in progress': 'in progress',
  done: 'done',
};

class TicketServiceError extends ServiceError {
}

export async function getTicket(args: TicketId) {
  // @ts-ignore
  const { input } = args;

  logger.info({ input }, 'received getTicket request');

  try {
    return await TicketController.Get(input);
  }
  catch (error) {
    const { message } = error;
    throw new TicketServiceError(500, message, error);
  }
}

export async function getTickets(args: Array<TicketId>) {
  // @ts-ignore
  const { input } = args;

  logger.info({ input }, 'received getTickets request');

  try {
    return await TicketController.GetMultiple(input);
  }
  catch (error) {
    const { message } = error;
    throw new TicketServiceError(500, message, error);
  }
}

export async function createTicket(args: TicketInput) {
  // @ts-ignore
  const { input } = args;
  const { title, user, boardId, estimate, description, status } = input;
  logger.info({ title }, 'received createTicket request');

  if (!ticketStatusTypes[status]) {
    throw new TicketServiceError(400, 'invalid status for create ticket action');
  }

  try {
    return await TicketController.Create(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ error }, 'error creating ticket');
    throw new TicketServiceError(500, message, error);
  }
}

export async function updateTicket(args: TicketInput) {
  // @ts-ignore
  const { input } = args;
  const { id, status } = input;
  logger.info({ id }, 'received updateTicket request');

  if (!ticketStatusTypes[status]) {
    throw new TicketServiceError(400, 'invalid status for update ticket action');
  }

  try {
    return await TicketController.Update(input);
  }
  catch (error) {
    const { message } = error;
    throw new TicketServiceError(500, message, error);
  }
}
