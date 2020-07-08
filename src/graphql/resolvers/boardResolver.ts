import { logger } from '../../utils/logger';
import { BoardController } from '../../controllers';
import { ServiceError } from '../../errors';
import { BoardId, BoardInput } from '../../typescript';

class BoardServiceError extends ServiceError {
}

export async function getBoard(args: BoardId) {
  // @ts-ignore
  const { input } = args;

  logger.info({ input }, 'received getBoard request');

  try {
    return await BoardController.Get(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ error }, 'error getting board');
    throw new BoardServiceError(500, message, error);
  }
}

export async function createBoard(args: BoardInput) {
  // @ts-ignore
  const { input } = args;
  const { name } = input;

  logger.info({ name }, 'received createBoard request');

  if (name === undefined) {
    logger.error('no name specified for creating new board');
    throw new BoardServiceError(400, 'no name specified for creating new board');
  }

  try {
    return await BoardController.Create(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ error }, 'error creating board');
    throw new BoardServiceError(500, message, error);
  }
}

export async function updateBoard(args: BoardInput) {
  // @ts-ignore
  const { input } = args;
  const { name, id } = input;

  logger.info({ name, id }, 'received updateBoard request');

  if (id === undefined) {
    logger.error({ event: 'error' }, 'no id specified for update board action');
    throw new BoardServiceError(400, 'no id specified for update board action');
  }

  try {
    return await BoardController.Update(input);
  }
  catch (error) {
    const { message } = error;
    logger.error({ error }, 'error updating board');
    throw new BoardServiceError(500, message);
  }
}
