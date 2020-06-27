require('dotenv').config();
import { Server } from './server';
import schema from './graphql/schema';
import config from 'config';

const port: string = config.get('port');
const server = new Server(port, schema());

server.start();
