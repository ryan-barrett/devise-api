import { connection } from '../../data.source/cb.connection';

import { BoardData } from '../../interfaces/board';
import { BoardId } from '../../types/appTypes';

export class BoardModel {
  id: string;
  name: string;
  lastUpdated: Date;

  constructor(data: BoardData) {
    const { name, lastUpdated, id } = data;
    this.id = id;
    this.name = name;
    this.lastUpdated = lastUpdated;
  }

  static async find(boardId: BoardId) {
    const response = await connection.get(boardId);
    const { value } = response;

    if (!value) throw new Error('missing value from response');
    return value;
  }
}
