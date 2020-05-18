import { Grid } from '../sudoku/grid';
import { Solver } from '../sudoku/solver';

export const solve = (req: any, res: any) => {
  try {
    const grid = new Grid(req.body.grid);
    const solver = new Solver(grid);
    res.send(solver.solve());
  } catch (error) {
    const { stack } = error;
    console.error({ error, stack });
    res.send('Error solving puzzle');
  }
};
