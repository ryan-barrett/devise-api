import { Service }         from './service';
import { logger }          from '../utils/logger';
import { BoardController } from '../controllers';
import { ServiceError }    from '../errors';
import { BoardData }       from '../types/interfaces';

class BoardServiceError extends ServiceError {
}

export class BoardService extends Service {
  constructor(user?: { [key: string]: string | Array<string> }) {
    super(user);
  }

  public async get(id: string) {
    logger.info({ id }, 'received getBoard request');

    try {
      return await BoardController.Get(id);
    }
    catch (error) {
      const { message } = error;
      throw new BoardServiceError(500, message, error);
    }
  }

  public async create(boardData: BoardData) {
    const { name } = boardData;

    logger.info({ name }, 'received createBoard request');

    if (name === undefined) {
      throw new BoardServiceError(400, 'no name specified for creating new board');
    }

    try {
      return await BoardController.Create(boardData);
    }
    catch (error) {
      const { message } = error;
      throw new BoardServiceError(500, message, error);
    }
  }

  public async update(boardData: BoardData) {
    const { name, id } = boardData;

    logger.info({ name, id }, 'received updateBoard request');

    if (id === undefined) {
      throw new BoardServiceError(400, 'no id specified for update board action');
    }

    try {
      return await BoardController.Update(boardData);
    }
    catch (error) {
      const { message } = error;
      throw new BoardServiceError(500, message);
    }
  }
}
