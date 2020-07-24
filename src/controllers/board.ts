import { logger } from '../utils/logger';
import { generateId } from '../utils/generateId';
import { BoardModel } from '../models';
import { BoardId, BoardData, Board } from '../types';

export class BoardController {
  public static async Get(boardId: BoardId): Promise<Board> {
    return await BoardModel.Find(boardId);
  }

  public static async Create(newBoardData: BoardData): Promise<Board> {
    newBoardData.id = `board-${await generateId()}`;
    newBoardData.dateCreated = new Date();
    newBoardData.lastUpdated = new Date();

    const newUser = new BoardModel(newBoardData);
    const response = await BoardModel.Put(newUser);

    logger.info({ response }, 'new board created');
    return await BoardController.Get(newBoardData.id);
  }

  public static async Update(boardData: BoardData): Promise<Board> {
    const { id, name } = boardData;

    const existingBoard = await BoardModel.Find(id);
    existingBoard.name = name ? name : existingBoard.name;
    existingBoard.lastUpdated = new Date();

    const updatedBoard = new BoardModel(existingBoard);
    const response = await BoardModel.Put(updatedBoard);

    logger.info({ id, response }, 'board updated');
    return await BoardController.Get(id);
  }
}
