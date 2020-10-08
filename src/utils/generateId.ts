import { v4 } from 'uuid';

export const generateId = async (): Promise<string> => {
  return v4();
};
