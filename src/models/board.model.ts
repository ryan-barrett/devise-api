import { connection } from '../data.source/cb.connection';

import { BoardData } from '../../interfaces';
import { BoardId } from '../../types';

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

  static async find(boardId: BoardId): Promise<BoardModel> {
    const response = await connection.get(boardId);
    const { value } = response;

    if (!value) throw new Error('missing value from response');
    return value;
  }

  static async put(board: BoardModel) {
    return await connection.upsert(board.getId(), board);
  }
}
