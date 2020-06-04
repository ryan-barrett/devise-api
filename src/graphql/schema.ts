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

type Query {
  getUser(input: String!): User
}

input userInput {
  id: String
  userName: String
  email: String
  boards: [String]
}

type Mutation {
  createUser(input: userInput): User
  updateUser(input: userInput): User
}
`);

  return {
    schema: schema,
    rootValue: root,
    graphiql: true,
  };
};
