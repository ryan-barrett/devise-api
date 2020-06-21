import { logger } from '../../utils/logger';
import { TicketController } from '../../controllers/ticket.controller';
import { RequestError, ServerError } from '../../utils/error.handling';
import { TicketId, TicketInput } from '../../typescript';

export async function getTicket(args: TicketId) {
  // @ts-ignore
  const { input } = args;

  logger.info({ event: 'received getTicket request', input });

  try {
    return await TicketController.Get(input);
  } catch (error) {
    const { message } = error;
    logger.error({ event: 'error getting ticket', error });
    return new ServerError(message, 500);
  }
}

export async function getTickets(args: Array<TicketId>) {
  // @ts-ignore
  const { input } = args;

  logger.info({ event: 'received getTickets request', input });

  try {
    return await TicketController.GetMultiple(input);
  } catch (error) {
    const { message } = error;
    logger.error({ event: 'error getting multiple tickets', error });
    return new ServerError(message, 500);
  }
}

export async function createTicket(args: TicketInput) {
  // @ts-ignore
  const { input } = args;
  const { title, user, board, estimate, description } = input;
  logger.info({ event: 'received createTicket request', title });

  if (title === undefined) {
    logger.error({ event: 'no board name specified for create ticket action' });
    return new RequestError('no title specified for creating new board', 400);
  }

  try {
    return await TicketController.Create(input);
  } catch (error) {
    const { message } = error;
    logger.error({ event: 'error creating ticket', error });
    return new ServerError(message, 500);
  }
}

export async function updateTicket(args: TicketInput) {
  // @ts-ignore
  const { input } = args;
  const { id, title, user, board, estimate, description } = input;
  logger.info({ event: 'received updateTicket request', id });

  if (id === undefined) {
    logger.error({ event: 'no id specified for update ticket action' });
    return new RequestError('no id specified for update ticket action', 400);
  }
  try {
    return await TicketController.Update(input);
  } catch (error) {
    const { message } = error;
    logger.error({ event: 'error updating ticket', error });
    return new ServerError(message, 500);
  }
}
