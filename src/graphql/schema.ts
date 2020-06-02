import { buildSchema } from 'graphql';
import { logger } from '../utils/logger';
import { createUser, getUser } from './resolvers';
import { User, UserId } from './models/user';

interface boardInput {
  input: Array<number>;
}

interface UserInput {
  id?: string;
  userName: string;
  email: string;
}

//solve(input: [Int]!): [Int]
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
  userName: String
  email: String
}

type Mutation {
  createUser(input: userInput): User
  updateUser(id: ID!, input: userInput): User
}
`);

  const root = {
    getUser: async (args: UserId) => {
      // @ts-ignore
      const { input } = args;

      logger.info({ event: 'received getUser request', input });
      return await getUser(input);
    },
    createUser: async (args: UserInput) => {
      // @ts-ignore
      const { input } = args;
      const { userName, email } = input;

      logger.info({ event: 'received createUser request', userName, email });
      return await createUser(input);
    },
    updateUser: (args: UserInput) => {
      const { id, userName, email } = args;
      logger.info({ event: 'received updateUser request', id, userName, email });
    }
  };

  return {
    schema: schema,
    rootValue: root,
    graphiql: true,
  };
};
