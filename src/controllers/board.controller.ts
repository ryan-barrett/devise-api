import { logger } from '../utils/logger';
import { generateId } from '../utils/generate.id';
import { BoardModel } from '../models/board.model';
import { BoardId, BoardData } from '../typescript';

export class BoardController {
  public static async Get(boardId: BoardId) {
    return await BoardModel.Find(boardId);
  }

  public static async Create(newBoardData: BoardData): Promise<any> {
    newBoardData.id = `board-${await generateId()}`;
    newBoardData.dateCreated = new Date();
    newBoardData.lastUpdated = new Date();

    const newUser = new BoardModel(newBoardData);
    const response = await BoardModel.Put(newUser);

    logger.info({ event: 'new board created', response });
    return await BoardController.Get(newBoardData.id);
  }

  public static async Update(boardData: BoardData): Promise<any> {
    const { id, name } = boardData;

    const existingBoard = await BoardModel.Find(id);
    existingBoard.name = name ? name : existingBoard.name;
    existingBoard.lastUpdated = new Date();

    const updatedBoard = new BoardModel(existingBoard);
    const response = await BoardModel.Put(updatedBoard);

    logger.info({ event: 'board updated', id, response });
    return await BoardController.Get(id);
  }
}
