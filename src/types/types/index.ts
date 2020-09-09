type Id = string;

type BoardId = Id;
type TicketId = Id;
type UserId = Id;

type CbConnectionUrl = string;

type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];

type Ticket = {
  id: TicketId,
  user: UserId,
  assignee: string,
  status: string,
  board: BoardId,
  title: string,
  estimate: number,
  description: string,
  dateCreated: Date,
  lastUpdated: Date,
};

type User = {
  id: UserId,
  userName: string,
  email: string,
  boards: Array<BoardId>
}

type Board = {
  id: BoardId,
  name: string,
  dateCreated: Date,
  lastUpdated: Date,
}

export type {
  Id,
  BoardId,
  TicketId,
  UserId,
  CbConnectionUrl,
  Json,
  Ticket,
  User,
  Board
};
