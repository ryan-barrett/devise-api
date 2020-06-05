import { buildSchema } from 'graphql';
import { root } from './handlers';

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
}

type Board {
  id: String!
  name: String!
  dateCreated: String
  lastUpdated: String
}

input boardInput {
  id: String
  name: String
}

type Ticket {
  id: String!
  user: String
  board: String
  title: String
  estimate: Int
  description: String
  dateCreated: String
  lastUpdated: String
}

input ticketInput {
  id: String
  user: String
  board: String
  title: String
  estimate: Int
  description: String
}

type Query {
  getUser(input: String!): User
  getBoard(input: String!): Board
  getTicket(input: String!): Ticket
  getTickets(input: [String!]): [Ticket] 
}

type Mutation {
  createUser(input: userInput): User
  updateUser(input: userInput): User
  createBoard(input: boardInput): Board
  updateBoard(input: boardInput): Board
  createTicket(input: ticketInput): Ticket
  updateTicket(input: ticketInput): Ticket
}
`);

  return {
    schema: schema,
    rootValue: root,
    graphiql: true,
  };
};
