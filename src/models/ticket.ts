import config                                            from 'config';
import { connection }                                    from '../data-sources/couchbase';
import { BoardId, Ticket, TicketData, TicketId, UserId } from '../types';
import { ModelError }                                    from '../errors';

const couchbaseConfig: any = config.get('couchbaseConfig');
const { defaultBucket } = couchbaseConfig;

class TicketModelError extends ModelError {
}

export class TicketModel {
  type = 'ticket';
  id: TicketId;
  user: UserId;
  assignee: string;
  status: string;
  board: BoardId;
  title: string;
  estimate: number;
  description: string;
  dateCreated: Date;
  lastUpdated: Date;

  constructor(data: TicketData) {
    const { id, user, assignee, status, board, title, estimate, description, dateCreated, lastUpdated } = data;
    this.id = id;
    this.user = user;
    this.assignee = assignee;
    this.status = status;
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

  static async Find(ticketId: TicketId): Promise<Ticket> {
    const response = await connection.get(ticketId);
    const { value } = response;

    if (!value) throw new TicketModelError(500, 'missing value from response');
    return value;
  }

  static async Put(ticket: TicketModel): Promise<any> {
    return await connection.upsert(ticket.getId(), ticket);
  }

  static async GetAllTickets(boardId: string) {
    return connection.query(`SELECT b.* FROM ${defaultBucket} WHERE board = $1`, [boardId]);
  }
}
