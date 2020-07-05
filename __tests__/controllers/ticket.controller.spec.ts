import { TicketController } from '../../src/controllers/ticket.controller';
import { TicketModel } from '../../src/models/ticket.model';
import { UserModel } from '../../src/models/user.model';
import { connection } from '../../src/data.source/cb.connection';
import { logger } from '../../src/utils/logger';

const ticketData = {
  id: '123',
  user: '456',
  status: 'todo',
  board: '789',
  title: 'some ticket',
  estimate: 1,
  description: 'a ticket',
  dateCreated: new Date(),
  lastUpdated: new Date(),
};

describe('ticket controller', () => {
  let mockGet: any;
  let mockFind: any;
  let mockPut: any;
  let mockCount: any;
  let mockLogger: any;
  let mockUserFind: any;

  beforeEach(() => {
    mockPut = jest.fn();
    mockGet = jest.fn();
    mockLogger = jest.fn();

    mockFind = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({ id: '123' });
      });
    });

    mockUserFind = jest.fn(() => {
      return new Promise((resolve) => {
        resolve({ id: '123' });
      });
    });

    mockCount = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({ rows: [[1]] });
      });
    });

    TicketModel.Find = mockFind;
    TicketModel.Put = mockPut;
    TicketController.Get = mockGet;
    UserModel.Find = mockUserFind;
    connection.count = mockCount;
    logger.info = mockLogger;
  });

  describe('Get', () => {
    it('should call Find TicketModel and return the result', async () => {
      const ticket = await TicketModel.Find('123');
      expect(ticket.id).toBe('123');
    });
  });

  describe('GetMultiple', () => {
    const ids = ['123', '456', '789'];

    it('should call Get for each ticketId passed in', async () => {
      await TicketController.GetMultiple(ids);
      expect(mockGet.mock.calls.length).toBe(3);
    });

    it('should return an array of tickets', async () => {
      const results = await TicketController.GetMultiple(ids);
      expect(results.length).toBe(3);
    });
  });

  describe('Create', () => {
    it('should call Put on TicketModel class', async () => {
      await TicketController.Create(ticketData);
      const call = mockPut.mock.calls[0][0];
      expect(call instanceof TicketModel).toBe(true);
    });


    it('should have dateCreated and lastUpdated fields of type Date', async () => {
      await TicketController.Create(ticketData);
      const call = mockPut.mock.calls[0][0];
      expect(call.dateCreated instanceof Date).toBe(true);
      expect(call.lastUpdated instanceof Date).toBe(true);
    });

    it('should log an outcome message', async () => {
      await TicketController.Create(ticketData);
      expect(mockLogger.mock.calls.length).toBe(1);
    });

    it('should call get with the newly created ID', async () => {
      await TicketController.Create(ticketData);
      const putCall = mockPut.mock.calls[0][0];
      const getCall = mockGet.mock.calls[0][0];
      expect(putCall.id).toEqual(getCall);
    });
  });

  describe('Update', () => {
    it('should call find on existing board ID', async () => {
      await TicketController.Update(ticketData);
      const findCall = mockFind.mock.calls[0][0];
      expect(ticketData.id).toEqual(findCall);
    });

    it('should log an outcome message', async () => {
      await TicketController.Update(ticketData);
      expect(mockLogger.mock.calls.length).toBe(1);
    });

    it('should call get with the updated board ID', async () => {
      await TicketController.Update(ticketData);
      const putCall = mockPut.mock.calls[0][0];
      const getCall = mockGet.mock.calls[0][0];
      expect(putCall.id).toEqual('123');
    });
  });
});
