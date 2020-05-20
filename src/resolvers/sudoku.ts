import { Grid } from '../sudoku/grid';
import { Solver } from '../sudoku/solver';

export const solve = (board: Array<number>) => {
  try {
    const grid = new Grid(board);
    const solver = new Solver(grid);
    return solver.solve();
  } catch (error) {
    const { stack } = error;
    console.error({ error, stack });
    return 'Error solving puzzle';
  }
};
