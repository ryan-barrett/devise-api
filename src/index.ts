require('dotenv').config();
import { Server } from './server';
import schema from './graphql/schema';

const port = process.env.PORT || "8080";
const server = new Server(port, schema());

server.start();
