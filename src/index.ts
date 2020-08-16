require('dotenv').config();
import config from 'config';
import { GraphqlServer } from './servers/graphql';
import schema from './graphql/schema';
import { logger } from './utils/logger';

const port: string = config.get('port');
const server = new GraphqlServer(port, schema());

async function shutDown() {
  logger.info('\n shutting down');
  await server.stop();
  logger.info('done');
}

server.start().then(() => {
  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);
  logger.info('idle...');
});
