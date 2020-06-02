import { connection } from '../../data.source/cb.connection';

import type { Id, BoardId } from './board';

type UserId = Id;

export interface UserData {
  id: UserId;
  userName: string;
  email: string;
  boards: Array<BoardId>;
}

type UserDataT = { id: UserId, userName: string, email: string, boards: Array<BoardId> }

export class User {
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

  getId() {
    return this.id;
  }

  updateUser(data: UserData) {
    const { userName, email, boards } = data;
    this.userName = userName;
    this.email = email;
    this.boards = boards;
  }

  static async find(userId: UserId): Promise<User> {
    const response = await connection.get(userId);
    const { value } = response;

    if (!value) throw new Error('missing value from response');
    return value;
  }

  static async put(user: User) {
    return await connection.upsert(user.getId(), user);
  }
}

export type {
  UserId
};
