import { BoardModel } from '../models/board.model';
import { UserModel } from '../models/user.model';

import { BoardId, UserId } from '../../typescript/types';

export const validateBoards = async (boards: Array<BoardId>): Promise<boolean> => {
  for (let board of boards) {
    const boardData = await BoardModel.find(board);
    if (!boardData) return false;
  }
  return true;
};

export const validateUser = async (userId: UserId): Promise<boolean> => {
  const userData = await UserModel.find(userId);
  return userData !== undefined;
};
