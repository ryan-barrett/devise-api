import { app }                   from '../../index';

export async function getTicket(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  return app.callService('TicketService', 'get', [input], caller);
}

export async function getTickets(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  return app.callService('TicketService', 'getMultiple', [input], caller);
}

export async function createTicket(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  const { title, user, boardId, estimate, description, status } = input;
  const userData = { title, user, boardId, estimate, description, status };
  return app.callService('TicketService', 'create', [userData], caller);
}

export async function updateTicket(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  return app.callService('TicketService', 'update', [input], caller);
}
