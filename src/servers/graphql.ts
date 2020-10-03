import graphqlHTTP               from 'express-graphql';
import { graphqlConfig }         from '../types/interfaces';
import { Server }                from './server';
import { AuthenticationService } from '../services';
import { logger }                from '../utils/logger';

export class GraphqlServer extends Server {
  private graphql: graphqlConfig;

  constructor(protected readonly port: string, graphql: graphqlConfig, middleware: Array<Function> = []) {
    super(port, middleware);
    this.graphql = graphql;
    this.app.use(GraphqlServer.ValidateJwtMiddleware);
    this.app.use('/graphql', graphqlHTTP((req) => {
      graphql.context = req;
      return graphql;
    }));
  }

  private static async ValidateJwtMiddleware(request: any) {
    logger.debug('hitting jwt middleware');
    const jwt = request.headers.authorization;
    const user = await AuthenticationService.ParseJwt(jwt);

    logger.debug({ user });
    request.user = user;
    request.next();
  }
}
