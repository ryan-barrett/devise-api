import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';

interface graphqlConfig {
  schema: any;
  rootValue: any;
  graphql?: boolean;
}

export class Server {
  private listener: any;
  private app: Readonly<any> = express();

  /**
   *
   * @param port
   * @param graphql - graphql config containing schema
   * @param optionalMiddleWare - an array of optional additional middleware to apply to the server
   */
  constructor(
    private readonly port: string,
    graphql: graphqlConfig,
    optionalMiddleWare: Array<Function> = []
  ) {
    // this.applyMiddleware([bodyParser.json(), bodyParser.urlencoded()]);
    this.applyMiddleware(optionalMiddleWare);
    this.app.use('/graphql', graphqlHTTP(graphql));
  }

  start(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.listener = this.app.listen(this.port, () => {
          console.log(`running on port ${this.port}`);
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  stop(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.listener.close((error: Error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  applyMiddleware(middleware: Array<Function>): void {
    for (let i = 0; i < middleware.length; i++) {
      this.app.use(middleware[i]);
    }
  }
}
