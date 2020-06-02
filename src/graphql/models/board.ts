import { connection } from '../../data.source/cb.connection';

type Id = string;
type BoardId = Id;

export interface BoardData {
  id: BoardId;
  name: string;
  lastUpdated: Date;
}

export class Board {
  id: string;
  name: string;
  lastUpdated: Date;

  constructor(data: BoardData) {
    const { name, lastUpdated, id } = data;
    this.id = id;
    this.name = name;
    this.lastUpdated = lastUpdated;
  }

  updateBoard(data: BoardData): void {
    const { name, lastUpdated } = data;
    this.name = name;
    this.lastUpdated = lastUpdated;
  }

  static async find(boardId: BoardId) {
    const { rows } = await connection.query(`SELECT b.* FROM b WHERE meta().id = ${boardId}`);
    // @ts-ignore
    rows.map((row: UserDataT) => new this(row))
  }
}

export type {
  Id,
  BoardId,
}
