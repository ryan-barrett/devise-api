import type { BoardId, TicketId, UserId } from '../types/appTypes';

export interface TicketData {
  id: TicketId; // not included during update
  user: UserId;
  board: BoardId;
  title: string;
  estimate: number;
  description: string;
  dateCreated: Date;
  lastUpdated: Date;
}
