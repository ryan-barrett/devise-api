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
  boardId: BoardId,
  title: string,
  estimate: string,
  description: string,
  dateCreated: number,
  lastUpdated: number,
};

type User = {
  id: UserId,
  userName: string,
  email: string,
  boards: Array<BoardId>,
  password: string
}

type Board = {
  id: BoardId,
  name: string,
  dateCreated: number,
  lastUpdated: number,
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
