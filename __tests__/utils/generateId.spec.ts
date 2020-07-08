import { generateId } from '../../src/utils/generateId';
import { connection } from '../../src/data-sources/couchbase';

const count = jest.fn(() => {
  return new Promise((resolve, reject) => {
    resolve({ rows: [[1]] });
  });
});
// @ts-ignore
connection.count = count;

describe('generateId', () => {
  it('generate a valid UUID', async () => {
    const id = await generateId();
    const uuid = id.split('').slice(0, id.length - 1).join('');
    const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
    const isValidV4UUID = (uuid: string) => uuidV4Regex.test(uuid);
    expect(isValidV4UUID(uuid)).toBe(true);
  });
});
