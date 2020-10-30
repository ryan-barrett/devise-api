import { buildSchema }         from 'graphql';
import { customFormatErrorFn } from '../errors';
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
  updateTicket,
  getBoards as getBoardsByUserId,
}                              from './resolvers';

export default () => {
  const schema = buildSchema(`
type User {
  id: ID!
  userName: String
  email: String
  boards: [String]
}

input userInput {
  id: String
  userName: String
  email: String
  boards: [String]
  password: String
}

type Board {
  id: String!
  name: String!
  dateCreated: String
  lastUpdated: String
  tickets: [Ticket]
}

input boardInput {
  id: String
  name: String
}

type Ticket {
  id: String!
  user: String
  assignee: String
  status: String
  boardId: String
  title: String
  estimate: String
  description: String
  dateCreated: String
  lastUpdated: String
}

input ticketInput {
  id: String!
  user: String
  status: String
  boardId: String
  title: String
  estimate: String
  description: String
}

input createTicketInput {
  id: String
  user: String!
  status: String!
  boardId: String!
  title: String!
  estimate: String
  description: String
}

type Query {
  getUser(userId: String!): User
  getBoardsByUserId(userId: String!): [Board]
  getBoard(input: String!): Board
  getTicket(input: String!): Ticket
  getTickets(input: [String!]): [Ticket]
}

type Mutation {
  createUser(input: userInput): User
  updateUser(input: userInput): User
  createBoard(input: boardInput): Board
  updateBoard(input: boardInput): Board
  createTicket(input: createTicketInput): Ticket
  updateTicket(input: ticketInput): Ticket
}
`);

  return {
    schema: schema,
    rootValue: {
      getUser,
      createUser,
      updateUser,
      getBoard,
      createBoard,
      updateBoard,
      getTicket,
      getTickets,
      createTicket,
      updateTicket,
      getBoardsByUserId,
    },
    graphiql: true,
    customFormatErrorFn,
  };
};
