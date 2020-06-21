import { uuid } from 'uuidv4';
import { connection } from '../data.source/cb.connection';

export const generateId = async (): Promise<string> => {
  const response = await connection.count();
  const { rows } = response;
  // @ts-ignore
  return uuid() + Object.values(rows[0])[0];
};
