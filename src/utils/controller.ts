import { BoardModel } from '../models';
import { UserModel } from '../models';
import { BoardId, UserId } from '../types';

export const validateBoards = async (boards: Array<BoardId>): Promise<boolean> => {
  for (let board of boards) {
    const boardData = await BoardModel.Find(board);
    if (!boardData) return false;
  }
  return true;
};

export const validateUser = async (userId: UserId): Promise<boolean> => {
  const userData = await UserModel.Find(userId);
  return userData !== undefined;
};
