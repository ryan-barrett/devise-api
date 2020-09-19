import { logger }                    from '../utils/logger';
import { generateId }                from '../utils/generateId';
import { BoardModel, TicketModel }   from '../models';
import { BoardId, BoardData, Board } from '../types';

export class BoardController {
  public static async Get(boardId: BoardId): Promise<Board & { [key: string]: any }> {
    const board = await BoardModel.Find(boardId);
    const { rows: tickets } = await TicketModel.GetAllTickets(boardId);
    // @ts-ignore
    const sortedTickets = tickets.sort((a, b) => a.dateCreated - b.dateCreated);
    return { ...board, tickets: sortedTickets };
  }

  public static async Create(newBoardData: BoardData): Promise<Board> {
    newBoardData.id = `board-${await generateId()}`;
    newBoardData.dateCreated = Date.now();
    newBoardData.lastUpdated = Date.now();

    const newUser = new BoardModel(newBoardData);
    const response = await BoardModel.Put(newUser);

    logger.info({ response }, 'new board created');
    return await BoardController.Get(newBoardData.id);
  }

  public static async Update(boardData: BoardData): Promise<Board> {
    const { id, name } = boardData;

    const existingBoard = await BoardModel.Find(id);
    existingBoard.name = name ? name : existingBoard.name;
    existingBoard.lastUpdated = Date.now();

    const updatedBoard = new BoardModel(existingBoard);
    const response = await BoardModel.Put(updatedBoard);

    logger.info({ id, response }, 'board updated');
    return await BoardController.Get(id);
  }
}
