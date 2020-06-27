import { logger } from '../../utils/logger';
import { TicketController } from '../../controllers/ticket.controller';
import { TicketId, TicketInput } from '../../typescript';
import { ServiceError } from '../../errors';

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
    logger.error({ error }, 'error getting ticket');
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
    logger.error({ error }, 'error getting multiple tickets');
    throw new TicketServiceError(500, message, error);
  }
}

export async function createTicket(args: TicketInput) {
  // @ts-ignore
  const { input } = args;
  const { title, user, board, estimate, description } = input;
  logger.info({ title }, 'received createTicket request');

  if (title === undefined) {
    logger.error({ event: 'error' }, 'no board name specified for create ticket action');
    throw new TicketServiceError(400, 'no board name specified for create ticket action');
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
  const { id, title, user, board, estimate, description } = input;
  logger.info({ id }, 'received updateTicket request');

  if (id === undefined) {
    logger.error({ event: 'error' }, 'no id specified for update ticket action');
    throw new TicketServiceError(400, 'no id specified for update ticket action');
  }
  try {
    return await TicketController.Update(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ error }, 'error updating ticket');
    throw new TicketServiceError(500, message, error);
  }
}
