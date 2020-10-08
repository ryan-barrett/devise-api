import { app }          from '../../index';

export async function getBoard(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  return app.callService('BoardService', 'get', [input], caller);
}

export async function createBoard(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  return app.callService('BoardService', 'create', [input], caller);
}

export async function updateBoard(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  return app.callService('BoardService', 'update', [input], caller);
}
