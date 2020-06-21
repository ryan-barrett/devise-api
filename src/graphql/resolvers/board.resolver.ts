import { logger } from '../../utils/logger';
import { BoardController } from '../../controllers/board.controller';
import { RequestError, ServerError } from '../../utils/error.handling';
import { BoardId, BoardInput } from '../../typescript';

export async function getBoard(args: BoardId) {
  // @ts-ignore
  const { input } = args;

  logger.info({ event: 'received getBoard request', input });

  try {
    return await BoardController.Get(input);
  } catch (error) {
    const { message } = error;
    logger.error({ event: 'error getting board', error });
    return new ServerError(message, 500);
  }
}

export async function createBoard(args: BoardInput) {
  // @ts-ignore
  const { input } = args;
  const { name } = input;

  logger.info({ event: 'received createBoard request', name });

  if (name === undefined) {
    logger.error({ event: 'no board name specified for create board action' });
    return new RequestError('no name specified for creating new board', 400);
  }

  try {
    return await BoardController.Create(input);
  } catch (error) {
    const { message } = error;
    logger.error({ event: 'error creating board', error });
    return new ServerError(message, 500);
  }
}

export async function updateBoard(args: BoardInput) {
  // @ts-ignore
  const { input } = args;
  const { name, id } = input;

  logger.info({ event: 'received updateBoard request', name, id });

  if (id === undefined) {
    logger.error({ event: 'no id specified for update board action' });
    return new RequestError('no id specified for update board action', 400);
  }

  try {
    return await BoardController.Update(input);
  } catch (error) {
    const { message } = error;
    logger.error({ event: 'error updating board', error });
    return new ServerError(message, 500);
  }
}
