import { BoardModel } from '../models/board.model';
import { UserModel } from '../models/user.model';
import { BoardId, UserId } from '../typescript';

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
