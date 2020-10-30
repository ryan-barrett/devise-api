import { BoardModel }      from '../models';
import { UserModel }       from '../models';
import { BoardId, UserId } from '../typing';
import { logger }          from './logger';

export const validateBoards = async (boards: Array<BoardId>): Promise<boolean> => {
  for (let board of boards) {
    const boardData = await BoardModel.Find(board);
    if (!boardData) return false;
  }
  return true;
};

export const validateUser = async (userId: UserId): Promise<boolean> => {
  try {
    const userData = await UserModel.Find(userId);
    return userData !== undefined;
  }
  catch (error) {
    logger.error({ userId, error }, 'Error validating user');
    throw new Error(`Error getting user or user does not exist, ${error}`);
  }
};
