import type { BoardId, UserId } from '../types';

export interface UserData {
  id: UserId;
  userName: string;
  email: string;
  boards: Array<BoardId>;
}
