import { connection } from '../data-sources/couchbase';
import { BoardData, BoardId } from '../typescript';
import { ModelError } from '../errors';

class BoardModelError extends ModelError {
}

export class BoardModel {
  id: string;
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

  static async Find(boardId: BoardId): Promise<BoardModel> {
    const response = await connection.get(boardId);
    const { value } = response;

    if (!value) throw new BoardModelError(500, 'missing value from response');
    return value;
  }

  static async Put(board: BoardModel) {
    return await connection.upsert(board.getId(), board);
  }
}
