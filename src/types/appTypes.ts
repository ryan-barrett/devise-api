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

export type {
  Id,
  BoardId,
  TicketId,
  UserId,
  CbConnectionUrl,
  Json,
}
