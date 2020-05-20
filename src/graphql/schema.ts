import { buildSchema } from 'graphql';
import { solve } from './resolvers/sudoku';
import { logger } from '../utils/logger';

interface boardInput {
  input: Array<number>;
}

export default () => {
  const schema = buildSchema(`
type Query {
  solve(input: [Int]!): [Int]
}
`);

  const root = {
    solve: (args: boardInput) => {
      const { input } = args;
      logger.info({ event: 'received request', input});
      return solve(input);
    },
  };

  return {
    schema: schema,
    rootValue: root,
    graphiql: true,
  };
};
