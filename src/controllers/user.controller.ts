import { logger } from '../utils/logger';
import { generateId } from '../utils/generate.id';
import { UserModel } from '../models/user.model';
import { validateBoards } from '../utils/controller.utils';
import type { UserId, UserData } from '../typescript';

export class UserController {
  public static async Get(userId: UserId) {
    return await UserModel.Find(userId);
  }

  public static async Create(newUserData: UserData): Promise<any> {
    newUserData.id = `user-${await generateId()}`;
    newUserData.boards = [];

    const newUser = new UserModel(newUserData);
    const response = await UserModel.Put(newUser);

    logger.info({ event: 'new user created', response });
    return await UserController.Get(newUserData.id);
  }

  public static async Update(userData: UserData): Promise<any> {
    const { id, userName, email, boards } = userData;

    if (boards !== undefined && !await validateBoards(boards)) {
      throw new Error('cannot update user with invalid boards');
    }

    const existingUser = await UserModel.Find(id);
    const { userName: existingUserName, email: existingEmail, boards: existingBoards } = existingUser;

    existingUser.userName = userName !== undefined ? userName : existingUserName;
    existingUser.email = email !== undefined ? email : existingEmail;
    existingUser.boards = boards !== undefined ? boards : existingBoards;

    const updatedUser = new UserModel(existingUser);
    const response = await UserModel.Put(updatedUser);

    logger.info({ event: 'user updated', id, response });
    return await UserController.Get(id);
  }
}
