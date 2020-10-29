import express               from 'express';
import bodyParser            from 'body-parser';
import { login, createUser } from '../routeHandlers';
import { logger }            from '../utils/logger';

export class Server {
  protected listener: any;
  protected app: Readonly<any> = express();
  protected logger = logger;

  /**
   *
   * @param port
   * @param middleware - an array of optional additional middleware to apply to the server
   */
  constructor(protected readonly port: string, middleware: Array<Function> = []) {
    this.app.use(bodyParser.json());
    this.applyMiddleware(middleware);

    this.app.post('/login', login);
    this.app.post('/user/create', createUser);
  }

  start(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.listener = this.app.listen(this.port, () => {
          this.logger.info({ event: 'START' }, ` server started - running on port ${this.port}`);
        });
        resolve();
      }
      catch (error) {
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
      this.app.use(middleware[i]());
    }
  }
}
