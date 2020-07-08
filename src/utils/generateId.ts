import { uuid } from 'uuidv4';
import { connection } from '../data-sources/couchbase';

export const generateId = async (): Promise<string> => {
  const response = await connection.count();
  const { rows } = response;
  // @ts-ignore
  return uuid() + Object.values(rows[0])[0];
};
