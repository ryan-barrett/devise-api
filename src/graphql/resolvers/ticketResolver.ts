import { logger } from '../../utils/logger';

const getTicket = (ticketId: number) => {
  logger.debug({ event: 'get single ticket from CB', ticketId });
};

const getTickets = (userId: number) => {
  logger.debug({ event: 'get tickets from CB', userId });
};
