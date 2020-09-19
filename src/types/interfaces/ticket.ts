import type { BoardId, TicketId, UserId } from '../types';

export interface TicketData {
  id: TicketId;
  user: UserId;
  assignee: string;
  status: string,
  boardId: BoardId;
  title: string;
  estimate: string;
  description: string;
  dateCreated: number;
  lastUpdated: number;
}
