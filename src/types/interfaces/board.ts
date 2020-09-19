import type { BoardId } from '../types';

export interface BoardData {
  id: BoardId;
  name: string;
  dateCreated: number;
  lastUpdated: number;
}
