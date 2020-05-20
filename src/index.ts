import { Server } from './server';
import getSudokuGraphql from './graphql/sudokuSchema';

const sudokuServer = new Server(8080, getSudokuGraphql());

sudokuServer.start();
