import { BoardId } from '../types';

export interface boardInput {
  input: Array<string>;
}

export interface UserInput {
  id?: string;
  userName: string;
  email: string;
}

export interface BoardInput {
  id?: string,
  name: string,
}

export interface TicketInput {
  id?: string,
  user: string,
  board: BoardId,
  title: string,
  estimate: number,
  description: string,
}

export interface graphqlConfig {
  schema: any;
  rootValue: any;
  graphql?: boolean;
}
