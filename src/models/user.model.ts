import { connection } from '../data.source/cb.connection';
import { BoardId, UserId, UserData } from '../typescript';
import { ModelError } from '../errors';

class UserModelError extends ModelError {
}

export class UserModel {
  id: UserId;
  userName: string;
  email: string;
  boards: Array<BoardId>;

  constructor(data: UserData) {
    const { id, userName, email, boards } = data;
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.boards = boards;
  }

  getId(): UserId {
    return this.id;
  }

  static async Find(userId: UserId): Promise<UserModel> {
    const response = await connection.get(userId);
    const { value } = response;

    if (!value) throw new UserModelError(500, 'missing value from response');
    return value;
  }

  static async Put(user: UserModel) {
    return await connection.upsert(user.getId(), user);
  }
}
