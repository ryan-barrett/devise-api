import { BoardController } from '../../src/controllers/board';
import { BoardModel } from '../../src/models/board';
import { connection } from '../../src/data-sources/couchbase';
import { logger } from '../../src/utils/logger';

const boardData = {
  id: '123',
  name: 'ryan',
  dateCreated: new Date(),
  lastUpdated: new Date(),
};

describe('board controller', () => {
  let mockGet: any;
  let mockFind: any;
  let mockPut: any;
  let mockCount: any;
  let mockLogger: any;

  beforeEach(() => {
    mockPut = jest.fn();
    mockGet = jest.fn();
    mockLogger = jest.fn();

    mockFind = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({ id: '123' });
      });
    });

    mockCount = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({ rows: [[1]] });
      });
    });

    // @ts-ignore
    BoardModel.Find = mockFind;
    BoardModel.Put = mockPut;
    BoardController.Get = mockGet;
    connection.count = mockCount;
    logger.info = mockLogger;
  });

  describe('Get', () => {
    it('should call Find on BoardModel and return result', async () => {
      const board = await BoardModel.Find('123');
      expect(board.id).toBe('123');
    });
  });

  describe('Create', () => {
    it('should call Put on BoardModel class', async () => {
      await BoardController.Create(boardData);
      const call = mockPut.mock.calls[0][0];
      expect(call instanceof BoardModel).toBe(true);
    });

    it('should have dateCreated and lastUpdated fields of type Date', async () => {
      await BoardController.Create(boardData);
      const call = mockPut.mock.calls[0][0];
      expect(call.dateCreated instanceof Date).toBe(true);
      expect(call.lastUpdated instanceof Date).toBe(true);
    });

    it('should log an outcome message', async () => {
      await BoardController.Create(boardData);
      expect(mockLogger.mock.calls.length).toBe(1);
    });

    it('should call get with the newly created ID', async () => {
      await BoardController.Create(boardData);
      const putCall = mockPut.mock.calls[0][0];
      const getCall = mockGet.mock.calls[0][0];
      expect(putCall.id).toEqual(getCall);
    });
  });

  describe('Update', () => {
    it('should call find on existing board ID', async () => {
      await BoardController.Update(boardData);
      const findCall = mockFind.mock.calls[0][0];
      expect(boardData.id).toEqual(findCall);
    });

    it('should apply new name and lastUpdated fields to existing board', async () => {
      await BoardController.Update(boardData);
      const putCall = mockPut.mock.calls[0][0];
      expect(putCall.name).toBe(boardData.name);
      expect(putCall.lastUpdated instanceof Date).toBe(true);
    });

    it('should log an outcome message', async () => {
      await BoardController.Update(boardData);
      expect(mockLogger.mock.calls.length).toBe(1);
    });

    it('should call get with the updated board ID', async () => {
      await BoardController.Update(boardData);
      const putCall = mockPut.mock.calls[0][0];
      const getCall = mockGet.mock.calls[0][0];
      expect(putCall.id).toEqual('123');
    });
  });
});
