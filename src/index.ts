import { Server } from './server';
import schema from './graphql/schema';

const sudokuServer = new Server(8080, schema());

sudokuServer.start();
