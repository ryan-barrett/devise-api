import { Server } from './server';
import initSudokuRoutes from './routes/sudokuRoutes';

const sudokuServer = new Server(8080, initSudokuRoutes);

sudokuServer.start();
