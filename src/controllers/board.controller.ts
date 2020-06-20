import { logger } from '../utils/logger';

import { generateId } from '../utils/generate.id';
import { BoardModel } from '../models/board.model';

import { BoardData } from '../../interfaces';
import { BoardId } from '../../types';

export class BoardController {
  public static async Get(boardId: BoardId) {
    try {
      return await BoardModel.find(boardId);
    } catch (error) {
      logger.error({ event: 'error getting board', error });
      return new Error(`{ status: 500, message: 'error fetching board' }`);
    }
  }

  public static async Create(newBoardData: BoardData): Promise<any> {
    newBoardData.id = `board-${await generateId()}`;
    newBoardData.dateCreated = new Date();
    newBoardData.lastUpdated = new Date();

    try {
      const newUser = new BoardModel(newBoardData);
      const response = await BoardModel.put(newUser);
      logger.info({ event: 'new board created', response });
    } catch (error) {
      logger.error({ event: 'error creating board', error });
      return new Error(`{ status: 500, message: 'error creating board' }`);
    }
    return await BoardController.Get(newBoardData.id);
  }

  public static async Update(boardData: BoardData): Promise<any> {
    const { id, name } = boardData;
    const existingBoard = await BoardModel.find(id);

    try {
      existingBoard.name = name ? name : existingBoard.name;
      existingBoard.lastUpdated = new Date();
      const updatedBoard = new BoardModel(existingBoard);
      const response = await BoardModel.put(updatedBoard);
      logger.info({ event: 'board updated', id, response });
    } catch (error) {
      logger.error({ event: 'error updating board', error });
      return new Error(`{ status: 500, message: 'error updating board' }`);
    }
    return await BoardController.Get(id);
  }
}
