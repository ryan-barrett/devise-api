import type { BoardId, TicketId, UserId } from '../types';

export interface TicketData {
  id: TicketId; // not included during update
  user: UserId;
  status: string,
  board: BoardId;
  title: string;
  estimate: number;
  description: string;
  dateCreated: Date;
  lastUpdated: Date;
}
