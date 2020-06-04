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
}

input boardInput {
  id: String
  name: String
}

type Query {
  getUser(input: String!): User
  getBoard(input: String!): Board
}

type Mutation {
  createUser(input: userInput): User
  updateUser(input: userInput): User
  createBoard(input: boardInput): Board
  updateBoard(input: boardInput): Board
}
`);

  return {
    schema: schema,
    rootValue: root,
    graphiql: true,
  };
};
