import express                   from 'express';
import bodyParser                from 'body-parser';
import { AuthenticationService } from '../services';
import { logger }                from '../utils/logger';

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

    this.app.get('/login/:email/:password', async (req: any, res: any) => {
      const { params } = req;
      const { email, password } = params;
      res.json(await AuthenticationService.Login(email, password));
    });
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
