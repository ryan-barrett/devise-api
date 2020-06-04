import { connection } from '../../data.source/cb.connection';

import { BoardId, TicketId, UserId } from '../../types/appTypes';
import { TicketData } from '../../interfaces/ticket';

export class TicketModel {
  id: TicketId;
  user: UserId;
  board: BoardId;
  title: string;
  estimate: number;
  description: string;

  constructor(data: TicketData) {
    const { id, user, board, title, estimate, description } = data;
    this.id = id;
    this.user = user;
    this.board = board;
    this.title = title;
    this.estimate = estimate;
    this.description = description;
  }

  static async find(ticketId: TicketId) {
    const { rows } = await connection.query(`SELECT b.* FROM b WHERE meta().id = ${ticketId}`);
    // @ts-ignore
    rows.map((row: UserDataT) => new this(row));
  }
}
