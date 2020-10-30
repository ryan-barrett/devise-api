import type { BoardId, UserId } from '../types';

export interface UserData {
  id: UserId;
  userName: string;
  email: string;
  password: string;
  boards: Array<BoardId>;
}
