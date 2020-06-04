import { logger } from '../../utils/logger';

const getBoard = (boardId: number) => {
  logger.debug({ event: 'get all tickets associated with a board', boardId });
};
