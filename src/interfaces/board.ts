import type { BoardId } from '../types/appTypes';

export interface BoardData {
  id: BoardId;
  name: string;
  lastUpdated: Date;
}
