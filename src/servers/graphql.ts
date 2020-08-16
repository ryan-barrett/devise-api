import { graphqlConfig } from '../types/interfaces';
import graphqlHTTP       from 'express-graphql';
import { Server }        from './server';

export class GraphqlServer extends Server {
  private graphql: graphqlConfig;

  constructor(protected readonly port: string, graphql: graphqlConfig) {
    super(port);
    this.graphql = graphql;
    this.app.use('/graphql', graphqlHTTP(graphql));
  }
}
