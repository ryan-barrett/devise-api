import { BoardModel } from '../models/boardModel';
import { UserModel } from '../models/userModel';
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
