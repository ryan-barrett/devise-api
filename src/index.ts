require('dotenv').config();
import config            from 'config';
import cors              from 'cors';
import { Application }   from './application';
import { GraphqlServer } from './servers/graphql';
import schema            from './graphql/schema';
import { logger }        from './utils/logger';

const port: string = config.get('port');
const graphqlServer = new GraphqlServer(port, schema(), [() => cors({ origin: true, credentials: true })]); // TODO: specify remote app

export const app = new Application([graphqlServer]);

async function shutDown() {
  logger.info('\n shutting down');
  await app.stop();
  logger.info('done');
}

app.start().then(() => {
  // process.on('SIGTERM', shutDown);
  // process.on('SIGINT', shutDown);
  logger.info('idle...');
});
