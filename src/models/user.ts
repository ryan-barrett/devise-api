import { connection } from '../data-sources/couchbase';
import { BoardId, UserId, UserData, User } from '../types';
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

  static async Find(userId: UserId): Promise<User> {
    const response = await connection.get(userId);
    const { value } = response;

    if (!value) throw new UserModelError(500, 'missing value from response');
    return value;
  }

  static async Put(user: UserModel): Promise<any> {
    return await connection.upsert(user.getId(), user);
  }
}
