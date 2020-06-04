import { BoardModel } from '../models/boardModel';

import { BoardId } from '../../types/appTypes';

export const validBoards = async (boards: Array<BoardId>): Promise<boolean> => {
  for (let board of boards) {
    const boardData = await BoardModel.find(board);
    if (!boardData) return false;
  }
  return true;
};
