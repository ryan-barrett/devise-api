import { connection } from '../data.source/cb.connection';

import { BoardId, TicketId, UserId } from '../../typescript/types';
import { TicketData } from '../../typescript/interfaces';

export class TicketModel {
  id: TicketId;
  user: UserId;
  board: BoardId;
  title: string;
  estimate: number;
  description: string;
  dateCreated: Date;
  lastUpdated: Date;

  constructor(data: TicketData) {
    const { id, user, board, title, estimate, description, dateCreated, lastUpdated } = data;
    this.id = id;
    this.user = user;
    this.board = board;
    this.title = title;
    this.estimate = estimate;
    this.description = description;
    this.dateCreated = dateCreated;
    this.lastUpdated = lastUpdated;
  }

  getId(): TicketId {
    return this.id;
  }

  static async find(ticketId: TicketId): Promise<TicketModel> {
    const response = await connection.get(ticketId);
    const { value } = response;

    if (!value) throw new Error('missing value from response');
    return value;
  }

  static async put(ticket: TicketModel) {
    return await connection.upsert(ticket.getId(), ticket);
  }
}
