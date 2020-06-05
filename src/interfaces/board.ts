import type { BoardId } from '../types/appTypes';

export interface BoardData {
  id: BoardId;
  name: string;
  dateCreated: Date;
  lastUpdated: Date;
}
