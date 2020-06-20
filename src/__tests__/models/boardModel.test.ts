import { BoardModel } from '../../models/board.model';
import { connection } from '../../data.source/cb.connection';

import Mock = jest.Mock;

describe('board.model.ts', () => {
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

  it('Board should contain expected properties', () => {
    const board = new BoardModel(stubBoardData);
    expect(board.id).toBe('1');
    expect(board.name).toBe('testBoard');
  });

  it('should return a board from static find method', async () => {
    const board = await BoardModel.find('1');
    expect(board.id).toBe('1');
  });

  it('should return updated board from static put method', async () => {
    const response = await BoardModel.find('1');
    const board = new BoardModel(response);
    board.name = 'testBoard1';
    await BoardModel.put(board);
    const secondResponse = await BoardModel.find('1');
    const updatedBoard = new BoardModel(secondResponse);
    expect(updatedBoard.getId()).toBe('1');
  });

  it('should call connection.get on find request', async () => {
    await BoardModel.find('1');
    expect(getCallback.mock.calls.length).toBe(1);
  });

  it('should call connection.upsert on put request', async () => {
    const data = await BoardModel.find('1');
    const board = new BoardModel(data);
    await BoardModel.put(board);
    expect(upsertCallback.mock.calls.length).toBe(1);
  });

  it('should return id from getId method', () => {
    const board = new BoardModel(stubBoardData);
    const id = board.getId();
    expect(id).toBe('1');
  });
});
