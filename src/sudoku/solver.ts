import { Grid } from './grid';

export class Solver {
  private grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
  }

  solve() {
    let sudoku: Array<number> = this.grid.getArrayGrid();
    let solved: boolean = false;

    while (!solved) {
      solved = true;

      for (let index = 0; index < 81; index++) {
        if (sudoku[index] !== 0) {
          continue;
        }

        let possible_values: Array<number> = this.grid.getPossibleValues(index);

        if (possible_values.length === 1) {
          sudoku[index] = possible_values[0];
        } else if (possible_values.length > 1) {
          solved = false;
        }
      }
    }

    return sudoku;
  }
}
