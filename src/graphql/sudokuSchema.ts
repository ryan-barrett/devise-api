const { buildSchema } = require('graphql');
import { solve } from '../resolvers/sudoku';

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
      return solve(input);
    },
  };

  return {
    schema: schema,
    rootValue: root,
    graphiql: true,
  };
};
