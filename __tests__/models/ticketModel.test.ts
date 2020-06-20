import { TicketModel } from '../../src/models/ticket.model';
import { connection } from '../../src/data.source/cb.connection';

import Mock = jest.Mock;

describe('ticket.model.ts', () => {
  const stubTicketData = {
    id: '1',
    user: '2',
    board: '123',
    title: 'test ticket',
    estimate: 1,
    description: 'a test ticket',
    dateCreated: new Date(),
    lastUpdated: new Date()
  };

  const cbResponse = new Promise((resolve, reject) => {
    resolve({
      value: stubTicketData
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

  it('Ticket should contain expected properties', () => {
    const ticket = new TicketModel(stubTicketData);
    expect(ticket.id).toBe('1');
    expect(ticket.user).toBe('2');
    expect(ticket.board).toBe('123');
    expect(ticket.title).toBe('test ticket');
    expect(ticket.estimate).toBe(1);
  });

  it('should return a ticket from static find method', async () => {
    const ticket = await TicketModel.find('1');
    expect(ticket.user).toBe('2');
  });

  it('should return updated ticket from static put method', async () => {
    const response = await TicketModel.find('1');
    const ticket = new TicketModel(response);
    ticket.board = '123';
    await TicketModel.put(ticket);
    const secondResponse = await TicketModel.find('1');
    const updatedTicket = new TicketModel(secondResponse);
    expect(updatedTicket.getId()).toBe('1');
  });

  it('should call connection.get on find request', async () => {
    await TicketModel.find('1');
    expect(getCallback.mock.calls.length).toBe(1);
  });

  it('should call connection.upsert on put request', async () => {
    const data = await TicketModel.find('1');
    const ticket = new TicketModel(data);
    await TicketModel.put(ticket);
    expect(upsertCallback.mock.calls.length).toBe(1);
  });

  it('should return id from getId method', () => {
    const ticket = new TicketModel(stubTicketData);
    const id = ticket.getId();
    expect(id).toBe('1');
  })
});
