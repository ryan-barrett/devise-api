import { graphqlConfig }         from '../types/interfaces';
import graphqlHTTP               from 'express-graphql';
import { Server }                from './server';
import { AuthenticationService } from '../services';

export class GraphqlServer extends Server {
  private graphql: graphqlConfig;

  constructor(protected readonly port: string, graphql: graphqlConfig, middleware: Array<Function> = []) {
    super(port, middleware);
    this.graphql = graphql;
    this.app.use(GraphqlServer.ValidateJwtMiddleware);
    this.app.use('/graphql', graphqlHTTP(graphql));
  }

  private static async ValidateJwtMiddleware(request: any) {
    const jwt = request.headers.authorization;
    const res = AuthenticationService.ValidateJwt(jwt);
    console.log(res);
    request.next();
  }
}
