import { connection } from '../data-sources/couchbase';
import { BoardData, BoardId, Board } from '../types';
import { ModelError } from '../errors';

class BoardModelError extends ModelError {
}

export class BoardModel {
  id: BoardId;
  name: string;
  dateCreated: Date;
  lastUpdated: Date;

  constructor(data: BoardData) {
    const { name, lastUpdated, dateCreated, id } = data;
    this.id = id;
    this.name = name;
    this.dateCreated = dateCreated;
    this.lastUpdated = lastUpdated;
  }

  getId(): BoardId {
    return this.id;
  }

  static async Find(boardId: BoardId): Promise<Board> {
    const response = await connection.get(boardId);
    const { value } = response;

    if (!value) throw new BoardModelError(500, 'missing value from response');
    return value;
  }

  static async Put(board: BoardModel): Promise<any> {
    return await connection.upsert(board.getId(), board);
  }
}
