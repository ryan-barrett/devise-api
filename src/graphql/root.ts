import {
  getUser,
  createUser,
  updateUser,
  getBoard,
  createBoard,
  updateBoard,
  getTicket,
  getTickets,
  createTicket,
  updateTicket
} from './resolvers';

export const root = {
  getUser,
  createUser,
  updateUser,
  getBoard,
  createBoard,
  updateBoard,
  getTicket,
  getTickets,
  createTicket,
  updateTicket
};
