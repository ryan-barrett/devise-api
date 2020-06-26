import { logger } from '../../utils/logger';
import { BoardController } from '../../controllers/board.controller';
import { ServiceError } from '../../utils/errors';
import { BoardId, BoardInput } from '../../typescript';

class BoardServiceError extends ServiceError {
}

export async function getBoard(args: BoardId) {
  // @ts-ignore
  const { input } = args;

  logger.info({ event: 'received getBoard request', input });

  try {
    return await BoardController.Get(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ event: 'error getting board', error });
    throw new BoardServiceError(500, message, error);
  }
}

export async function createBoard(args: BoardInput) {
  // @ts-ignore
  const { input } = args;
  const { name } = input;

  logger.info({ event: 'received createBoard request', name });

  if (name === undefined) {
    logger.error('no name specified for creating new board')
    throw new BoardServiceError(400, 'no name specified for creating new board');
  }

  try {
    return await BoardController.Create(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ event: 'error creating board', error });
    throw new BoardServiceError(500, message, error);
  }
}

export async function updateBoard(args: BoardInput) {
  // @ts-ignore
  const { input } = args;
  const { name, id } = input;

  logger.info({ event: 'received updateBoard request', name, id });

  if (id === undefined) {
    logger.error({ event: 'no id specified for update board action' });
    throw new BoardServiceError(400, 'no id specified for update board action');
  }

  try {
    return await BoardController.Update(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ event: 'error updating board', error });
    throw new BoardServiceError(500, message);
  }
}
