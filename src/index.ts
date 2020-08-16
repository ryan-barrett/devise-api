require('dotenv').config();
import { Server } from './server';
import schema from './graphql/schema';
import config from 'config';
import { logger } from './utils/logger';

const port: string = config.get('port');
const server = new Server(port, schema());

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
