require('dotenv').config();
import { Server } from './server';
import schema from './graphql/schema';

const port = process.env.PORT || "8080";
const sudokuServer = new Server(port, schema());

sudokuServer.start();
