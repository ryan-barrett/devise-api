import type { BoardId, TicketId, UserId } from '../types';

export interface TicketData {
  id: TicketId;
  user: UserId;
  status: string,
  board: BoardId;
  title: string;
  estimate: number;
  description: string;
  dateCreated: Date;
  lastUpdated: Date;
}
