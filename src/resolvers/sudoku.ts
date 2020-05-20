import { Grid } from '../sudoku/grid';
import { Solver } from '../sudoku/solver';
import { logger } from '../utils/logger';

export const solve = (board: Array<number>) => {
  try {
    const grid = new Grid(board);
    const solver = new Solver(grid);
    return solver.solve();
  } catch (error) {
    const { stack } = error;
    logger.error({ event: 'Error solving puzzle', error, stack });
    throw error;
  }
};
