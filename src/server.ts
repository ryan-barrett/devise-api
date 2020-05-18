import express from 'express';
import bodyParser from 'body-parser';

export class Server {
  private listener: any;
  private port: Readonly<number>;
  private app: Readonly<any> = express();

  /**
   *
   * @param port
   * @param initRoutes
   * @param optionalMiddleWare - an array of optional additional middleware to apply to the server
   */
  constructor(
    port: number,
    initRoutes: Function,
    optionalMiddleWare: Array<Function> = []
  ) {
    this.port = port;
    this.applyMiddleware([bodyParser.json(), bodyParser.urlencoded()]);
    this.applyMiddleware(optionalMiddleWare);
    initRoutes(this);
  }

  start(): Promise<any> {
    // this.app.use(bodyParser.json());
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

  applyMiddleware(middleware: Array<Function>) {
    for (let i = 0; i < middleware.length; i++) {
      this.app.use(middleware[i]);
    }
  }

  getServer(): any {
    return this.app;
  }
}
