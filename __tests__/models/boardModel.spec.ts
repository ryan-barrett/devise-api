import { BoardModel } from '../../src/models/boardModel';
import { connection } from '../../src/data-sources/couchbase';

import Mock = jest.Mock;

describe('boardModel.ts', () => {
  const stubBoardData = {
    id: '1',
    name: 'testBoard',
    dateCreated: new Date(),
    lastUpdated: new Date(),
  };

  const cbResponse = new Promise((resolve, reject) => {
    resolve({
      value: stubBoardData
    });
  });

  let getCallback: Mock<Promise<any>>;
  let upsertCallback: Mock<Promise<any>>;
  beforeEach(() => {
    getCallback = jest.fn(() => cbResponse);
    upsertCallback = jest.fn(() => cbResponse);

    connection.get = getCallback;
    connection.upsert = upsertCallback;
  });

  it('board should contain expected properties', () => {
    const board = new BoardModel(stubBoardData);
    expect(board.id).toBe('1');
    expect(board.name).toBe('testBoard');
  });

  it('should return a board from static Find method', async () => {
    const board = await BoardModel.Find('1');
    expect(board.id).toBe('1');
  });

  it('should return updated board from static Put method', async () => {
    const response = await BoardModel.Find('1');
    const board = new BoardModel(response);
    board.name = 'testBoard1';
    await BoardModel.Put(board);
    const secondResponse = await BoardModel.Find('1');
    const updatedBoard = new BoardModel(secondResponse);
    expect(updatedBoard.getId()).toBe('1');
  });

  it('should call connection.get on Find request', async () => {
    await BoardModel.Find('1');
    expect(getCallback.mock.calls.length).toBe(1);
  });

  it('should call connection.upsert on Put request', async () => {
    const data = await BoardModel.Find('1');
    const board = new BoardModel(data);
    await BoardModel.Put(board);
    expect(upsertCallback.mock.calls.length).toBe(1);
  });

  it('should return id from getId method', () => {
    const board = new BoardModel(stubBoardData);
    const id = board.getId();
    expect(id).toBe('1');
  });
});
