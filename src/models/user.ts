import config                              from 'config';
import { logger }                          from '../utils/logger';
import { connection }                      from '../data-sources/couchbase';
import { BoardId, UserId, UserData, User } from '../types';
import { ModelError }                      from '../errors';

const couchbaseConfig: any = config.get('couchbaseConfig');
const { defaultBucket } = couchbaseConfig;

class UserModelError extends ModelError {
}

export class UserModel {
  type = 'user';
  id: UserId;
  userName: string;
  email: string;
  password: string;
  boards: Array<BoardId>;

  constructor(data: UserData) {
    const { id, userName, email, boards, password } = data;
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.boards = boards;
    this.password = password;
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

  static async Match(email: string): Promise<User> {
    const { rows, meta } = await connection.query(`SELECT b.* FROM ${defaultBucket} WHERE email = $1`, [email]);
    logger.debug(meta);
    // @ts-ignore
    return rows[0];
  }
}
