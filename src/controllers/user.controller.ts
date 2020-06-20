import { logger } from '../utils/logger';

import { generateId } from '../utils/generate.id';
import { UserModel } from '../models/user.model';
import { validateBoards } from '../utils/controllers.utils';

import type { UserId } from '../../types';
import { UserData } from '../../interfaces';

export class UserController {
  public static async Get(userId: UserId) {
    try {
      return await UserModel.find(userId);
    } catch (error) {
      logger.error({ event: 'error getting user', error });
      return new Error(`{ status: 500, message: 'error fetching user' }`);
    }
  }

  public static async Create(newUserData: UserData): Promise<any> {
    newUserData.id = `user-${await generateId()}`;
    newUserData.boards = [];

    try {
      const newUser = new UserModel(newUserData);
      const response = await UserModel.put(newUser);
      logger.info({ event: 'new user created', response });
    } catch (error) {
      logger.error({ event: 'error creating user', error });
      return new Error(`{ status: 500, message: 'error creating user' }`);
    }
    return await UserController.Get(newUserData.id);
  }

  public static async Update(userData: UserData): Promise<any> {
    const { id, userName, email, boards } = userData;
    if (boards !== undefined && !await validateBoards(boards)) {
      logger.error({ event: 'cannot update user with invalid boards', boards });
      return new Error(`{ status: 400, message: 'cannot update user with invalid boards' }`);
    }
    const existingUser = await UserModel.find(id);

    const { userName: existingUserName, email: existingEmail, boards: existingBoards } = existingUser;
    existingUser.userName = userName !== undefined ? userName : existingUserName;
    existingUser.email = email !== undefined ? email : existingEmail;
    existingUser.boards = boards !== undefined ? boards : existingBoards;

    try {
      const updatedUser = new UserModel(existingUser);
      const response = await UserModel.put(updatedUser);
      logger.info({ event: 'user updated', id, response });
    } catch (error) {
      logger.error({ event: 'error updating user', error });
      return new Error(`{ status: 500, message: 'error updating user' }`);
    }
    return await UserController.Get(id);
  }
}
