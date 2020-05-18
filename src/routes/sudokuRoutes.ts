import { Server } from '../server';
import { solve } from '../handlers/sudoku';

export default (server: Server) => {
  const app = server.getServer();
  app.post('/solve', solve);
};
